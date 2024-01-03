import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkPrettier from 'remark-prettier'
import rehypeStringify from 'rehype-stringify'
import rehypeShikijiFromHighlighter from 'rehype-shikiji/core'
import { getHighlighterCore } from 'shikiji/core'
import { getWasmInlined } from 'shikiji/wasm'

const postsDirectory = path.join(process.cwd(), 'posts');
export function getSortedPostsData() {
	// Get file names under /posts
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		// Remove ".md" from file name to get id
		const id = fileName.replace(/\.md$/, '');

		// Read markdown file as string
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		// Use gray-matter to parse the post metadata section
		const matterResult = matter(fileContents);

		// Combine the data with the id
		return {
			id,
			...matterResult.data,
		};
	});
	// Sort posts by date
	return allPostsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});
}

export function getAllPostIds() {
	const fileNames = fs.readdirSync(postsDirectory);
	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.md$/, ''),
			},
		};
	});
}

export async function getPostData(id) {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	// register
	const highlighter = await getHighlighterCore({
		themes: [
			import('shikiji/themes/vitesse-light.mjs'),
			import('shikiji/themes/vitesse-dark.mjs')
		],
		langs: [
			import('shikiji/langs/javascript.mjs'),
			import('shikiji/langs/typescript.mjs'),
			import('shikiji/langs/css.mjs'),
		],
		loadWasm: getWasmInlined
	})

	// Use gray-matter to parse the post metadata section
	const matterResult = matter(fileContents);

	const processedContent = await unified()
		.use(remarkParse)
		.use((a) => {
			console.log(a)
		})
		.use(remarkPrettier)
		.use(remarkRehype)
		.use(rehypeShikijiFromHighlighter, highlighter, {
			themes: {
				light: 'vitesse-light',
				dark: 'vitesse-dark',
			},
			lang: 'typescript',
			transformers: [
				{
					code(node) {
						console.log(node, 'node')
						// addClassToHast(node, 'language-js')
					}
				},
			]
		})
		.use(rehypeStringify)
		.process(matterResult.content)

	const contentHtml = processedContent.toString()

	// Combine the data with the id and contentHtml
	return {
		id,
		contentHtml,
		...matterResult.data,
	};
}
