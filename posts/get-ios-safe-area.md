---
title: 'Get safe area from ios system in Javascript or Typescript'
date: '2023-04-25'
---

#### Within CSS

```javascript
:root {
    --sat: env(safe-area-inset-top);
    --sar: env(safe-area-inset-right);
    --sab: env(safe-area-inset-bottom);
    --sal: env(safe-area-inset-left);
}
```

#### Within JS

```javascript
getComputedStyle(document.documentElement).getPropertyValue('--sat')
```
