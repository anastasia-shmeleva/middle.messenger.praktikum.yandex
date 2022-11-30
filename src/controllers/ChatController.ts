import ChatAPI from "../API/ChatAPI";
import { store } from "../store/store";

class ChatController {
  private api: ChatAPI;

  constructor() {
    this.api = new ChatAPI();
  }

  async getChats() {
    const chatList = await this.api.read();
    store.set("chatList", chatList);
  }

  async addChat(title: string) {
    await this.api.addChat(title);
  }

  async deleteChat(chatId: number) {
    await this.api.deleteChat(chatId);
  }

  async addUser(chatId: number, userId: number) {
    return this.api.addUser(chatId, userId);
  }

  async deleteUser(chatId: number, userId: number) {
    return this.api.deleteUser(chatId, userId);
  }
}

export default new ChatController();