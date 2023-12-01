import React, { useReducer } from 'react'

export default function UseReduce() {
    const reducer=(state,action)=>{
        // if(action =="ABC"){
        //     return state +1;
        // }else if(action.action){
        //     return state -1;
        // }
        switch (action) {
            case "ABC":
                    return state +1;
             
            case "ABCC":
                    return state -1;
            default:
               return state;
        }
    } 
    const [abc,ditpach]= useReducer(reducer,0)

    const handleCount=()=>{
        ditpach("ABC");
    }
  return (
   <>   
        <p>count:{abc}</p>
        <button onClick={handleCount}>tăng count</button> 
        <button onClick={()=>ditpach("ABCC")}>giảm count</button>
   </>
  )
}
