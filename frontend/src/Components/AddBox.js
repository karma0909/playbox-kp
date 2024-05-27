import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import './../StyleSheets/AddBox.css'
import '../StyleSheets/List.css'
import { userInfo } from './Home'
import firebase from 'firebase/compat/app'
import {getDownloadURL, getStorage,ref,uploadBytes} from 'firebase/storage';

// import {useGeolocated } from 'react-geolocated'
// import { TimePicker } from 'react-ios-time-picker'

// const GetLocation = () => {
//   const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
//     positionOptions: {
//       enableHighAccuracy: false,
//     },
//     userDecisionTimeout: 5000,
//   });
//   return({coords, isGeolocationAvailable, isGeolocationEnabled})
// }

export default function AddBox(props) {

  const context = useContext(userInfo)

  const date = new Date()

  // const initialBoxData = {
  //     boxName : '',
  //     address : '',
  //     latitude  : '',
  //     longitude : ''
  // }

  const initialTime = {
    from: date.getHours() + ":" + date.getMinutes(),
    to: date.getHours() + 1 + ":" + date.getMinutes()
  }

  const days = [
    {
      id: 0,
      day: 'S',
      dayName: 'SUNDAY',
      time: [{
        from: date.getHours() + ":" + date.getMinutes(),
        to: date.getHours() + 1 + ":" + date.getMinutes()
      },
      ]
    },
    {
      id: 1,
      day: 'M',
      dayName: 'MONDAY',
      time: [{
        from: date.getHours() + ":" + date.getMinutes(),
        to: date.getHours() + 1 + ":" + date.getMinutes()
      },]
    },
    {
      id: 2,
      day: 'T',
      dayName: 'TUESDAY',
      time: [{
        from: date.getHours() + ":" + date.getMinutes(),
        to: date.getHours() + 1 + ":" + date.getMinutes()
      },]
    },
    {
      id: 3,
      day: 'W',
      dayName: 'WEDNESDAY',
      time: [{
        from: date.getHours() + ":" + date.getMinutes(),
        to: date.getHours() + 1 + ":" + date.getMinutes()
      },]
    },
    {
      id: 4,
      day: 'TH',
      dayName: 'THURSDAY',
      time: [{
        from: date.getHours() + ":" + date.getMinutes(),
        to: date.getHours() + 1 + ":" + date.getMinutes()
      },]
    },
    {
      id: 5,
      day: 'F',
      dayName: 'FRIDAY',
      time: [{
        from: date.getHours() + ":" + date.getMinutes(),
        to: date.getHours() + 1 + ":" + date.getMinutes()
      },]
    },
    {
      id: 6,
      day: 'S',
      dayName: 'SATURDAY',
      time: [{
        from: date.getHours() + ":" + date.getMinutes(),
        to: date.getHours() + 1 + ":" + date.getMinutes()
      },]
    },
  ]

  const [sports, setSports] = useState([])
  const [location, setLocation] = useState(null)
  const [box, setBox] = useState(days)
  const [currentDay, setCurrentDay] = useState(days[0])
  const [boxName, setBoxName] = useState(null)
  const [boxAddress, setBoxAddress] = useState(null)
  const [pincode, setPincode] = useState(undefined)
  const [images, setImages] = useState([])
  const [imagesURL,setImagesURL] = useState([])
  const [city,setCity] = useState('Unknown')
  // const currentImage = useRef(0)

  // const changeTime = useCallback((value) => { setTime(value) }, [time])
  // const changeData = useCallback((value)=>{setData(value)},[data])
  const chnageCity = useCallback((value)=>{setCity(value)},[setCity])
  const changeImages = useCallback((value) => { setImages(value) }, [setImages])
  const chnagePincode = useCallback((value, id) => {
    setPincode(value)
    if (value.length <= 6) {
      document.getElementById(id).classList.remove('errorData')
    } else {
      // setPincode(value)
      document.getElementById(id).classList.add('errorData')
    }
  }, [setPincode])
  const chnageCurrentDay = useCallback((value) => { setCurrentDay(value) }, [setCurrentDay])
  const changeLocation = useCallback((value) => { setLocation(value) }, [setLocation])
  const changeSports = useCallback((value) => { setSports(value) }, [setSports])
  const chageBoxName = useCallback((value) => { setBoxName(value) }, [setBoxName])
  const changeBoxAddress = useCallback((value) => { setBoxAddress(value) }, [setBoxAddress])
  const chnageBox = useCallback((value) => { setBox(value) }, [setBox])

  function checkLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (success) => {
          changeLocation(success.coords)
          console.log(success.coords)

          const response = fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${success.coords.latitude}&lon=${success.coords.longitude}&apiKey=3250828e9eca4d89890c318e4cd32fb9`,{method : "GET"})
          // const response = fetch(`https://us1.locationiq.com/v1/reverse?key=pk.9add6e3e18b76f67290f51c00b181f37&lat=${success.coords.latitude}&lon=${success.coords.longitude}&format=json&`)
          .then((response)=>{
              response.json().then((data)=>{
                console.log(data)
                
                console.log(data.features[0].properties.state_district.split(" ")[0].toUpperCase())
                chnageCity(data.features[0].properties.state_district.split(" ")[0].toUpperCase())

                // console.log(data.address.state_district.split(" ")[0].toUpperCase())
                // chnageCity(data.address.state_district.split(" ")[0].toUpperCase())
              })
          })

        },
        (error) => {
          if (error.PERMISSION_DENIED) {
            console.log('Turn On Location')
            // checkLocation()
          }
          console.log(error.PERMISSION_DENIED)
        })

    } else {
      console.error("Geolocation is not supported.");
    }

  }


  function handleImages(e) {
    const updatedImages = []
    // setImages([])
    setImagesURL([])
    const imageArray = Array.from(e.target.files)
    console.log(imageArray.length)
    imageArray.forEach((file) => {

      if (file && validateImageFile(file)) {
        updatedImages.push(file)
        changeImages(updatedImages)
        // console.log(updatedImages)
        // currentImage.current = currentImage.current + 1
        // console.log(currentImage.current)
      }
      else {
        Array.from(e.target.files).pop()
        // console.log(Array.from(e.target.files))
        alert('Enter image only')
      }
    })

  }

  function validateImageFile(file) {
    // List of allowed image file types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];

    // Check if the file type is in the allowed types list
    if (allowedTypes.includes(file.type)) {
      return true; // File is an image

    } else {
      return false; // File is not an image
    }
  }

  async function saveBox() {
    const { latitude, longitude } = location
    console.log(pincode.length)
    // console.log(props.data._id)
    if (boxName != null && boxAddress != null && sports.length !== 0 && pincode.length === 6) {

      //geturls
      const getUrls = new Promise((resolve,reject)=>{
        console.log("Image [] size : " + images.length)
          images.forEach((item,index)=>{
          const storageRef = ref(getStorage(), `images/${item.name}`);
          uploadBytes(storageRef,item).then((snapshot) => 
          {
              getDownloadURL(storageRef).then(async(url)=>
              {
                imagesURL.push(url)
                console.log(imagesURL)
                console.log(imagesURL.length)
                // changeImages([])
                console.log(index)
                if(imagesURL.length === images.length)
                  {
                    resolve()
                  }
              }) 
          })
        })
      })


      getUrls.then(async()=>{
        const response = await fetch('/addBox', {
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            box, sports, longitude, latitude, boxName, pincode, boxAddress,
            status: 'PENDING',city : city,urls : imagesURL, email: context.userData.email, isUpdated: props.isUpdate,
            _id: props.isUpdate ? props.data._id : null
          }),
          method: 'POST'
        })
        if (response.status === 308)
          console.log(await response.json())
        else if (response.status === 208)
          console.log(await response.json())
        setImagesURL([])
        // const data = await response.json()
      })
    }
    else {
      console.error('Enter data')
    }
  }

  useEffect(() => {
    if (props.isUpdate) {
      console.log(props.data.sports)

      chnagePincode((props.data.pincode).toString(), 'pincode')
      changeBoxAddress(props.data.boxAddress)
      chageBoxName(props.data.boxName)

      // const d = []
      props.data.sports.forEach((item, index) => {
        const doc = document.getElementById(item)
        doc.classList.add('imgBorderAddBox')
        // updatedSports.push(item)


        // updateSport(item)
        // console.log(index)
      })

      changeSports(props.data.sports)
      chnageBox(props.data.box)
      chnageCity(props.data.city)
      // setBox(props.data.box)
      const latitude = props.data.latitude
      const longitude = props.data.longitude
      changeLocation({ longitude, latitude })
    }
    else {
      checkLocation()
    }
  }, [])

  function updateTime(e, id) {
    // id  = time id
    const name = e.target.name
    const value = e.target.value

    const updatedBox = [...box]

    // updatedBox[currentDay.id] = {
    //     ...updatedBox[currentDay.id],
    //     time : [...updatedBox[currentDay.id].time,{[updatedBox[currentDay.id].time[id].name]:value}]
    // }

    console.log(name)
    // {box[currentDay.id].time[id].name = value}

    updatedBox[currentDay.id].time[id] = { ...updatedBox[currentDay.id].time[id], [name]: value }

    console.log(updatedBox[currentDay.id].time)

    setBox(updatedBox)
    console.log(box)

    // setBox(updatedBox)
  }


  function updateSport(id) {

    const doc = document.getElementById(id)
    const updatedSports = sports
    if (doc.classList.contains('imgBorderAddBox')) {
      doc.classList.remove('imgBorderAddBox')
      updatedSports.splice(updatedSports.indexOf(id), 1)
    }
    else {
      doc.classList.add('imgBorderAddBox')
      updatedSports.push(id)
    }
    changeSports(updatedSports)

    console.log(updatedSports)
  }


  return (
    <div className='mainContainer'>
      {/* <h1>Hello</h1> */}
      {/* <TimePicker use12Hours={true} seperator={true} ></TimePicker> */}

      <div className="container" style={{ width: '100%', padding: '5%' }}>
        <div style={{ width: '45%', margin: '5%' }}>
          <div className="wrapper" style={{ margin: '2%' }} >

            <input class="form-control textAddBox" value={boxName} type="text" placeholder="Box Name"
              onChange={(e) => { chageBoxName(e.target.value) }}
            ></input>

            <textarea class="form-control textAddBox" value={boxAddress} placeholder='Address'
              onChange={(e) => { changeBoxAddress(e.target.value) }}
              id="exampleFormControlTextarea1" rows="3"></textarea>


            <input class="form-control textAddBox" id='pincode' value={pincode} type="number" placeholder="PinCode"
              onChange={(e) => { chnagePincode(e.target.value, e.target.id) }}
            ></input>

            {location == null ? <button className="btn fill" onClick={() => { checkLocation() }}>Add Location</button> :
              <div>
                <p>{location.longitude}</p>
                <p>{location.latitude}</p>
                <p>{city}</p>
              </div>
            }
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <img id='cricket' className='imgAddBox ' src={require('../Images/icons8-cricket-48.png')} alt="Cricket" onClick={(e) => { updateSport(e.target.id) }} />
              <img id='football' className='imgAddBox' src={require('../Images/icons8-football-48.png')} alt="Football" onClick={(e) => { updateSport(e.target.id) }} />
              <img id='badminton' className='imgAddBox' src={require('../Images/icons8-badminton-48.png')} alt="Badminton" onClick={(e) => { updateSport(e.target.id) }} />
              <img id='volleyball' className='imgAddBox' src={require('../Images/icons8-volleyball-48.png')} alt="Volleyball" onClick={(e) => { updateSport(e.target.id) }} />
            </div>

            <div class="mb-3">
              <label for="formFileMultiple" class="form-label">Multiple files input example</label>
              <input class="form-control" accept="image/*" onChange={(e) => { handleImages(e) }} type="file" id="formFileMultiple" multiple required />
            </div>
            <div>
              {images.map((item, index) => {
                return (
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <img src={item} height={100} width={100} key={index}></img>
                )
              })}
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button className="btn fill"
                onClick={() => {
                  saveBox()
                }}
              >Save Box</button>
            </div>
          </div>

        </div>
        <div style={{ justifyContent: 'center', alignContent: 'center', width: '40%' }}>
          <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-around' }}>
            {box.map((item) => {
              return (

                <div >
                  <h5 className='day'
                    onClick={() => {
                      // console.log(item);
                      chnageCurrentDay(item)
                    }}
                  >{item.day}</h5>
                  {
                    // item.time.map((item)=>{item.})
                  }
                </div>


              )
            })}
          </div>

          <table>
            <div>
              <tr>
                <td>
                  {box[currentDay.id].dayName}
                </td>
              </tr>
              {
                box[currentDay.id].time.map((item, index) => {
                  return (
                    <tr>
                      <td>
                        <div style={{ borderRadius: '0.4rem', marginTop: '0.5rem' }}>
                          FROM :
                          <input value={item.from} name='from' className='time' type='time' onChange={(e) => { updateTime(e, index) }}></input>
                          TO :
                          <input value={item.to} name='to' className='time' type='time' onChange={(e) => { updateTime(e, index) }}></input>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </div>
          </table>

          <div className="button-wrapper" >
            {/* <button className="btn outline">DETAILS</button> */}
            <button className="btn fill"
              onClick={() => {
                console.log(currentDay)

                const updatedBox = [...box]
                updatedBox[currentDay.id] = { ...updatedBox[currentDay.id], time: [...updatedBox[currentDay.id].time, initialTime] }

                setBox(updatedBox)
                // console.log(box);
              }}
            >Add</button>
            <button className="btn fill"
              onClick={() => {
                console.log(currentDay)

                const updatedBox = [...box]


                updatedBox[currentDay.id].time.pop()

                // updatedBox[currentDay.id] = {...updatedBox[currentDay.id],time : [...updatedBox[currentDay.id].time,initialTime]}

                setBox(updatedBox)
                // console.log(box);
              }}
            >Remove</button>

          </div>
        </div>
      </div>

    </div>
  )
}


// export {GetLocation}