// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { auth } from '../firebase/firebase'
import { getRandomMoviesDataThunk } from '../reduxStore/apiData'
import { logOut } from '../reduxStore/currentUser'
import { popUpIsOpen } from '../reduxStore/popUp'
import "../styles/navbar.scss"

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const data = useSelector(state => state.apiData)
    const location = useLocation().pathname
    const openPopUp = () => {
        dispatch(popUpIsOpen(2))
    }
    const currentUserName = useSelector(state => state.currentUser.name)
 async function handleSignOut() {
     dispatch(logOut())
}
const userName = useSelector(s => s.currentUser.name)

function watchLaterClick() {
if(auth.currentUser && userName !== ""){
    navigate("/watch-later")
}else{
   alert("Log In first")
}
}
console.log(data)
    return (
        <nav className='nav-bar-container'>
            <div className="hamburger-menu">
                <input id="menu__toggle" type="checkbox" />
                <label className="menu__btn" htmlFor="menu__toggle">
                    <span></span>
                </label>

                <ul className="menu__box">
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}><li className="menu__item">Home</li></Link>
                    <Link to="/movies" style={{ color: 'inherit', textDecoration: 'inherit' }}><li className="menu__item">Movies</li></Link>
                    <Link to="/series" style={{ color: 'inherit', textDecoration: 'inherit' }}><li className="menu__item">Series</li></Link>
                   <li className="menu__item" onClick={() => watchLaterClick()}>Watch later</li>
                </ul>
            </div>
            <div className='left-navbar-section'>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <div className="logo-container">
                        Ammar's Cinema
                    </div>
                </Link>
                <ul className='nav-links'>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}><li>Home</li></Link>
                    <Link to="/movies" style={{ color: 'inherit', textDecoration: 'inherit' }}><li>Movies</li></Link>
                    <Link to="/series" style={{ color: 'inherit', textDecoration: 'inherit' }}><li>Series</li></Link>
                    <li onClick={()=> watchLaterClick()}>Watch later</li>

                </ul>
            </div>
            {currentUserName != "" ? <div className='user-name-container'><h3>{currentUserName} </h3> <AccountCircleOutlinedIcon /><div className='sign-out-button'>
               <button onClick={() => handleSignOut()}>Sign out <LogoutOutlinedIcon style={{width:"20%",height:"100%"}} id="log-out-icon"/></button> 

            </div></div>: <button className='costum-button' onClick={() => openPopUp()}>Log in</button>}
            
        </nav>

    )
}

export default Navbar