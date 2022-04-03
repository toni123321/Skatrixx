import { signInWithGoogle } from '../services/firebase';


const Login = () => {

  const loginInWithGoogleAndAuthorize = () => {
    signInWithGoogle()
  }

  return (
    <div>
      <button className="button" onClick={loginInWithGoogleAndAuthorize}><i className="fab fa-google"></i>Sign in with google</button>
    </div>
  )
}

export default Login;