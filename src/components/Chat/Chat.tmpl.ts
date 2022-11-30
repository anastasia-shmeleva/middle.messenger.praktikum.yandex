export default `
  {{#if stub}}
    <span>Choose chat to send a message</span>
  {{else}}
    <div class="chats-main__header">
      <img src="{{ avatar }}" alt="avatar" class="chats-main__avatar" />
      <span class='chats-main__name'>{{ currentChatName }}</span>
      <ul class="chats-main__actions-dots">
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
        {{{ dropdown }}}
      </ul>
    </div>

    <div class="chats-main__body"></div>

    <form class="chats-main__footer">
      <div class="chats-main__actions-clip"></div>
      <input 
        class="chats-main__input" 
        type=text
        id="message"
        name="message"
        value=""
        placeholder="Type here"
      />
      <button class="chats-main__submit-button" type="submit"></button>
    </form>
  {{/if}}
`;
