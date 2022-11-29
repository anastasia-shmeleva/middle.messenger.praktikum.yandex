import UserAPI from "../API/UserAPI";
import { store } from "../store/store";
import { PasswordData, User } from "../utils/types";

class UserController {
  private api: UserAPI;

  constructor() {
    this.api = new UserAPI();
  }

  async updateUser(user: User) {
    const data = await this.api.update(user);
    store.set("user", data);
  }

  async updatePassword(data: PasswordData) {
    await this.api.updatePassword(data);
  }

  async updateAvatar(avatar: FormData) {
    const data = await this.api.updateAvatar(avatar);
    store.set("user", data);
  }

  async searchUser(login: string) {
    return await this.api.searchUser(login);
  }
}

export default new UserController();