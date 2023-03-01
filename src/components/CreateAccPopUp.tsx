// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from "react";
import "../styles/SignInPopUp.css"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { popUpIsOpen } from "../reduxStore/popUp";
import { useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";
export default function SignInPopUp() {
  const isOpen = useSelector(state => state.popUp.value) === 1 ? true : false
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [createAccData, setCreateAccData] = useState({
    email: "",
    password: "",
    userName:"",
  })
  const [error, setError] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCreateAccData({
      ...createAccData,
      [e.target.name]: value
    });
  }
  const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
  
    createUserWithEmailAndPassword(auth, createAccData.email, createAccData.password)
      .then(async (userCredential) => {
        // Signed in 
       await set(ref(db, `users/${auth.currentUser.uid}/userInfo`), {
          userName: createAccData.userName,
          userEmail:createAccData.email,
       })
       dispatch(popUpIsOpen(0))

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode)

      });
      set(ref(db, `users/${auth.currentUser.uid}/userInfo`), {
        userName: createAccData.userName,
        userEmail:createAccData.email,
     })
      // setCreateAccData(state => state.email)

  }
  function closePopUp() {
    dispatch(popUpIsOpen(0))
  }
  function openLoginForm() {
    dispatch(popUpIsOpen(2))
  }
  return (
    <div className="pop-up-wrapper" style={isOpen ? { display: "block" } : { display: "none" }} onClick={() => closePopUp()}>
      <div className="login-box" style={error ? { ['--color' as any]: "rgb(164, 0, 0)" } : { ['--color' as any]: "#fff" }} onClick={(e) => e.stopPropagation()}>
        <p>Create an Account</p>
        {error ? <h2 className="error-message">{error}</h2> : null}
        <form autoComplete="false" autoSave="false" >
          <div className="user-box">
            <input required type="text" name="userName" value={createAccData.userName} onChange={(e) => handleChange(e)} />
            <label>UserName</label>
          </div>
          <div className="user-box">
            <input required type="email" name="email" value={createAccData.email} onChange={(e) => handleChange(e)} />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input required type="password" value={createAccData.password} name="password" onChange={(e) => handleChange(e)} />
            <label>Password</label>
          </div>
          <a href="#" onClick={(e) => handleSubmit(e)}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
        </form>
        <p>Already have an Account? <span onClick={openLoginForm} className="a2">Login!</span></p>
      </div>
    </div>)
}