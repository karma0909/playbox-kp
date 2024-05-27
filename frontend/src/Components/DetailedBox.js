import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './../StyleSheets/DetailedBox.css'

export default function DetailedBox(props) {

  const location = useLocation()
  const box = location.state

  useEffect(() => {
    console.log(box)
  }, [])



  // states
  const [bookingInfo,setBookingInfo] = useState({})


  //callbacks
  // const chnageBooking = useCallback((v)=>{},[setBookingInfo])


  function handleBooking(item,value,id)
  {
    
    if(document.getElementById(id).classList.contains('detail_sports_select'))
      {
        document.getElementById(id).classList.remove('detail_sports_select')
      }else{
        document.querySelectorAll('.detail_sports_select').forEach((img)=>{
          img.classList.remove('detail_sports_select')
        })
        
          document.getElementById(id).classList.add('detail_sports_select')
          setBookingInfo((previousState)=>({...previousState,[item] : value}))
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
            {box.sports.map((item)=>{
              return(
                <div className='detail_sports_img' key={box.sports.id}>
                    <img src={require(`../Images/icons8-${item}-48.png`)}
                      id={item} 
                      onClick={(e)=>{
                          handleBooking('sport',item,e.target.id)
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
      </div>
    </div>
  )
}
