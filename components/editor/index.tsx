'use client';

import { useEffect, useRef, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { TiptapEditorProps } from './props';
import { TiptapExtensions } from './extensions';
import { useDebouncedCallback } from 'use-debounce';
import DEFAULT_EDITOR_CONTENT from './default-content';
import { EditorBubbleMenu } from './components';
import { getPrevText } from '@/lib/editor';
import useLocalStorage from '@/lib/hooks/use-local-storage';

export default function Editor() {
	const [content, setContent] = useLocalStorage(
		'content',
		DEFAULT_EDITOR_CONTENT,
	);
	const [saveStatus, setSaveStatus] = useState('Saved');

	const [hydrated, setHydrated] = useState(false);

	const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
		const json = editor.getJSON();
		setSaveStatus('Saving...');
		setContent(json);
		// Simulate a delay in saving.
		setTimeout(() => {
			setSaveStatus('Saved');
		}, 500);
	}, 750);

	const editor = useEditor({
		extensions: TiptapExtensions,
		editorProps: TiptapEditorProps,
		onUpdate: (e) => {
			setSaveStatus('Unsaved');
			const selection = e.editor.state.selection;
			const lastTwo = getPrevText(e.editor, {
				chars: 2,
			});
			debouncedUpdates(e);
		},
		autofocus: 'end',
	});

	const prev = useRef('');

	// Hydrate the editor with the content from localStorage.
	useEffect(() => {
		if (editor && content && !hydrated) {
			editor.commands.setContent(content);
			setHydrated(true);
		}
	}, [editor, content, hydrated]);

	return (
		<div
			onClick={() => {
				editor?.chain().focus().run();
			}}
			className='relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg'
		>
			<div className='absolute right-5 top-5 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400'>
				{saveStatus}
			</div>
			{editor && <EditorBubbleMenu editor={editor} />}
			<EditorContent editor={editor} />
		</div>
	);
}
