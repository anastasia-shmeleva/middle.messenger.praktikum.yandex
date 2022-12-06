import template from "./chats.tmpl";
import Block from "../../utils/Block";
import ChatBlock from "../../components/Chat/Chat";
import ChatListHeader from "../../components/ChatListHeader/ChatListHeader";
import ChatPreview from "../../components/ChatPreview/ChatPreview";
import AuthController from "../../controllers/AuthController";
import { connect } from "../../store/connect";
import { store } from "../../store/store";
import { User, Chat, messageList as messageListType } from "../../utils/types";
import ChatController from "../../controllers/ChatController";
import Popup from "../../components/Popup/Popup";
import Button from "../../components/Button/Button";
import Router from "../../utils/Router";
import FormField from "../../components/FormField/FormField";
import Dropdown from "../../components/Dropdown/Dropdown";
import UserController from "../../controllers/UserController";
import { ws } from "../../index";
import Message from "../../components/Message/Message";
import HTTP from "../../API/HTTP";
import { avatarStub } from "../profile/profile";
import { scrollToBottom } from "../../utils/scrollToBottom";

interface Props {
  chats: Chat[];
  currentChatId: number;
  user: User;
  messageList: messageListType[];
  events: {
    click: (e: Event) => void;
    submit: (e: SubmitEvent) => void
  },
}

class Chats extends Block<Props> {
  constructor(props: Props) {
    super("main", props);
    this.element?.classList.add("wrapper");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  updateUser() {
    const { user } = store.getState();
    (this.element!.querySelectorAll(".chat-img")[0] as HTMLImageElement)!.src = (user as User).avatar !== null ? `${HTTP.BASE_URL}/resources${(user as User).avatar as string | ""}` : avatarStub;
  }

  getChats() {
    const { chatList } = store.getState();
    const chatContainer = this.element?.querySelector(".chat-aside");
    const elements = chatContainer?.getElementsByClassName("chat-aside__body");
    while (elements![0]) {
      elements![0].parentNode!.removeChild(elements![0]);
    }
 
    (chatList as Chat[]).map((item) => {
      const chatPreview = new ChatPreview({ 
        avatar: item.avatar !== null ? `${HTTP.BASE_URL}/resources/${item.avatar}` : avatarStub,
        name: item.title, 
        message: item.last_message?.content, 
        time:  new Date(item.last_message?.time).toLocaleTimeString().split('').slice(0, 5).join(''), 
        quantity: item.unread_count,
        events: {
          click: () => {
            store.set("currentChatId", item.id);
            this.getCurrentChat();
            ws.connect();
            this.getMessages();
          }
        }, 
      });
      chatContainer?.append(chatPreview.getContent()!)
    })
  }

  getCurrentChat() {
    const { chatList, currentChatId } = store.getState();
    const currentChat = (chatList as Chat[])!.find((chat: Chat) => chat.id === currentChatId);
    const chatContainer = this.element?.querySelector(".chat-main");
    
    const chat = new ChatBlock({ 
      stub: false,
      avatar: currentChat!.avatar !== null ? `${HTTP.BASE_URL}/resources/${currentChat!.avatar}` : avatarStub,
      currentChatName: currentChat!.title,
      dropdown: new Dropdown({
        events: {
          click: (e: Event) => {    
            if ((e.target! as HTMLElement).classList.contains("add-user") || 
            (e.target! as HTMLElement).textContent === "Add user") {
              this.togglePopup((".popup.add-user"));
            }
            if ((e.target! as HTMLElement).classList.contains("delete-user") || 
            (e.target! as HTMLElement).textContent === "Delete user") {
              this.togglePopup((".popup.delete-user"));
            }
            if ((e.target! as HTMLElement).classList.contains("delete-chat") || 
            (e.target! as HTMLElement).textContent === "Delete chat") {
              this.deleteChat(currentChatId as number)
            }
          }
        }
      })
    });
    
    chatContainer?.parentNode!.replaceChild(chat.getContent()!, chatContainer);
  }

  deleteChat(currentChatId: number) {
    ChatController.deleteChat(currentChatId).then(() => {
      ChatController.getChats().then(() => {
        this.getChats();
        ChatController.getChats();
      }).catch((e) => {
        console.error(e);
      });
    }).catch((e) => {
      console.error(e);
    });
  }

  addUser(e: SubmitEvent) {
    e.preventDefault();
    const login = (e.target! as HTMLElement).querySelector("input")?.value;
    const { currentChatId } = store.getState();
    if (login && currentChatId) {
      UserController.searchUser(login).then((data) => {
        const user = (data as User[])[0];
        if (user && user.id) {
          ChatController
          .addUser(currentChatId as number, user.id)
          .then(() => {
            alert(`User ${login} successfully added`);
          }).catch((e) => {
            console.error(e);
          });
        }
      });
    }
  }

  deleteUser(e: SubmitEvent) {
    e.preventDefault();
    const login = (e.target! as HTMLElement).querySelector("input")?.value;
    const { currentChatId } = store.getState();
    if (login && currentChatId) {
      UserController.searchUser(login).then((data) => {
        const user = (data as User[])[0];
        if (user && user.id) {
          ChatController
          .deleteUser(currentChatId as number, user.id)
          .then(() => {
            alert(`User ${login} successfully deleted from this chat`);
          }).catch((e) => {
            console.error(e);
          });
        }
      });
    }
  }

  getMessages() {
    const { messageList, user } = store.getState();
    const messagesContainer = this.element?.querySelector(".chats-main__body");
    const messages = this.element?.querySelectorAll(".message");
    if (messages) {
      messages.forEach((message) => messagesContainer?.removeChild(message))
    }

    if (!messageList) {
      return console.error("no chat selected")
    }

    const messageArr = (messageList as messageListType[]).map((item) => {
      let className = "";
      if (item.sentBy === (user as User).id) {
        className = "sent"
      }
      return new Message({
        class: className,
        content: item.content,
        time: new Date(item.time).toLocaleTimeString().split('').slice(0, 5).join('')
      });
    });

    messagesContainer && messageArr.forEach((item) => messagesContainer.append(item.getContent()!))
  }

  togglePopup(popup: string) {
    this.element?.querySelector(popup)?.classList.toggle("visible");
  }

  addChat(e: Event) {
    e.preventDefault();
    const title = (e.target! as HTMLElement).querySelector("input")?.value;
    if (title) {
      ChatController.addChat(title).then(() => {
        ChatController.getChats().then(() => {
          this.getChats();
        }).catch((e) => {
          console.error(e);
        });
      }).catch((e) => {
        console.error(e);
      });
    }
  }

  sendMessage(content: string) {
    ws.sendMessage(content);
    scrollToBottom();
  }

  init(): void {
    this.children.chatListHeader = new ChatListHeader({});
    this.children.chat = new ChatBlock({ 
      stub: true,
    });
    this.props.events = {
      click: (e: Event) => {
        if (e.target!.name === "chat-img") {
          Router.getInstance().go("/settings")
        }
        if ((e.target as HTMLElement).id === "add-chat") {
          this.togglePopup(".popup.add-chat");
        }
      },
      submit: (e: SubmitEvent) => {
        e.preventDefault();
        let message = ((e.target as HTMLFormElement)!.querySelector("#message") as HTMLInputElement)!.value;
        this.sendMessage(message);
        return message = "";
      }
    };

    this.children.addChatPopup = new Popup({
      title: "Add chat",
      content: new FormField({ label: "Chat name", type: "text", value: "", name: "addChat" }),
      button_save: new Button({ name: "Add", type: "submit", class: "save" }),
      button_cancel: new Button({ name: "Cancel", class: "cancel" }),
      class: "add-chat",
      events: {
        submit: (e: SubmitEvent) => {
          this.addChat(e);
          this.togglePopup(".popup.add-chat");
        },
        click: (e: Event) => {         
          if (e.target === this.element?.getElementsByClassName("cancel")[0]) {
            this.togglePopup(".popup.add-chat");
          }
        }
      },
    });

    this.children.addUserPopup = new Popup({
      title: "Add user",
      content: new FormField({ label: "Login", type: "text", value: "", name: "addChat" }),
      button_save: new Button({ name: "Add", type: "submit", class: "save" }),
      button_cancel: new Button({ name: "Cancel", class: "cancel" }),
      class: "add-user",
      events: {
        submit: (e: SubmitEvent) => {
          this.addUser(e);
          this.togglePopup(".popup.add-user");
        },
        click: (e: Event) => {      
          if (e.target === document.getElementsByClassName("cancel")[1]) {
            this.togglePopup(".popup.add-user");
          }
        }
      },
    });

    this.children.deleteUserPopup = new Popup({
      title: "Delete user",
      content: new FormField({ label: "Login", type: "text", value: "", name: "addChat" }),
      button_save: new Button({ name: "Add", type: "submit", class: "save" }),
      button_cancel: new Button({ name: "Cancel", class: "cancel" }),
      class: "delete-user",
      events: {
        submit: (e: SubmitEvent) => {
          this.deleteUser(e);
          this.togglePopup(".popup.delete-user");
        },
        click: (e: Event) => {      
          if (e.target === document.getElementsByClassName("cancel")[2]) {
            this.togglePopup(".popup.delete-user");
          }
        }
      },
    });

    AuthController
    .fetchUser()
    .then(() => {
      this.updateUser();
    }).catch((e) => {
      console.error(e);
    });

    ChatController
    .getChats()
    .then(() => {
      this.getChats();
    }).catch((e) => {
      console.error(e);
    });
    
    super.init();
  }

  componentDidUpdate(_oldProps: Props, newProps: Props): boolean {
    if (newProps.chats) {
      this.getChats();
    }
    if (newProps.messageList) {
      this.getMessages();
    }
    return false
  }
}

const chatWithStore = connect((state) => ({
  user: state.user || "",
  chats: state.chatList,
  messageList: state.messageList,
  currentChatId: state.currentChatId || null,
}));

export default chatWithStore(Chats);
