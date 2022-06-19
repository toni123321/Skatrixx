import { signInWithGoogle } from '../../services/firebaseService';
import "../../stylesheets/auth/LogInScreen.css"
import GoogleIcon from '../../images/googleIcon.png'


const Login = () => {

  const loginInWithGoogleAndAuthorize = () => {
   signInWithGoogle()
  }

  return (
    <div>
      {/* <i className="fab fa-google"></i> */}
      <button className="log-in-button default-button" onClick={loginInWithGoogleAndAuthorize}>Sign in with <img id="icon" src={GoogleIcon} alt=''></img> </button>
    </div>
  )
}

export default Login;