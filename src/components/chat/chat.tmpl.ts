export default `
  {{#if empty}}
    <span>{{ stub }}</span>
  {{else}}
    <div class="chats-main__header">
      <img src="{{ avatar }}" alt="avatar" class="chats-main__avatar" />
      <span class='chats-main__name'>{{ currentChatName }}</span>
      <ul class="chats-main__actions-dots">
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
      </ul>
    </div>

    <div class="chats-main__body"></div>

    <div class="chats-main__footer">
      <div class="chats-main__actions-clip"></div>
      <input 
        class="chats-main__input" 
        type=text
        id=""
        name="message"
        value=""
        placeholder="Type here"
      />
      <button class="chats-main__submit-button">
        <div class="chats-main__arrow"></div>
      </button>
    </div>
  {{/if}}
`;
