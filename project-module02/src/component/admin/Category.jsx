import React, { useState } from 'react'
import axios from 'axios'
import { notification } from "antd"


export default function Category() {
    const [cate, setCate] = useState("")

    const handleInput = (event) => setCate(event.target.value)

    const handleAdd = () => {
        if (cate === "") {
            notification.success({ message: "không được để trống" })
        } else {
            axios.post("http://localhost:8200/category", { category: cate })
                .then((res) => {
                    notification.success({ message: "đã thêm category" })
                })
                .catch((err) => { console.log(err) })
        }
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <label htmlFor="" style={{fontSize:"22px"}}> Thêm loại sản phẩm</label>
                    <br />
                    <br />
                    <input type="text" onChange={handleInput} style={{height:"30px", width:"300px"}}/>
                    <br />
                    <br />
                    <button onClick={handleAdd} style={{width:"150px",height:"30px",backgroundColor:"green",color:"white",borderRadius:"5px",border:" none"}}>Add</button>
                </div>
            </div>
        </>
    )
}