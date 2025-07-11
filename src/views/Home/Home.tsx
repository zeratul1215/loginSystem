import styles from './home.module.css';
// import SignInView from '@/views/SignIn';
import { useStore } from '@/stores';

const HomeView = () => {
  const { auth } = useStore();

  // console.log(auth.user);

  return (
    <div className={styles.home}>
      <h1>Home</h1>
      <p>User: {auth.user?.email}</p>
      <p>Logged in: {auth.loggedIn ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default HomeView;
