import styles from './home.module.css';
import { Button } from '@linktivity/link-ui';

const HomeView = () => {
  return (
    <div className={styles.home}>
      <Button>Click me</Button>
      <h1 className={styles.title}>{'Home'}</h1>
    </div>
  );
};

export default HomeView;
