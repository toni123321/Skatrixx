import { signInWithGoogle } from '../services/firebase';
import "../stylesheets/LogInScreen.css"


const Login = () => {

  const loginInWithGoogleAndAuthorize = () => {
   signInWithGoogle()
  }

  return (
    <div>
      <button className="log-in-button" onClick={loginInWithGoogleAndAuthorize}><i className="fab fa-google"></i>Sign in with Google</button>
    </div>
  )
}

export default Login;