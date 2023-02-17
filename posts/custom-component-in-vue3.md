---
title: 'use v-model for custom-component in Vue3'
date: '2023-02-17'
---

### Scene

- In dialog component, We need binding **show** to control display and hiding
- In Input component, We need binging **value**

### Key point

- 组件中接受的 props 默认名称为 **modelValue**

Vue2

```
props: {
  modelValue:String,
  text:String
}
```

Vue3
`const props = defineProps({ modelValue: String })`

- 组件中要显式定义 emits
  Vue2

```
emits: [
  'update:modelValue'
]
```

Vue3
`const emits = defineEmits(['update:modelValue'])`
