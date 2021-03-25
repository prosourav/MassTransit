import React, { useContext, useState } from 'react';
import './EmailLogin.css'
import firebaseConfig from '../../firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

const EmailLogin = () => {

  const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  const [signInUser, setSignInUser] = useState({
      oldUser:"true",
  });
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  
  const handleChange= (e) =>{
    let isFieldValid = true;
    if(e.target.name==="name"){
      isFieldValid = e.target.value ;  
    }
    if(e.target.name==="email"){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name==="password"){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUser = {...signInUser};
      newUser[e.target.name] = e.target.value;
      newUser.isSignedIn = true;
      setSignInUser(newUser);
    }
    console.log("signin user",signInUser);
  }
  
  const handleSubmit= (event) =>{
   if(signInUser.password && signInUser.email && signInUser.name){
console.log("checking:",signInUser.email,signInUser.password);
    firebase.auth().createUserWithEmailAndPassword(signInUser.email, signInUser.password)
    .then((userCredential) => {
      const user = userCredential.user;
      const newUser = {...signInUser}
      newUser.isRegistered=true;
      newUser.success="Registration successFull";
      newUser.error = "";
      setSignInUser(newUser);
      updateUserName(signInUser.name);
console.log("reg",user);
    })
    .catch((error) => {
      const errorMessage = error.message;
      const newUser = {...signInUser}
      newUser.isRegistered=false;
      newUser.success="";
      newUser.error=errorMessage;
      setSignInUser(newUser);
      // console.log(errorCode,errorMessage);
    });
    // event.preventDefault();
   }

   if (signInUser.oldUser && signInUser.email && signInUser.password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(signInUser.email, signInUser.password)
      .then((userCredential) => {
        var user3 = userCredential.user;
        const logInUser = { ...signInUser };
        logInUser.error = "";
        logInUser.name = user3.displayName;
        logInUser.success = " Login successFull";
        logInUser.isLoggedIn=true;
        setLoggedInUser(logInUser);
        console.log("login Successfull");
        console.log(user3);

        history.replace(from);
      })
      .catch((error) => {
    //     console.log("error runing");
        const errorMessage = error.message;
        const logInUser ={
          success:"",
          error:errorMessage,
          isLoggedIn:false
        }
        console.log(errorMessage);
        setLoggedInUser(logInUser);
      });
  
  }
  event.preventDefault();
   
  }
  
  const updateUserName = (name)=>{
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName:name,
    }).then(function() {
     
    }).catch(function(error) {
 
    });
}
  const handleSignIn = () =>{
    const newUser = {...signInUser};
    newUser.oldUser = false;
    setSignInUser(newUser);
  }
  const handleLogin = () =>{
    const newUser = {...signInUser};
    newUser.oldUser = true;
    setSignInUser(newUser);
  }

  return (
    <div className="form">
    <form onSubmit={handleSubmit}>
    
   {!signInUser.oldUser && <input className="user-input" type="text" name="name" onBlur= {handleChange}  placeholder="Enter Your Name" required></input>}
     <br/><br/>
  
     <input className="user-input" type="text" name="email" onBlur= {handleChange} placeholder="Enter email address" required></input>
     <br/><br/>
     <input className="user-input" type="password" onBlur= {handleChange} name="password" placeholder="Enter password" required></input>
     <br/><br/>
     <input  type="submit" value="Login" className="submit" onClick={handleLogin}/><br/><br/>
     <input  style={{backgroundColor:"red"}} type="submit" value="Signup" className="submit" onClick={handleSignIn}/>
     </form>
    {signInUser.success ? <p style={{color:"green"}}>{signInUser.success}</p> : <p style={{color:"red"}}>{signInUser.error}</p> }
    {loggedInUser.error && <p style={{color:"red"}}>{loggedInUser.error }</p>}
    </div>
  );
};

export default EmailLogin;