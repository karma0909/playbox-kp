import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './../StyleSheets/DetailedBox.css'
// import DatePicker from "react-datepicker";

export default function DetailedBox(props) {

  const location = useLocation()
  const box = location.state
  const dateObj = new Date()


  // states
  const [bookedSlot,setBookedSlot] = useState([])
  const [bookingInfo, setBookingInfo] = useState({ dayName: '', sport: 0, time: 0 })
  const [dayId, setDayId] = useState(0)
  const [selectedDayTime, setSelectedDayTime] = useState()
  const [d,setDate] = useState(dateObj.toISOString().split('T')[0])

  //callbacks
  // const chnageBooking = useCallback((v)=>{},[setBookingInfo])
  const chnageDayId = useCallback((value) => { setDayId(value) }, [setDayId])
  const changeSelectedDayTime = useCallback((value) => { setSelectedDayTime(value) }, [setSelectedDayTime])


  const fetchData = async (dateString) => {
    const response = await fetch('/updateTime',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({boxId : box._id, date : dateString})
    })
    if(response.status === 308 || response.status === 208)
    {
        const data = await response.json()
        setBookedSlot(data.data)
        console.log(bookedSlot)
    }
}
  useEffect(() => {


    
    console.log(box)
    const dateObj = new Date()
    
    console.log(dateObj.toISOString().split('T')[0])
    
    fetchData(dateObj.toISOString().split('T')[0])
    
    setDate(dateObj.toISOString().split('T')[0])
    
    handleBooking('date', d, 'date', false)
    
    handleBooking('time',0, 'time', false)
    
    chnageDayId(dateObj.getDay())
    
    handleBooking('dayId',dateObj.getDay(),'dayId',false)
    
    handleBooking('dayName',box.box[dateObj.getDay()].dayName,'dayName',false)
    
    handleBooking('boxId', box._id, 'boxId', false)
    
    
  }, [])



  

  async function handleClick() {

    if (bookingInfo.sport && bookingInfo.time) {
      // handleBooking('timeId',bookingInfo.date + '_' + bookingInfo.time,'timeId',false)
      const response = await fetch('/bookASlot', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(bookingInfo)
      })
      if (response.status === 308) {
        const data = await response.json()
        console.log('Data : ' + data.data)
      }
      console.log(bookingInfo)
    }
    else {
      alert('Please select a sport and time')
    }
  }


  function handleBooking(item, value, id, boll) {
    if (!boll) {
      setBookingInfo((previousState) => ({ ...previousState, [item]: value }))
    }
    else if (boll && document.getElementById(id).classList.contains('detail_sports_select')) {
      document.getElementById(id).classList.remove('detail_sports_select')
      setBookingInfo((previousState) => ({ ...previousState, [item]: "" }))
    } else {
      document.querySelectorAll('.detail_sports_select').forEach((img) => {
        img.classList.remove('detail_sports_select')
      })
      document.getElementById(id).classList.add('detail_sports_select')
      setBookingInfo((previousState) => ({ ...previousState, [item]: value }))
    }
  }




  return (
    <div className='detail_main'>
      <div className='detail_main_60'>

        <div id={`carouselExampleControls`} className="carousel slide">
          <div className="carousel-inner" style={{ overflow: 'hidden' }}>
            {box.urls.map((url, index) => {
              return (
                <div className={`image carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                  <img className="d-block detail_images" src={url}
                    // height={300} width={300} 
                    alt={`carousel-item-${index}`} />
                </div>)
            })}

          </div>
          <a className="carousel-control-prev" data-bs-target={'#carouselExampleControls'} style={{ cursor: 'pointer' }} data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="false"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" data-bs-target={'#carouselExampleControls'} style={{ cursor: 'pointer' }} data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
        </div>

        {/* sports */}

        <div className='detail_sports'>
          {box.sports.map((item, index) => {
            return (
              <div className={'detail_sports_img'} key={box.sports.id}>
                <img src={require(`../Images/icons8-${item}-48.png`)}
                  id={item}
                  onClick={(e) => {
                    handleBooking('sport', item, e.target.id, true)
                    console.log(bookingInfo)
                  }}
                ></img>
              </div>
            )
          })}
        </div>


      </div>

      {/* 40% ratio */}
      <div className='detail_main_40'>

        {/* Box Name */}
        <div className='border detail_fullwidth detail_border border_radius'>
          <div><p className='detail_boxName'>{box.boxName}</p></div>
          <div><p>{box.city}</p></div>
        </div>

        {/* location */}
        {/* <div className='detail_fullwidth'> */}
        <div className='border  detail_fullwidth detail_border border_radius grid'>
          <div style={{ fontWeight: 'bold' }}>Location</div>
          <h2 className='detail_location'>{box.boxAddress}</h2>
        </div>
        {/* </div> */}

        {/* day data */}
        <div className='flex space-between' style={{ cursor: 'pointer' }}>

          <input type='date'
            value={d} 
           min={dateObj.toISOString().split('T')[0]}
           max={new Date(dateObj.setDate(dateObj.getDate() + 7)).toISOString().split('T')[0]}
           onChange={async(e)=>{
             const date = new Date(e.target.value) 
             chnageDayId(date.getDay())
             handleBooking('dayId',date.getDay(),'dayId',false)
             handleBooking('dayName', box.box[date.getDay()].dayName, 'dayName', false)
             handleBooking('date',date.toISOString().split('T')[0],'date',false);

             setDate(date.toISOString().split('T')[0])

             await fetchData(date.toISOString().split('T')[0])

            console.log(date.toISOString().split('T')[0])
            
          }}></input>

          {/* {box.box.map((item,index) => {
            return (
              <h5 onClick={() => {
                handleBooking('dayName', item.dayName, 'dayName', false)
                chnageDayId(index)
              }}>{item.day}</h5>
            )
          })} */}
        </div>


        {/* selected dayName */}
        <div className='detail_center'>{bookingInfo.dayName}</div>


        {/* selected day time*/}
        <div style={{ color: 'red' }} className='detail_center'>Consider All Time in 24 hours format</div>
        <div>
          <select className="form-select detail_fullwidth detail_center" aria-label="Default select example"
            onClick={(e) => {
              handleBooking('time', e.target.value, 'time', false)
            }}
          >

            {box.box[dayId].time.map((time) => {
              // const isBooked = bookedSlot.some(slot => slot.time === time.from + '-' + time.to)

              return (
                <option disabled={bookedSlot.includes(time.from + '-' + time.to)}
                  value={time.from + '-' + time.to} >{time.from + '-' + time.to}</option>
              )
            })}

          </select>
        </div>

        {/* button */}

        <button onClick={() => { handleClick() }}>Book</button>

      </div>
    </div>
  )
}
