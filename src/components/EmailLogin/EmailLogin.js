import React, { useContext } from 'react';
import './EmailLogin.css'
import firebaseConfig from '../../firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';


if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

const EmailLogin = () => {
  const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  
  const handleChange= (e) =>{
    let isFieldValid = true;
    if(e.target.name==="name"){
      isFieldValid = e.target.value !== (undefined || "");
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
      const newUser = {...loggedInUser};
      newUser[e.target.name] = e.target.value;
      newUser.isSignedIn = true;
      setLoggedInUser(newUser);
    }
    console.log("valid",isFieldValid);
  }
  
  const handleSubmit= (event) =>{
   if(loggedInUser.email && loggedInUser.password){
// console.log("checking:",user.email,user.password);
    firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
    .then((userCredential) => {
      const user2 = userCredential.user;
      const newUser = {...loggedInUser}
      newUser.isSignedIn=true;
      newUser.error='';
      newUser.message="login successFull";
      setLoggedInUser(newUser);
    })
    .catch((error) => {
     const errorCode = error.code;
      const errorMessage = error.message;
      const newUser = {...loggedInUser}
      newUser.isSignedIn=false;
      newUser.error=errorMessage;
      newUser.message="login successFull";
      setLoggedInUser(newUser);
      console.log(errorCode,errorMessage);
    });
   }
   event.preventDefault();
  }
  return (
    <div className="form">
    <form onSubmit={handleSubmit}>
    <label>Name :&nbsp;</label>
   <input type="text" name="name" onBlur= {handleChange}  placeholder="Enter Your Name" required></input>
     <br/><br/>
     <label>Email :&nbsp;</label>
     <input type="text" name="email" onBlur= {handleChange} placeholder="Enter email address" required></input>
     <br/><br/>
     <label>Password :&nbsp; </label>
     <input type="password" onBlur= {handleChange} name="password" placeholder="Enter password" required></input>
     <br/><br/>
     <input type="submit" value="Signup" className="submit"/><br/>
     </form>
    
    </div>
  );
};

export default EmailLogin;