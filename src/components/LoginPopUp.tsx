import React, { useState } from "react";
import "../styles/SignInPopUp.css"
import { browserSessionPersistence, getAuth, inMemoryPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth"
import { app, db } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { popUpIsOpen } from "../reduxStore/popUp";
import { onValue, ref, } from "firebase/database";
import { setCurrentUserUserName, SetCurrentUserWatchLater } from "../reduxStore/currentUser";

export default function LogInPopUp() {
  const isOpen = useSelector(state => state.popUp.value) === 2 ? true : false
  const as = useSelector(s => s.popUp.value)
  function closePopUp() {
    dispatch(popUpIsOpen(0))
  }
  function openCreateAccForm() {
    dispatch(popUpIsOpen(1))
  }
  const dispatch = useDispatch()
  const [createAccData, setCreateAccData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const auth = getAuth(app);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCreateAccData({
      ...createAccData,
      [e.target.name]: value
    });
  }
  const x = useSelector(s => s.currentUser)
  async function handleSubmit(e) {
    e.preventDefault()
    await setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, createAccData.email, createAccData.password);
      }).then(() => dispatch(popUpIsOpen(0))).catch(error => console.log(error))
    onValue(ref(db, `users/${auth.currentUser.uid}`), snapShot => {
      const data = snapShot.val()
      dispatch(setCurrentUserUserName(data.userInfo.userName))
      // dispatch(SetCurrentUserWatchLater(data.userInfo.watchLater))
    })
    setCreateAccData(({
      email: "",
      password: "",
    }
    ))

  }

  return (
    <div className="pop-up-wrapper" style={isOpen ? { display: "block" } : { display: "none" }} onClick={(e) => closePopUp()}>
      <div className="login-box" style={error ? { ['--color' as any]: "rgb(164, 0, 0)" } : { ['--color' as any]: "#fff" }} onClick={(e) => e.stopPropagation()}>
        <p>Login</p>
        {error ? <h2 className="error-message">{error}</h2> : null}
        <form autoComplete="false" autoSave="false" >
          <div className="user-box">
            <input required type="email" name="email" value={createAccData.email} onChange={(e) => handleChange(e)} />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input required type="password" value={createAccData.password} name="password" onChange={(e) => handleChange(e)} />
            <label>Password</label>
          </div>
          <a onClick={(e) => handleSubmit(e)}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
        </form>
        <p>Don't have an account? <span onClick={openCreateAccForm} className="a2">Create an Account</span></p>
      </div>
    </div>)

}