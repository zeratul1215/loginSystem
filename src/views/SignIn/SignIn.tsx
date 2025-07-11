import { Form, Button, Input, Rules } from '@linktivity/link-ui';
import { useMemo, useState } from 'react';
import firebase from '@/constants/firebase';
import { GoogleIcon, FacebookIcon } from '@/components/icons';
import styles from './SignIn.module.css';
import { useNavigate } from 'react-router';

const SignInView = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });
  const [valid, setValid] = useState(true);

  const navigate = useNavigate();

  const rules: Rules = useMemo(
    () => ({
      email: [
        {
          required: true,
          message: 'Please enter your email',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: 'Please enter your password',
          trigger: 'blur'
        }
      ]
    }),
    []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);
    const userCredential = await firebase.login(
      formValues.email,
      formValues.password
    );
    console.log(userCredential);
    navigate('/');
  };

  return (
    <>
      <div className={styles.signInForm}>
        <Button onClick={firebase.googleLogin} className={styles.signInButton}>
          <GoogleIcon size={20} className={styles.buttonIcon} />
          <span>Login with Google</span>
        </Button>
        <Button
          onClick={firebase.facebookLogin}
          className={styles.signInButton}
        >
          <FacebookIcon size={20} className={styles.buttonIcon} />
          <span>Login with Facebook</span>
        </Button>
        <Form
          values={formValues}
          onValuesChange={setFormValues}
          onValidateChange={setValid}
          rules={rules}
          onSubmit={handleSubmit}
        >
          <Form.Item label="Email" field="email">
            <Input />
          </Form.Item>
          <Form.Item label="Password" field="password">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="submit" disabled={!valid}>
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default SignInView;
