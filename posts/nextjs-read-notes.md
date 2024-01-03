---
title: 'Reading notes for The book about Nextjs'
date: '2023-12-18'
---

### 路由系统
> Next.js 的路由基于的是文件系统，也就是说，一个文件就可以是一个路由。举个例子，你在 app/pages 目录下创建一个 index.js 文件，它会直接映射到 / 路由地址：

> Next.js 从 v13 起就使用了新的路由模式 —— App Router。之前的路由模式我们称之为“Pages Router”，为保持渐进式更新，依然存在。

```javascript Pages Router
└── pages
    ├── index.js
    ├── about.js
    └── more.js
```

```javascript App Router
└── app
    ├── page.js - required
    ├── layout.js - required
    ├── template.js - optional
    ├── loading.js - optional
    ├── error.js - optional
    └── not-found.js - optional
    ├── about
    │   └── page.js
    └── more
        └── page.js
```

1.动态路由（Dynamic Routes）
有的时候，你并不能提前知道路由的地址，就比如根据 URL 中的 id 参数展示该 id 对应的文章内容，文章那么多，我们不可能一一定义路由，这个时候就需要用到动态路由。
- 1.1 [folderName]
  使用动态路由，你需要将文件夹的名字用方括号括住，比如 [id]、[slug]。这个路由的名字会作为 paramprop 传给布局（layout）、 页面（page）、 路由处理程序（route）以及 generateMetadata（用于生成页面元数据） 函数。

- 1.2 [...folderName]
  在命名文件夹的时候，如果你在方括号内添加省略号，比如 [...folderName]，这表示捕获所有后面所有的路由片段。
  也就是说，app/shop/[...slug]/page.js会匹配 /shop/clothes，也会匹配 /shop/clothes/tops、/shop/clothes/tops/t-shirts等等。

2. 路由分组
在 app目录下，文件夹名称通常会被映射到 URL 中，但你可以将文件夹标记为路由组，阻止文件夹名称被映射到 URL 中。如 (folderName)

使用路由组，你可以将路由和项目文件按照逻辑进行分组，但不会影响 URL 路径结构。路由组可用于比如：

按站点、意图、团队等将路由分组
在同一层级中创建多个布局，甚至是创建多个根布局
