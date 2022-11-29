import HTTP from "./HTTP";
import { Chat } from "../utils/types";

export default class ChatAPI {
  protected http: HTTP;

  constructor() {
    this.http = new HTTP();
  }

  headers: Record<string, string> = { "Content-Type": "application/json" };

  read(): Promise<Chat[] | unknown> {
    return this.http.get("/chats", { headers: this.headers });
  }

  addChat(title: string): Promise<string | unknown> {
    const data =  { title: title }
    return this.http.post("/chats", { data, headers: this.headers });
  }

  deleteChat(chatId: number): Promise<string | unknown> {
    const data =  { chatId: chatId }
    return this.http.delete("/chats", { data, headers: this.headers });
  }

  addUser(chatId: number, userId: number): Promise<string | unknown> {
    const data = { users: [ userId ], chatId }
    return this.http.put("/chats/users", { data, headers: this.headers });
  }

  deleteUser(chatId: number, userId: number): Promise<string | unknown> {
    const data = { users: [ userId ], chatId }
    return this.http.delete("/chats/users", { data, headers: this.headers });
  }
}