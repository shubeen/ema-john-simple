import React, { useState } from 'react';

import * as firebase from "firebase/app";
import "firebase/auth";

import firebaseConfig from './firebaseConfig'
import { useContext } from 'react';
import { UserContext } from '../../App';
firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({

    isSignedIn : false,
    name: '',
    email:'',
    photo: ''
  })

  const [loggedInUser,setLoggedInUser]= useContext(UserContext);

  const provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleSignIn = ()=>{
    firebase.auth().signInWithPopup(provider)
    .then(res=>{
      const {displayName,photoURL, email} = res.user;
      const signedInUser= {
        isSignedIn : true,
        name: displayName,
        email:email,
        photo: photoURL
      }
      setUser(signedInUser);
      // console.log(displayName,photoURL,email);
    })
    .catch(err =>{
      console.log(err.message);
      console.log(err.code);
    })
    // console.log('sign in clicked')
  }
  const handleFbLogIn=()=>{
    firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(error=> {
      // Handle Errors here.
      var errorCode = error.code;
      console.log(errorCode);
      // var errorMessage = error.message;
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // // ...
    });
  }

  const handleSignOut= ()=>{
    firebase.auth().signOut()
    .then(res => {
      const signedOutUser ={
        isSignedIn : false,
        name: '',
        email:'',
        password:'',
        photo: '',
        error: '',
        success:false
      }
      setUser(signedOutUser);
    })
    
  }
  const handleBlur = (event)=> {
    // console.log(event.target.name, event.target.value);
    let isFieldValid = true;
    if(event.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value)
      
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length >6;
      const passwordHasNumber = /\d{1}/.test(event.target.value)
      isFieldValid =(isPasswordValid && passwordHasNumber);
    }
    if(isFieldValid){
       const newUserInfo = {...user};
      newUserInfo[event.target.name]= event.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit=(e)=>{
    // console.log(user.email , user.password);
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res=>{
        const newUserInfo = {...user};
        newUserInfo.error='';
        newUserInfo.success= true;
        setUser(newUserInfo);
        updateUserName(user.name);
        // console.log(res)
      })
      .catch(error=> {
        // Handle Errors here.
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success= false;
        setUser(newUserInfo);
        // ...
      });

    }

    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res=>{
        const newUserInfo = {...user};
        newUserInfo.error='';
        newUserInfo.success= true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        console.log('sign in user info', res.user)
      })
      .catch(error=> {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success= false;
        setUser(newUserInfo);
      });
    }
    e.preventDefault();
  }

  const updateUserName = name =>{
    var user = firebase.auth().currentUser;

user.updateProfile({
  displayName: name
 
}).then(()=> {
  console.log('user update successfully')
}).catch(error=> {
  // An error happened.
  console.log(error);
});
  }
  return ( 
    <div  style={{textAlign:'center'}}>
      <h1> PLease sign in to authenticate yourself</h1>
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> : 
        <button onClick={handleSignIn}>Please sign in</button>
      }
      <br/>
      <button onClick={handleFbLogIn}>Sign in using Facebook</button>
      {
        user.isSignedIn &&  <div>
                                <p> Welcome, {user.name}</p>
                                <p>Your Email: {user.email}</p>
                                <img src={user.photo} alt=""/>
                            </div>
      }

          <form onSubmit={handleSubmit}   className='registration'>
                <h1>please signup for registration</h1>

                <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="" id=""/>  
               
                <label htmlFor="">New User Sign Up</label>
                <br/>

               {newUser && <input name='name' placeholder='Your Name' onBlur={handleBlur}   type="text"/>}
                <br/>

                <input type="text" name='email' onBlur={handleBlur}   placeholder='Enter you email address' required    />
                
                <br/>
                <input type="password" name="password" onBlur={handleBlur}  placeholder="Please provide a password" required/>
                <br/>

                <input type="submit" value={newUser ? "Sign up": 'Sign in'}/>

          </form>
          <p style={{color:'red', textAlign: 'center'}}>{user.error}</p>
          {user.success && <p style={{color:'green', textAlign: 'center'}}>User {newUser ?'Created': 'logged in'} Successfully</p>}
      
  </div>
  );
}

export default Login;
