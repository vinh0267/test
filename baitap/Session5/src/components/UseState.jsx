import React, { useState } from 'react'

 function UseState() {
    const [count,setA]=useState(0);
    const [product,setProduct] = useState("");
    const [text,setText]=useState("");
        
    const [jobs,setJobs]=useState([]);
    const [job,setJob]=useState("");

    const increCount=()=>{
        setA(count+1);

    }

// functin thêm job
const changeValue=(e)=>{
    let newJob = e.target.value;
    setJob(newJob)
}
const addTodo=()=>{
    setJobs([...jobs,job])
    setJob("")
}

  return (
    <>
        <p>count:{count}</p>
        <button onClick={increCount}>click</button>
        
        <p>Muốn mua gì? {product} </p>
        <button onClick={()=>setProduct("quần")}>quần</button>
        <button onClick={()=>setProduct("áo")}>áo</button>
        <button onClick={()=>setProduct("dsp")}>dép</button><br />

        <input type="text"onChange={(e)=>{setText(e.target.value)}}/><br />
        <p>show:{text}</p>

        <input type="text" onChange={changeValue} value={job} />
        <button onClick={addTodo}>thêm</button>
        <ul>
            {jobs.map((item,index)=>{
                return <li key={index}>{item}</li>
            })}
        </ul>
    </>
  )
}
export default UseState;
