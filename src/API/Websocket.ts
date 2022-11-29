import { store } from "../store/store";
import { State } from "../utils/types";
import HTTP from "./HTTP";

const EVENTS = {
  OPEN: "open",
  CLOSE: "close",
  MESSAGE: "message",
  ERROR: "error",
};

export default class Websocket {
  private socket: WebSocket | null = null;
  private baseURL = "ya-praktikum.tech";
  private interval = 0;

  private open() {
    // this.socket!.send(JSON.stringify({
    //   content: 'Моё первое сообщение миру!',
    //   type: 'message',
    // }));
    this.getMessages();
    this.ping();
  }

  private ping() {
    if (this.interval !== 0) {
      clearInterval(this.interval);
      this.interval = 0;
    }
    this.interval = window.setInterval(() => {
      this.socket!.send(
        JSON.stringify({
          type: "ping",
        }),
      );
    }, 10000);
  }

  private getMessages() {
    this.socket!.send(
      JSON.stringify({
        content: "0",
        type: "get old",
      }),
    );
  }
  
  private close() {
    this.ping();
  }

  private message(e: any) {
    const data = JSON.parse(e.data);
    
    if (data.type === "message") {
      const messageList = (store.getState() as unknown as State).messageList || [];
      messageList.push({
        sentBy: data.user_id,
        content: data.content,
        time: data.time,
      });
      store.set("messageList", messageList);
    } else if (Array.isArray(data)) {
      const oldMessageList = data.map((item) => ({
        sentBy: item.user_id,
        content: item.content,
        time: item.time,
      })).reverse();
      store.set("messageList", oldMessageList);
    } 
  }

  sendMessage(content: string) {
    console.log(content)
    this.socket!.send(
      JSON.stringify({
        content: content,
        type: "message",
      }),
    );
  }

  private error(e: any) {
    console.error(e.message);
  }

  connect() {
    const chatId = store.getState().currentChatId;
    const userId = (store.getState() as unknown as State).user?.id;

    const open = this.open.bind(this);
    const close = this.close.bind(this);
    const message = this.message.bind(this);
    const error = this.error.bind(this);

    const http = new HTTP();
    http
      .post(`/chats/token/${chatId}`, { mode: "cors", credentials: "include" })
      .then((data: any) => {
        this.socket = new WebSocket(`wss://${this.baseURL}/ws/chats/${userId}/${chatId}/${data.token}`);
        this.socket.addEventListener(EVENTS.OPEN, open);
        this.socket.addEventListener(EVENTS.CLOSE, close);
        this.socket.addEventListener(EVENTS.MESSAGE, message);
        this.socket.addEventListener(EVENTS.ERROR, error);
      })
      .catch((e: Error) => console.error(e));
  }
}
