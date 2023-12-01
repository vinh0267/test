import React, { useState } from 'react'

export default function B10() {
  const [text,setText]= useState("");
  const numberText = text.split(" ").join("").length;

  const handleChangText=(e)=>{
  setText(e.target.value);
}
  return (
   <>
        <input type="text" onChange={handleChangText} /><br />
        <p>số ký tự:{numberText}</p>
   </>
  )
}
