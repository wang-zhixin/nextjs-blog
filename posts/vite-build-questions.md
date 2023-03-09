---
title: '记录一次Vite打包的错误'
date: '2023-03-09'
---

当项目的包管理器使用npm时,vue组件中使用 defineProps 使用解构语法报错。

```javascript
// Error: [vite:vue] [@vue/compiler-sfc] withDefaults can only be used with type-based defineProps declaration.
const { a } = defineProps({ a: String })
// Succeed
const props = defineProps({ a: String })
```

当项目的包管理器使用pnpm时,可以正常使用.
