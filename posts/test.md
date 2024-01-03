---
title: '测试'
date: '2024-01-02'
---

```typescript
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeShikijiFromHighlighter from 'rehype-shikiji/core'

import { fromHighlighter } from 'markdown-it-shikiji/core'
import { getHighlighterCore } from 'shikiji/core'
import { getWasmInlined } from 'shikiji/wasm'

const highlighter = await getHighlighterCore({
  themes: [import('shikiji/themes/vitesse-light.mjs')],
  langs: [import('shikiji/langs/javascript.mjs')],
  loadWasm: getWasmInlined,
})

const raw = await fs.readFile('./input.md')
const file = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeShikijiFromHighlighter, highlighter, {
    // or `theme` for a single theme
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  })
  .use(rehypeStringify)
  .processSync(raw) // it's also possible to process synchronously
```
