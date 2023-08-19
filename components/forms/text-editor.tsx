import { useRef } from 'react';

import { InputProps } from '@/components/forms/input-props';
import StarterKit from '@tiptap/starter-kit';
import {
	MenuButtonBold,
	MenuButtonItalic,
	MenuControlsContainer,
	MenuDivider,
	MenuSelectHeading,
	RichTextEditor,
	RichTextEditorRef,
} from 'mui-tiptap';
import { Controller } from 'react-hook-form';

export default function TextEditor({
	name,
	control,
	label,
	...rest
}: InputProps) {
	const rteRef = useRef<RichTextEditorRef>(null);
	console.log(
		'Class: default, Function: TextEditor, Line 22 rteRef():',
		rteRef.current?.editor?.getHTML()
	);
	return (
		<Controller
			name={name}
			control={control}
			render={({
				field: { onChange, value },
				fieldState: { error },
				formState,
			}) => (
				<RichTextEditor
					ref={rteRef}
					extensions={[StarterKit]}
					content={value || '<p>Add job description</p>'}
					// Optionally include `renderControls` for a menu-bar atop the editor
					renderControls={() => (
						<MenuControlsContainer>
							<MenuSelectHeading />
							<MenuDivider />
							<MenuButtonBold />
							<MenuButtonItalic />
							{/* Add more controls of your choosing here */}
						</MenuControlsContainer>
					)}
					className='my-2'
					{...rest}
				/>
			)}
		/>
	);
}
