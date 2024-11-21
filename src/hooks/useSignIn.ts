import { signInWithEmailAndPassword, UserInfo } from 'firebase/auth';
import { SignType, SignTypeValue } from './../libs/types';
import { auth } from '../libs/firebase';
import useAuthStore from '../store/AuthStore';

const useSignIn = () => {
  const authStore = useAuthStore();

  const onSignIn = (t: SignTypeValue, e?: string, p?: string) => {
    switch (t) {
      case SignType.Credential:
        if (!e || !p) return;
        signInWithEmailAndPassword(auth, e, p).then((userCredential) => {
          const user = userCredential.user;
          authStore?.actions.setUserInfo(user);
        }).catch((err) => {
          console.error("An error occurred while signin with Email and password: ", err);
        });
        break;
      case SignType.Google:
      default:
        break;
    }
  };

  history.pushState(null, "", "/");

  return {
    onSignIn
  }
};
export default useSignIn;