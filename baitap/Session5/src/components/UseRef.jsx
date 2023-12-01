import React, { useRef, useState } from 'react'

export default function UseRef() {
    // const[number,setNumber]=useState(1);
    // const obj={
    //     count:0,
    // }

    // const myRef=useRef(0);
    const gicungduoc=useRef();


    // const changeCount=()=>{
    //     obj.count=obj.count+1
    //     setNumber(number+1);
    //     myRef.current=myRef.current+1;
    // }
    // console.log("111111",obj.count);
    // console.log("22222222",myRef.current);

    const addRi=()=>{
        gicungduoc.current.focus();
    }
  return (
    <>
            {/* <button onClick={changeCount}>useRef</button><br /> */}
            <input type="text" ref={gicungduoc} />
            <button onClick={addRi} >Addddddd</button>
    </>
  )
}
