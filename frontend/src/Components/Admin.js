import React, { useCallback, useEffect, useState } from 'react'
import './../StyleSheets/Admin.css'

export default function Admin() {


    const [allBoxes, setAllBoxes] = useState([])

    const chnageAllBoxes = useCallback((value) => { setAllBoxes(value) }, [setAllBoxes])


    async function updateBox(isApproved,index)
    {
        if(isApproved)
            allBoxes[index].status = 'APPROVED'
        else
            allBoxes[index].status = 'REJECTED'
        
        try{
            const response = await fetch('/addBox',{
                method : "POST",
                headers : {
                    "Content-Type": 'application/json'
                },
                body : JSON.stringify({...allBoxes[index],isUpdated: true,})
            })  
            
            if(response.status === 308)
                {
                    alert("Box Updated")
                    getAllBoxes()
                }
                else{

                }
        }
        catch(e)
        {
            console.log(e)
        }
    }

    async function getAllBoxes() {
        const response = await fetch('/getAllBoxes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.status === 308) {
            const data = await response.json()
            console.log(data.data)
            chnageAllBoxes(data.data)
        }
    }

    useEffect(() => {
        getAllBoxes()
    }, [])

    return (
        // <div style={{ backgroundColor: '', height: 'auto', marginTop: '3rem', justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
        <div className='adminMainContainer' style={{display : 'flex',flexWrap :'wrap',justifyContent : 'space-evenly'}}>

                {/* <div className="wrapper"> */}
                    {allBoxes.map((item, index) => {
                        return (
                            <div className="container" style={{ background: 'none', backdropFilter: 'none', border: 'none',display : 'flex',flexWrap : 'wrap' }}>
                            <div className='wrapper'>
                            <div className="card" style={{padding : '0.3rem', width: '26rem',borderRadius : '3%',height : 'auto' }}>

                                <div className="card-body">

                                    <h5 className="card-title" style={{ fontSize: '2rem', justifyContent: 'center', display: 'flex', color: '#8ac85e' }}>{item.boxName}</h5>

                                    <div id={`carouselExampleControls${index}`} className="carousel slide">
                                        <div className="carousel-inner">
                                            {item.urls.map((url, index) => {
                                                return(
                                                <div className={`image carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                                    <img className="d-block w-100" src={url} height={300} width={300} alt={`carousel-item-${index}`} />
                                                </div>) 
                                            })}

                                        </div>
                                        <a className="carousel-control-prev"  data-bs-target={`#carouselExampleControls${index}`} style={{cursor :'pointer'}} data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="false"></span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                        <a className="carousel-control-next"  data-bs-target={`#carouselExampleControls${index}`} style={{cursor : 'pointer'}}  data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Previous</span>
                                        </a>

                                    </div>

                                    <div style={{marginTop : '2rem',marginBottom :'2rem'}}>                                        
                                        <p className="card-text">Address : {item.boxAddress}</p>
                                        <button type="button" onClick={()=>{updateBox(true,index)}} className="approvedButton">Approved</button>
                                        <button type="button" onClick={()=>{updateBox(false,index)}} class="rejectButton">Danger</button>
                                    </div>        

                                </div>
                            </div>
                            </div>
                            </div>
                        )
                    })}
                {/* </div> */}
            {/* // </div> */}
        </div>
    )
}
