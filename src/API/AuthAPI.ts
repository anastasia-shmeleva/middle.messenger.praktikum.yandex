import { SignInData, SignUpData, User } from "../utils/types";
import HTTP from "./HTTP";

export default class AuthAPI {
  protected http: HTTP;

  constructor() {
    this.http = new HTTP("/auth/");
  }

  headers: Record<string, string> = { "Content-Type": "application/json" };

  signUp(data: SignUpData): Promise<string | unknown> {
    return this.http.post("signup", { data, headers: this.headers });
  }

  signIn(data: SignInData): Promise<string | unknown> {
    return this.http.post("signin", { data, headers: this.headers });
  }

  logout(): Promise<string | unknown> {
    return this.http.post("logout", { headers: this.headers });
  }

  read(): Promise<User | unknown> {
    return this.http.get("user", {});
  }
}