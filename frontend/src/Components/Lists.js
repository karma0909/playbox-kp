import React, {useRef } from 'react'
// import './../StyleSheets/lists.css'
import '../StyleSheets/List.css'

export default function Lists() {


    const cardRef = useRef()
    const lists = [{
        id:1,
        area: 'New Ranip',
        Price: 1200
    },
    {
        id:2,
        area: 'New Ranip',
        Price: 120
    },
    {
        id:3,
        area: 'New Ranip',
        Price: 120
    },
    {
        id:4,
        area: 'New Ranip',
        Price: 120
    },

    ];
        const list = lists.map((item,index) => {
        return (
            <div className="container">
                <div className="wrapper">
                    <div className="banner-image"> </div>
                    <h1> {item.title}</h1>
                    <p> {item.desc1}
                        <br />
                        {item.desc2}
                    </p>
                </div>
                <div className='rating'>
                    <Rating name="read-only" value={value} readOnly />
                </div>
                <div className="button-wrapper">
                    <button className="btn outline">DETAILS</button>
                    <button className="btn fill">BUY NOW</button>
                </div>
            </div>

        )
    })


    return (
        <div style={{ display: 'flex',marginRight : '2%',flexWrap :'wrap'}}>
            {list}
        </div>
    )
}
