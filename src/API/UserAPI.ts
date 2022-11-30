import { PasswordData, User } from "../utils/types";
import HTTP from "./HTTP";

export default class UserAPI {
  protected http: HTTP;

  constructor() {
    this.http = new HTTP("/user/");
  }

  headers: Record<string, string> = { "Content-Type": "application/json" };

  update(data: User): Promise<string | unknown> {
    return this.http.put("profile", { data, headers: this.headers });
  }

  updatePassword(data: PasswordData): Promise<string | unknown> {
    return this.http.put("password", { data, headers: this.headers });
  }

  updateAvatar(data: FormData): Promise<string | unknown> {
    return this.http.put("profile/avatar", { data });
  }

  searchUser(login: string): Promise<User | unknown> {
    const data = {login: login}
    return this.http.post("search", { data, headers: this.headers });
  }
}