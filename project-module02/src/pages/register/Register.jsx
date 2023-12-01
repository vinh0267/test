import React from 'react';
import './Register.scss'
import { useState } from 'react';
import APIUser from '../../service/API/APIUser';
import { useNavigate } from 'react-router-dom';
import { notification } from "antd"

export default function Register() {


    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    const navigate = useNavigate()
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        password: "",
        confpassword: "",
        cart: [],
        status: true,
        role: "user"
    })



    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value })
    };


    const handleClick = () => {
        if (user.name == "" || user.email == "" || user.password == "" || user.confpassword == "") {
            notification.success({
                message: "vui lòng nhập đầy đủ thông tin"
            })
        } else if (!regex.test(user.email)) {
            notification.success({
                message: "email không đúng"
            })
        } else if (user.password != user.confpassword) {
            notification.success({
                message: "mật khẩu không khớp nhau"
            })
        } else if (user.password.length < 6) {
            notification.success({
                message: "mật khẩu quá ngắn"
            })
        } else {
            APIUser.checkRegister(user.email)
                .then((res) => {
                    if (res.data.length != 0) {
                        notification.success({
                            message: "email đã tồn tại"
                        })
                        return
                    } else {
                        APIUser.register(user)

                        notification.success({
                            message: "đăng nhập thành công"
                        })
                        navigate("/Login")

                    }
                })
        }
    }

    return (
        <>
            <div className='container'>
                <div>
                    <h1 className='title-tile'>
                        Register Form
                    </h1>
                </div>
                <div>
                    <h2 style={{fontFamily:"'Dosis', sans-serif"}}>Register quick</h2>
                    <input type="text" placeholder='User name' onChange={handleChange} name='name' /><br /><br />
                    <input type="email" placeholder='E-mail' onChange={handleChange} name='email' /><br /><br />
                    <input type="password" placeholder='password' onChange={handleChange} name='password' /> <br /><br />
                    <input type="password" placeholder='Confirm-password' onChange={handleChange} name='confpassword' /> <br />
                    <div style={{ textAlign: "end" }}>
                        <span> have account?  </span>
                        <span onClick={() => navigate("/login")} style={{ color: "red" }}>Đăng nhập </span> <br /> <br />
                        <div style={{ textAlign: "center" }}>
                        <button onClick={handleClick}>Register</button> 
                        </div>
                    </div>
                </div>
                <div>
                    © 2017 Online Login Form. All rights reserved | Design by W3layouts
                </div>
            </div>
        </>
    )
}






// const [newUsers, setNewUsers] = useState({
//     id: "",
//     name: "",
//     email: "",
//     passwork: "",
//     cart: []
// });

// const [err, setErr] = useState({
//     name: "",
//     email: "",
//     passwork: ""
// })
// //  laasy gias trij cua casc o input
// const handleinputvalue = (e) => {
//     let name = e.target.name;
//     let value = e.target.value;
//     setNewUsers({ ...newUsers, [name]: value })



//     if (name === "name") {
//         if (value.trim() === "") {
//             setErr({ ...err, [name]: "Không được để trống" })
//         } else if (value.trim().length <= 7) {
//             setErr({ ...err, [name]: "Tên đăng nhập phải có ít nhất 8 từ" })
//         } else {
//             setErr({ ...err, [name]: "" })
//         }
//     }
//     if (name === "email") {
//         if (value.trim() === "") {
//             setErr({ ...err, [name]: "Không được để trống" })
//         } else {
//             setErr({ ...err, [name]: "" })
//         }
//     }
//     if (name === "passwork") {
//         if (value.trim() === "") {
//             setErr({ ...err, [name]: "Không được để trống" })
//         } else if (value.trim().length <= 8) {
//             setErr({ ...err, [name]: "Mật khẩu phải có phải có ít nhất 8 từ" })
//         } else {
//             setErr({ ...err, [name]: "" })
//         }
//     }
// }

// const navigate = useNavigate();


// const handleRegister = (() => {
//     if (newUsers.email == "" || newUsers.passwork == "" || newUsers.name == "") {
//         notification.error({
//             message: "Vui lòng điền đầy đủ thông tin"
//         })

//     } else {
//         apis.checkRegister(newUsers.email, newUsers.passwork)
//             .then((res) => {
//                 if (res.data.length != 0) {
//                     /*  notification.error({
//                        message: "Email da đc đang ký",
//                      }); */
//                 } else {
//                     apis.register(newUsers)
//                     /*  notification.success({
//                          message:"Bạn đã đăng nhập thành công"
//                      }) */
//                     navigate("/login")
//                 }
//             })
//     }

// })