import { Firebase } from '@linktivity/link-utils';
import { auth } from '@/stores';

const firebase = new Firebase({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
});

firebase.auth.onAuthStateChanged(async user => {
  if (user) {
    auth.setUser(user);
    const token = await user.getIdToken();
    auth.setToken(token);
  } else {
    auth.clearUser();
  }
});

export default firebase;
