import { PasswordData, User } from "../utils/types";
import HTTP from "./HTTP";

export default class UserAPI {
  protected http: HTTP;

  constructor() {
    this.http = new HTTP();
  }

  headers: Record<string, string> = { "Content-Type": "application/json" };

  update(data: User): Promise<string | unknown> {
    return this.http.put("/user/profile", { data, headers: this.headers });
  }

  updatePassword(data: PasswordData): Promise<string | unknown> {
    return this.http.put("/user/password", { data, headers: this.headers });
  }

  updateAvatar(data: FormData): Promise<string | unknown> {
    return this.http.put("/user/profile/avatar", { data });
  }

  searchUser(login: string): Promise<User | unknown> {
    const data = {login: login}
    return this.http.post("/user/search", { data, headers: this.headers });
  }
}