import { Button } from '@linktivity/link-ui';
import styles from './home.module.css';
// import SignInView from '@/views/SignIn';
import { useStore } from '@/stores';
import firebase from '@/constants/firebase';

const HomeView = () => {
  const { auth } = useStore();

  const handleLogout = () => {
    firebase.logout();
    auth.clearUser();
  };

  return (
    <div className={styles.home}>
      <h1>Home</h1>
      <p>User: {auth.user?.email}</p>
      <p>Logged in: {auth.loggedIn ? 'Yes' : 'No'}</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default HomeView;
