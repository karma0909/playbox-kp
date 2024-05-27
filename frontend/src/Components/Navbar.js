import React, { useCallback, useContext, useEffect, useState } from 'react'
import '../StyleSheets/Navbar.css'
import { Link } from 'react-router-dom'
import { userInfo } from './Home'
import {useNavigate} from 'react-router-dom'
// import SearchBar from './SearchBar'

export default function Navbar() {
    const context = useContext(userInfo)
    const navigate = useNavigate()

    // const [isUserLoggedIn,setIsUserLoggedIn] = useState()

    // const chnageUserState = useCallback((value)=>{setIsUserLoggedIn(value)})
    async function logout()
    {
        const response = await fetch('/logout',{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const data = await response
        if(data.status === 308)
        {
            context.setUserData(context.initialState)
            context.chnageUserState(false)
            navigate('/SignUp',{replace : true})
        }
    }

    useEffect(()=>{
        isLoggedIn().then((value)=>{
            context.chnageUserState(value)
        })
    },[])


    async function isLoggedIn()
    {
        try{
            const response = await fetch('/isLoggedIn',{
                method: "POST",
                headers:{
                    'Content-Type' : 'application/json'
                },
            })
            const data = await response
            const userData = await data.json()
            
            if(userData.isLoggedIn)
            {
                // chnageUserState(true)
                return true
                // return
            }
            // chnageUserState(false)
            return false
        }catch(exception)
        {
            console.log(exception.toString())
        }
    }

    return (
        <>
            <nav>
                <input type="checkbox" id="check" />
                <label htmlFor="check" className="checkbtn">
                    <i className="fas fa-bars" />
                </label>
                <label className="logo">Box Cricket</label>
                <ul>
                    <li>
                        {/* <a className="active" href="/">
                            Home
                        </a> */}
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li>
                        <p>{context.userData.fname.toUpperCase() + " " + context.userData.lname.toUpperCase()}</p>
                    </li>
                    <li>
                        { context.isUserLoggIn && context.userData.userType==='Owner' ? <Link to={'/AddBox'} >Add Box</Link>
                                : null
                        }
                    </li>
                    <li>
                        {context.isUserLoggIn && context.userData.userType === 'Owner' ? <Link to={'/UpdateBox'}>Update Box</Link> : null}
                    </li>
                    {/* <li> */}
                        {/* <a href="#">About</a> */}
                        {/* <Link to={'/About'}>About</Link> */}
                    {/* </li> */}
                    {/* <li> */}
                        {/* <a href="#">Contact</a> */}
                        {/* <Link to={'/Contact'}>Contact Us</Link> */}
                    {/* </li> */}
                    <li>
                        {context.isUserLoggIn?<Link to={'/SignUp'} onClick={()=>{logout()}}>Logout</Link>:<Link to={'/SignUp'}>SignUp/Login</Link>}
                        {/* <Link to={'/SignUp'}>SignUp/Login</Link> */}
                        {/* <a href="#">SignUp/Login</a> */}
                    </li>
                    <li>
                        <form class="form-inline my-2 my-lg-0">
                            <input class="search" type="search" placeholder="Location" aria-label="Search" />
                            <input type="button" class="btn my-2 my-sm-0" style={{backgroundColor:'#8ac85e', color:'white'}} value={'Search'}></input>
                            {/* <SearchBar></SearchBar> */}
                        </form>
                    </li>
                </ul>

            </nav>

        </>
    )
}
