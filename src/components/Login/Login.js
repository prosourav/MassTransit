import React, { useContext } from 'react';
import { UserContext } from '../../App';
// import firebaseConfig from '../../firebase.config';
import EmailLogin from '../EmailLogin/EmailLogin';
import firebase from "firebase/app";
import Header from '../Header/Header';
import './Login.css';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {} from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleLogin=()=>{
        firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
          const {displayName,email} = result.user;
          const logInUser = {name:displayName,email:email,isSignedIn:true,message:"",error:''}
          setLoggedInUser(logInUser);
          history.replace(from);
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const logInUser = {isSignedIn:false,error:errorMessage,message:''}
          setLoggedInUser(logInUser);
          console.log("error",errorCode,errorMessage)
        });
    }
    return (
        <div>
        <Header></Header>
        <hr/>
           <EmailLogin></EmailLogin>
           <div style={{textAlign:"center"}}>
           <small>Already have an account? <span>Sign In</span></small>
       <br/>
       <p>or</p>
       <div>
          
       <h4 className="option" onClick={handleGoogleLogin}>   <FontAwesomeIcon icon={faGoogle} /> &nbsp; Continue with Google</h4>
        
       </div>
        </div>
        </div>
    );
};

export default Login;