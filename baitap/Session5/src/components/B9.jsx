import React, { useRef, useState } from 'react'

export default function B9() {
    const [count,setCount] =useState(0);
    
    const changeCount=()=>{
        setCount(count+1);
    }
   
  return (
    <>  
        <p>count:{count}</p>
        <button onClick={changeCount}>Click</button>
    
    </>
  )
}
