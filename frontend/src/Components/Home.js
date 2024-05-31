import React, { useState, createContext, useEffect, useCallback } from 'react'
// import SearchBar from './SearchBar'
import Navbar from './Navbar'
import './../StyleSheets/home.css'
// import Lists from './Lists'
import List from './List'
import { Routes, Route, useNavigate } from 'react-router-dom'
// import Footer from './Footer'
import About from './About'
import Login from './Login'
import SignUp from './SignUp'
import AddBox from './AddBox'
import UpdateBox from './UpdateBox'
import IsUserLoggedIn from './IsUserLoggedIn'
import Admin from './Admin'
import DetailedBox from './DetailedBox'
import BookingInfo from './BookingInfo'
import SuccessfullPayment from './SuccessfullPayment'

const userInfo = createContext(null)


export default function Home() {

  const initialState = { fname: 'FirstName', lname: 'LastName', email: 'Email',userType:'userType' }
  const [userData, setUserData] = useState(initialState)
  const [isUserLoggIn,setIsUserLoggIn] = useState()

  const chnageUserState = useCallback((value)=>{setIsUserLoggIn(value)}) 

  const obj = {
    userData,
    setUserData,
    initialState,
    isUserLoggIn,
    chnageUserState
  }
  // const [currentComponent, setCurrentComponent] = useState(<Lists></Lists>)

    const navigate = useNavigate()
    // async function isUserLoggedIn()
    // { 
    //       const responseIsLoggedIn = await fetch('/isLoggedIn', {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": 'application/json'
    //         },
    //       })
    //       const isLoggedIn = await responseIsLoggedIn
    //       const data = await isLoggedIn.json();
    //       return data
    // }

useEffect(() => {
    IsUserLoggedIn().then((data)=>{
      if(!data.isLoggedIn)
      { 
          navigate('/SignUp',{replace : true})
          chnageUserState(false)
      }else{
          // setUserData(...userData,data);
          setUserData(data.userData)
          chnageUserState(true)
      }
    }).catch((error)=>{
      console.log(error)
    })
},[])

return (
  <>
    {/* <div>
        <Routes>
          <Route path='/Login' element={<Login></Login>}></Route>
        </Routes>
      </div> */}
    <userInfo.Provider value={obj}>

      <div className='listContainer'>
        <div>
          <Navbar ></Navbar>
        </div>
        <div style={{ paddingTop: '3rem', justifyContent: 'space-evenly', paddingBottom: '0px', marginBottom: '0px' }}>
          <Routes>
            <Route path='/' element={<List></List>}></Route>
            <Route path='/About' element={<About></About>}></Route>
            <Route path='/Login' element={<Login></Login>}></Route>
            <Route path='/SignUp' element={<SignUp></SignUp>}></Route>
            <Route path='/AddBox' element={<AddBox></AddBox>}></Route>
            <Route path='/UpdateBox' element={<UpdateBox isUpdate={false}></UpdateBox>}></Route>
            <Route path='/Admin' element={<Admin></Admin>}></Route>
            <Route path='/Details' element={<DetailedBox></DetailedBox>}></Route>

            <Route path='/BookingInfo' element={<BookingInfo></BookingInfo>}></Route>

            <Route path='/paymentsuccess' element={<SuccessfullPayment></SuccessfullPayment>}></Route>
          </Routes>
        </div>
      </div>
    </userInfo.Provider>
  </>
)
}
export { userInfo }