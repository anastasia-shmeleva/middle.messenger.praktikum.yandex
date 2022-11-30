import AuthAPI from "../API/AuthAPI";
import { store } from "../store/store";
import { SignInData, SignUpData } from "../utils/types";

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signUp(data: SignUpData) {
    await this.api.signUp(data);
  }

  async signIn(data: SignInData) {
    await this.api.signIn(data);
  }

  async logout() {
    await this.api.logout();
  }

  async fetchUser() {
    const user = await this.api.read();
    store.set("user", user);
  }

  async getUser() {
    const user = await this.api.read();
    return user;
  }
}

export default new AuthController();