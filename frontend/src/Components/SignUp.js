import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import '../StyleSheets/SignUp.css'
import lottie from 'lottie-web'
import {useNavigate} from 'react-router-dom'
import {FormControl,MenuItem,Select,InputLabel} from '@mui/material'
import  { LottieAnimation } from './LottieAnimationLoader'
import { userInfo } from './Home'

export default function SignUp() {
    const context = useContext(userInfo)

    const navigate = useNavigate()
    const cardRef = useRef(null)
    const frontRef = useRef(null)
    const backRef = useRef(null)

    // const [userType,setUserType] = useState('User')
    const [user,setUser] = useState({
        fname : '',lname : '',email : '',password : '',userType : 'User'
    })

    // const chnageUserType  = useCallback((value)=>{setUserType(value)})
    let name,value;

    useEffect(()=>{
        console.log("re rendering");
    })

    async function loginUser(e)
    {
        e.preventDefault()
        const {email,password,userType} = user

        if(email === "" || password === "")
        {
            alert('Please Fill the data')
        }
        else{
            const response = await fetch('/signin',{
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({email,password,userType})            
            })
            const data =  response
            if(data.status === 308)
            {
                const userData = await data.json()
                console.log(userData.userData)
                context.setUserData(userData.userData)
                context.chnageUserState(true)
                navigate('/',{replace : true})   
            }
        }
    }

    async function createUser(e)
    {
        e.preventDefault()
        const {fname,lname,email,password,userType} = user

        if(fname==="" || lname === "" || email === "" || password === "")
        {   
            alert('Please Fill the data')
        }else{
            const response = await fetch('/register',{
                method : 'POST',
                headers : {
                    "Content-Type" : 'application/json'
                },
                body : JSON.stringify(user) ,
            })
            if(response.status === 308)
                {
                    const userData = await response.json()
                    console.log(userData.userData)
                    context.setUserData(userData.userData)
                    context.chnageUserState(true)
                    navigate('/',{replace : true})   
                }
                
        }
    }

    function handleInput(e)
    {
        // e.preventDefault()
        name = e.target.name
        value = e.target.value
        setUser({...user,[name]:value})
    }

    function cardFlip(viewRef, unViewRef) {
        if (viewRef.current === frontRef.current) {
            cardRef.current.style.transform = 'rotate3d(0, 1, 0, 0deg)'
        }
        else {
            cardRef.current.style.transform = 'rotate3d(0, 1, 0, 180deg)'
        }
        cardRef.current.style.transition = '1.5s'

        setTimeout(() => {
            viewRef.current.style.visibility = 'visible'
            unViewRef.current.style.visibility = 'hidden'
        });
    }

    const lottieContainerRef = useRef(null)
   
    useEffect(() => {
        const lottieAnimation = lottie.loadAnimation(LottieAnimation(lottieContainerRef.current, 'login'))
        console.log('Animation called')

        return () => {
            lottieAnimation.destroy() // Clean up the animation on unmount
        }

    },[])

    return (
        <>
            <link
                href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                rel="stylesheet"
            />
            <div style={{ width: '100%', backgroundColor: '#ebe6e6', display: 'flex', margin: '0px', overflow: 'hidden' }}>
                <div ref={lottieContainerRef} style={{ display: 'flex', width: '50%', height: '30rem' }}>

                </div>
                <div className="main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', overscrollBehavior: 'none' }}>

                    <div className="container body b-container" ref={cardRef} id="b-container">
                        <div className='front container' ref={frontRef}>
                            <form method='POST'>
                                <div class="row">
                                    <div class="col">
                                        <input type="text" name='fname' value={user.fname} 
                                        onChange={(e)=>{handleInput(e)}}
                                        class="form-control" placeholder="First name" />
                                    </div>
                                    <div class="col">
                                        <input type="text" name='lname' value={user.lname} 
                                        onChange={(e)=>{handleInput(e)}}
                                        class="form-control" placeholder="Last name" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1" className="label">Email address</label>
                                    <input type="email" name='email' value={user.email} 
                                    onChange={(e)=>{handleInput(e)}}
                                    class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1" className="label">Password</label>
                                    <input type="password" name='password' value={user.password} class="form-control" 
                                    onChange={(e)=>{handleInput(e)}}
                                    id="exampleInputPassword1" placeholder="Password" />
                                </div>
                            </form>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">User</InputLabel>
                                <Select
                                    name='userType'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    style={{height :'2.3rem',marginBottom :'1rem'}}
                                    label="User"
                                    value={user.userType}
                                    onChange={(value)=>{
                                        handleInput(value)
                                        console.log(value.target.value)
                                        // chnageUserType(value.target.value)
                                    }}
                                >
                                    <MenuItem value={'User'}>User</MenuItem>
                                    <MenuItem value={'Owner'}>Owner</MenuItem>
                                </Select>
                            </FormControl>
                            <label for="gotoSignIn" 
                                onClick={() => { cardFlip(backRef, frontRef) }}
                            className="label">SignIN</label>
                            <button className="fill btn" 
                            // onClick={() => { cardFlip(backRef, frontRef) }}
                            onClick={(e)=>{createUser(e)}}
                            >SIGN UP</button>
                        </div>
                        <div className='back container' ref={backRef}>
                            <form method='post' style={{ transform: 'rotateY(180deg)' }}>
                                <div class="form-group">
                                    <label for="exampleInputEmail1" className="label">Email address</label>
                                    <input type="email" name='email'value={user.email} 
                                        onChange={(e)=>{handleInput(e)}}
                                    class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1" className="label">Password</label>
                                    <input type="password" name='password' 
                                    value={user.password} 
                                        onChange={(e)=>{handleInput(e)}}
                                    class="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </div>
                            </form>
                            <FormControl fullWidth style={{ transform: 'rotateY(180deg)' }}>
                                <InputLabel id="demo-simple-select-label">User</InputLabel>
                                <Select
                                    name='userType'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    style={{height :'2.3rem',marginBottom :'1rem'}}
                                    label="User"
                                    value={user.userType}
                                    onChange={(value)=>{
                                        handleInput(value)
                                        console.log(value.target.value)
                                        // chnageUserType(value.target.value)
                                    }}
                                >
                                    <MenuItem value={'User'}>User</MenuItem>
                                    <MenuItem value={'Owner'}>Owner</MenuItem>
                                </Select>
                            </FormControl>
                            <label for="gotoSignUp" style={{ transform: 'rotateY(180deg)' }}
                                onClick={()=>{cardFlip(frontRef, backRef)}}
                            className="label">Register as New User</label>
                            <button className="fill btn" style={{ transform: 'rotateY(180deg)' }} onClick={(e) => { 
                                loginUser(e)
                                // cardFlip(frontRef, backRef) 
                                }}>SIGN In</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
