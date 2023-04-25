---
title: '一次在业务中实现实时对话功能的思考'
date: '2023-04-23'
---

#### 相关涉及

- webworker
- websocket
- indexDB
- pinia

#### 大体构思

Step 1.The chat data is managed globally Based on pinia and indexDB(or localStorage)
Step 2.Use websocket fetch data in the webworker.and send data to main thread use the postMessage method.
Step 3.The main thread receive data and render page


#### 具体实现

Step 1.The chat data is managed globally Based on pinia and indexDB(or localStorage)
 - constant: chatList
 - methods
  - insertChat - 发送一条消息时要插入chatList中,即使它发送失败了
    - 发送文字消息
    - 发送图片消息
    - 发送文件(only type .pdf)
  <!-- - updateChatById - 更新一条聊天的状态,比如一条原本失败的消息现在发送成功了 -->
  - deleteChatByTempId
    - 删除一条聊天，by tempId,在设计中,每条消息插入到 chatList 的时候都应该先生成 tempId 字段, 在发送成功后,删除这一条tempId的chat,同时往chatList末尾插入一条带有ID的chat
  
