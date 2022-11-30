export const scrollToBottom = () => {
  const messages = document.getElementsByClassName("chats-main__body")[0];
  messages.scrollTop = messages.scrollHeight;
}
