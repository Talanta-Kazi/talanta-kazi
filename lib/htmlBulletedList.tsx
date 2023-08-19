'use client';

import { Fragment, ReactNode, createElement } from 'react';

import { fancyId } from '@/lib/utils';
import {
	Avatar,
	Box,
	Grid,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from '@mui/material';
import rehypeParse from 'rehype-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

const customBullets = [
	<svg
		key='bullet1'
		width={12}
		height={12}
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 20 20'
		fill='currentColor'
	>
		<path
			fillRule='evenodd'
			d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
			clipRule='evenodd'
		/>
	</svg>,
	// Add more custom bullet points here if needed
];

export const htmlBulletList = (html: string) => {
	const renderNodes = (nodes: any): ReactNode[] => {
		const result: ReactNode[] = [];

		nodes.forEach((node: any) => {
			if (node.type === 'element') {
				if (node.tagName === 'ul' || node.tagName === 'ol') {
					let listItemIndex = 0;
					const bullets = node.tagName === 'ul' ? customBullets : [];

					visit(node, 'element', (childNode) => {
						if (childNode.tagName === 'li') {
							const bullet = bullets[listItemIndex % bullets.length];
							const text = childNode.children[0].value;
							const listItem = (
								<Grid item xs={12} key={fancyId() + listItemIndex}>
									<Box
										component={ListItem}
										disableGutters
										width={'auto'}
										padding={0}
									>
										<Box
											component={ListItemAvatar}
											minWidth={'auto !important'}
											marginRight={2}
										>
											<Box
												component={Avatar}
												bgcolor='secondary.main'
												width={20}
												height={20}
											>
												{bullet}
											</Box>
										</Box>
										<ListItemText primary={text} />
									</Box>
								</Grid>
							);
							result.push(listItem);
							listItemIndex++;
						}
					});
				} else {
					const children = node.children ? renderNodes(node.children) : [];
					const element = createElement(
						Fragment,
						{ key: fancyId() },
						createElement('p', {}, children)
					);
					result.push(element);
				}
			} else if (node.type === 'text') {
				result.push(node.value);
			}
		});

		return result;
	};

	// Parse the HTML into an Abstract Syntax Tree (AST)
	// @ts-expect-error
	const ast = unified().use(rehypeParse).parse(html);

	// @ts-expect-error
	return renderNodes(ast.children);
};
