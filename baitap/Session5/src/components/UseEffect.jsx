import React, { useEffect, useState } from 'react'

 function UseEffect() {
    const [count,setCount]= useState(0);
    const [title,setTitle]=useState("")

    // các cách dùng useEffect

    // useEffect(()=>{
    //     console.log("thuc hien something");
    // },[])


    useEffect(()=>{
        console.log("thuc hien something");
        // nơi để call APi lấy dữ liệu
    },[title])

  return (
    <>
        <p>count:{count}</p>
        <button onClick={()=>setCount(count+1)}>bam</button>
        <button onClick={()=>setTitle("xia xìa")}>click title</button>
    </>
  )
}
export default UseEffect;
