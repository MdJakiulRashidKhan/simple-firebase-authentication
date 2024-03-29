import React, { useState } from 'react';
import app from '../../firebase/firebase.init';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

const Login = () => {
    const [user,setUser]=useState(null);
    const auth = getAuth(app);
    const googleProvider =new GoogleAuthProvider();
    const githubProvider =new GithubAuthProvider();
    const handleSignIn=()=>{
        signInWithPopup(auth,googleProvider)
        .then(result =>{
          const loggedInUser = result.user;
          console.log(loggedInUser);  
          setUser(loggedInUser);
        })
        .catch(error =>{
            console.log(error);
        })

    }
    const handleGithubSignIn=()=>{
        signInWithPopup(auth,githubProvider)
        .then(result =>{
          const loggedInUser = result.user;
          console.log(loggedInUser);  
          setUser(loggedInUser);
        })
        .catch(error =>{
            console.log(error);
        })

    }
    const handleSignOut=()=>{
        signOut(auth)
        .then(res =>{
           setUser(null) 
        })
        .catch(error =>{
            console.log(error);
        })
    }

    return (
        <div>
            { user?
                <button onClick={handleSignOut}>Sign Out</button>:
                <div>
                    <button onClick={handleSignIn}>Google login</button>
                    <button onClick={handleGithubSignIn}>Github login</button>
                </div>
                }
          {user &&  <div>
                <h3>User: {user.displayName}</h3>
                <p>Email:{user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>}
        </div>
    );
};

export default Login;