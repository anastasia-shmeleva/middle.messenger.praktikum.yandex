import HTTP from "./HTTP";
import { Chat } from "../utils/types";

export default class ChatAPI {
  protected http: HTTP;

  constructor() {
    this.http = new HTTP("/chats/");
  }

  headers: Record<string, string> = { "Content-Type": "application/json" };

  read(): Promise<Chat[] | unknown> {
    return this.http.get("", { headers: this.headers });
  }

  addChat(title: string): Promise<string | unknown> {
    const data =  { title: title }
    return this.http.post("", { data, headers: this.headers });
  }

  deleteChat(chatId: number): Promise<string | unknown> {
    const data =  { chatId: chatId }
    return this.http.delete("", { data, headers: this.headers });
  }

  addUser(chatId: number, userId: number): Promise<string | unknown> {
    const data = { users: [ userId ], chatId }
    return this.http.put("users", { data, headers: this.headers });
  }

  deleteUser(chatId: number, userId: number): Promise<string | unknown> {
    const data = { users: [ userId ], chatId }
    return this.http.delete("users", { data, headers: this.headers });
  }

  updateAvatar(data: FormData): Promise<string | unknown> {
    return this.http.put("avatar", { data });
  }
}
