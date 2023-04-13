---
title: '因入口文件(html)被缓存,导致项目发布后,必须手动清除缓存才能看到最新的页面'
date: '2023-04-13'
---

## 前端代码中解决的方案

### 方案一: 在不需要被缓存中的 HTML 中,添加 <meta> 标签

```javascript
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragme" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
```

##### 缺点

只能用于尚未打开过该项目的用户，否则用户用的还是旧的 HTML，手动清除一次缓存才会生效。

### 方案二: 在 Nginx 中配置不缓存 .html 后缀的文件

```javascript
location / {
 expires 1h;
 root /home/html;
 index index.html index.htm;
 ## html不缓存
 if ($request_filename ~* .*\.(htm|html)$)
 {
     add_header Cache-Control "no-store";
 }
}
```
