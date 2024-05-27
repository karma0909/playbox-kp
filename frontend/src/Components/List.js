import React, { useCallback, useEffect, useState } from 'react';
import {Rating} from  '@mui/material';
// import '../Components/List.css';
import '../StyleSheets/List.css'
import {useNavigate} from 'react-router-dom'

export default function List() {
    const navigate = useNavigate()  

    let details = [
        {
            title: 'Eklavya Box Cricket',
            desc1: 'Tulip Bungalow Road, near Enigma Towers,',
            desc2: 'Thaltej, Ahmedabad, Gujarat 380054.',
            // urls : ['C:\Krish Programming\React Programming\boxcricket(kp)\frontend\src\Images\list_1.jpg']
        },
        {
            title: 'SwingZone Box Cricket',
            desc1: 'near Chacha Chaudhary Tea And Snacks Corner, opp. Godrej Garden City,',
            desc2: 'Gota-Jagatpur, Ahmedabad, Gujarat',
            // urls : ['C:\Krish Programming\React Programming\boxcricket(kp)\frontend\src\Images\list_1.jpg']

        },
        {
            title: 'SwingZone Box Cricket',
            desc1: 'near Chacha Chaudhary Tea And Snacks Corner, opp. Godrej Garden City,',
            desc2: 'Gota-Jagatpur, Ahmedabad, Gujarat',
            // urls : ['C:\Krish Programming\React Programming\boxcricket(kp)\frontend\src\Images\list_1.jpg']

        },
        {
            title: 'SwingZone Box Cricket',
            desc1: 'near Chacha Chaudhary Tea And Snacks Corner, opp. Godrej Garden City,',
            desc2: 'Gota-Jagatpur, Ahmedabad, Gujarat',
            // urls : ['C:\Krish Programming\React Programming\boxcricket(kp)\frontend\src\Images\list_1.jpg']

        },
        {
            title: 'Eklavya Box Cricket',
            desc1: 'Tulip Bungalow Road, near Enigma Towers,',
            desc2: 'Thaltej, Ahmedabad, Gujarat 380054.',
            // urls : ['C:\Krish Programming\React Programming\boxcricket(kp)\frontend\src\Images\list_1.jpg']

        },
        {
            title: 'Eklavya Box Cricket',
            desc1: 'Tulip Bungalow Road, near Enigma Towers,',
            desc2: 'Thaltej, Ahmedabad, Gujarat 380054.',
            // urls : ['C:\Krish Programming\React Programming\boxcricket(kp)\frontend\src\Images\list_1.jpg']

        },
        {
            title: 'Eklavya Box Cricket',
            desc1: 'Tulip Bungalow Road, near Enigma Towers,',
            desc2: 'Thaltej, Ahmedabad, Gujarat 380054.',
            // urls : ['C:\Krish Programming\React Programming\boxcricket(kp)\frontend\src\Images\list_1.jpg']

        },
    ];

    const [city,setCity] = useState('NoData')
    const [boxes,setBoxes] = useState(details)


    const chnageCity = useCallback((value)=>{setCity(value)},[setCity])
    const chnageBoxes = useCallback((value)=>{setBoxes(value)},[setBoxes])

    async function checkLocation() 
    {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (success) => {
            //   changeLocation(success.coords)
              console.log(success.coords)
              const response = fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${success.coords.latitude}&lon=${success.coords.longitude}&apiKey=3250828e9eca4d89890c318e4cd32fb9`,{method : "GET"}).then((response)=>{
                  response.json().then(async(data)=>{
                    console.log(data)
                    const c_name = data.features[0].properties.state_district.split(" ")[0].toUpperCase() 
                    console.log(data.features[0].properties.state_district.split(" ")[0].toUpperCase())
                    
                    // chnageCity(c_name)

                    //fetching data from db
                    getBoxes(c_name)
                    // const response = await fetch('/getBoxes',{
                    //     method : 'POST',
                    //     headers : {'Content-Type': 'application/json'},
                    //     body : JSON.stringify({
                    //         isBasedOnEmail : false,
                    //         city : c_name
                    //     })
                    // })
                    // if(response.status === 308)
                    // {
                    //     const data = await response.json()
                    //     chnageBoxes(data.data)
                    //     chnageCity(c_name)
                    //     console.log(data.data)
                    // }
                  })
              })
            },
            (error) => {
              if (error.PERMISSION_DENIED) {
                console.log('Turn On Location')
                // checkLocation()
                getBoxes(city)
              }
              console.log(error.PERMISSION_DENIED)
            })
    
        } else {
          console.error("Geolocation is not supported.");
        }
    
      }
    
      async function getBoxes(city)
      {
        const response = await fetch('/getBoxes',{
            method : 'POST',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify({
                isBasedOnEmail : false,
                city : city==='NoData'?'Unknown':city

            })
        })
        if(response.status === 308)
        {
            const data = await response.json()
            chnageBoxes(data.data)
            chnageCity(city)
            console.log("Data : " + data.data)
        }
      } 

      function goToDetailedBox(currentBox)
      {
            console.log(currentBox)
            navigate('/Details',{state : currentBox})
      }

    useEffect(()=>{
        checkLocation().then(()=>{
            // getBoxes()
        })
    },[])

    const [value,setvalue] = useState(4);

    const list = boxes.map((item) => {
        return (

            <div className="container">
                <div className="wrapper">
                    <div className="banner-image">
                        <img src={city!='NoData' ?item.urls[0]:null} className='banner-image'></img>     
                    </div>
                    <h1> {item.boxName}</h1>
                    <p> {item.boxAddress}
                        <br />
                        {item.city}
                    </p>
                </div>
                <div className='rating'>
                    <Rating name="read-only" value={value} readOnly />
                </div>
                <div className="button-wrapper">
                    <button className="btn outline" onClick={()=>{
                        console.log(item)
                        navigate('/Details',{state : {...item} })
                    }} >DETAILS</button>
                    <button className="btn fill">BUY NOW</button>
                </div>
            </div>

        )
    });


    return (
        <>
            <div style={{display : 'flex',flexWrap : 'wrap',marginLeft : '5%',justifyContent  : 'space-evenly',marginRight : '5%',marginTop : '3rem'}}>
                {list}
            </div>
        </>
    )
}
