import React, { useCallback, useContext, useEffect, useState } from 'react'
import { userInfo } from './Home'
import IsUserLoggedIn from './IsUserLoggedIn'
import AddBox from './AddBox'

export default function UpdateBox() {


    const context = useContext(userInfo)


    const [boxes,setBoxes] = useState([])
    const [currentBox,setCurrentBox] = useState({})
    const [component,setComponent] = useState(null)

    const [isClicked,setIsClicked] = useState(false)

    const changeBoxes = useCallback( (value)=>{ setBoxes(value)},[setBoxes])
    const changeCurrentBox = useCallback( (value)=>{ setCurrentBox(value)},[setCurrentBox])

    async function getBoxes(email)
    {
        const response = await fetch('/getBoxes',{
            method  : 'POST',
            headers: {'Content-Type': 'application/json'} ,
            body : JSON.stringify({
                email : email,
                isBasedOnEmail : true
            }),
        })

        if(response.status === 308)
            {
                const data = await response.json()
                console.log((data.data))
                changeBoxes(data.data)
                changeCurrentBox(data.data[0])
            }
        else if(response.status === 208)
            {

            }
    }

    useEffect(()=>{
        IsUserLoggedIn().then((data)=>{
            if(!data.isLoggedIn)
            { 
                // navigate('/SignUp',{replace : true})
            }else{
                getBoxes(data.userData.email).then(()=>{
                    // changeCurrentBox(boxes[0])
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
        //   console.log(context.userData.email)
        //   getBoxes()
    },[])

    return (
    <div>
        <div className="container" style={{ width: '100%', padding: '5%' }}>
            <div className='list-group'>
                {boxes.map((item,index)=>{
                    return(
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a style={{cursor : 'pointer'}} class="list-group-item list-group-item-action"
                            onClick={()=>{
                                // console.log(currentBox)
                                changeCurrentBox(item)
                                setIsClicked(true)
                                // setComponent(<AddBox isUpdate={true} data={item}></AddBox>)
                            }}
                        >{item.boxName}</a>
                    )
                })}
            </div>
        </div>


        {/* current box */}
        <div >
            {/* {component} */}
            {isClicked?<AddBox isUpdate={true} data={currentBox}></AddBox> : null}
        </div>
    </div>
  )
}
