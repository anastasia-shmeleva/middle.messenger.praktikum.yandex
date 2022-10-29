export default `
  <div class="chat-aside__body chat-aside__item-group">
    <div class="chat-img"></div>
    <div class="item-group__body">
      <span class="chat-name">{{ name }}</span>
      <span class="chat-text">{{ message }}</span>
      <time class="chat-time">{{ time }}</time>
      <div class="chat-quantity">{{ quantity }}</div>
    </div>
  </div>
`