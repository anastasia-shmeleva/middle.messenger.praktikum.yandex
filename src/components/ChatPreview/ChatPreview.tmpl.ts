export default `
  <img src="{{ avatar }}" alt="avatar" class="chat-img">
  <div class="item-group__body">
    <span class="chat-name">{{ name }}</span>
    <span class="chat-text">{{ message }}</span>
    <time class="chat-time">{{ time }}</time>
    {{#if 0 includeZero = false}}
      <div class="chat-quantity">{{ quantity }}</div>
    {{/if}}
  </div>
`
