import React, { useRef, useState } from 'react'
import './../StyleSheets/searchBar.css'
export default function SearchBar() {
    const [searchValue,setSearchValue] = useState('')
    const searchRef = useRef()
    const containerRef = useRef()
    // window.onscroll = ()=>{
    //     if(containerRef.current.getBoundingClientRect().top<=0)
    //     {
    //         containerRef.current.classList.add('sticky')
    //     }
    //     else{
    //         containerRef.current.classList.remove('sticky')
    //     }
    // }
  return (
    <div>
        <div className='mainContainer' ref={containerRef}>
            <input type='text' ref={searchRef} className='textBox' placeholder='Location'></input>
            <input type='button'  className='button'
                onClick={()=>{
                    setSearchValue(searchRef.current.value)
                }} value={'Search'}
            ></input>
        </div>
    </div>
  )
}

