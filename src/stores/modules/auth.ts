import { action, computed, observable } from 'mobx';
import type { User } from '@linktivity/link-utils';

const storage = localStorage;
const ACCESS_TOKEN = 'accessToken';

export class Auth {
  @observable accessor user: User | null = null;
  @observable accessor accessToken = storage.getItem(ACCESS_TOKEN) || '';

  @action
  setUser(user: User | null) {
    this.user = user;
  }

  @action
  setToken(token: string) {
    try {
      storage.setItem(ACCESS_TOKEN, token);
    } finally {
      this.accessToken = token;
    }
  }

  @action
  getToken() {
    return this.accessToken;
  }

  @action
  clearUser() {
    this.user = null;
    storage.removeItem(ACCESS_TOKEN);
    this.accessToken = '';
  }

  @computed
  get loggedIn(): boolean {
    return !!this.accessToken || !!this.user;
  }
}

export default new Auth();
