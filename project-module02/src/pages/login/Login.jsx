import React, {  useState } from 'react'
import APIUser from '../../service/API/APIUser'
import { notification } from "antd"
import { json, useNavigate } from 'react-router-dom';
import { useMemo } from 'react'

export default function Login() {

    const navigate = useNavigate()
    const [user, setUser] = useState(
        {
            email: "",
            password: ""
        }
    )
    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleRegister = () => {
        setTimeout(() => {
            navigate("/register");
        }, 2000); // Chuyển hướng sau 2 giây
    }


    const handleClick = () => {

        if (user.email == "" || user.password == "") {
            notification.success({
                message: "vui lòng nhập đầy đủ thông tin"
            })
        } else {

            APIUser.checkLogin(user.email, user.password)
                .then((res) => {
                    // console.log(res.data[0].status);
                    if (res.data.length != 0) {
                        console.log(res);
                        if (res.data[0].status == false) {
                            notification.success({
                                message: "tài khoản bi khóa"
                            })
                        } else {
                            notification.success({
                                message: "Đăng nhập thành công",
                            })
                            localStorage.setItem("user", JSON.stringify(res.data[0]))
                            setTimeout(() => {
                                navigate("/");
                            }, 2000); // Chuyển hướng sau 2 giây

                        }


                    } else {
                        notification.success({
                            message: "tài khoản không đúng"
                        })
                    }
                })
                .catch(err => alert(err))
        }
    }

    const abc = useMemo(() => first, [second])

    return (
        <>
            <div className='container'>
                <div>
                    <h1 className='title-title'>
                        Login Form
                    </h1>
                </div>
                <div>
                    <h2 style={{ fontFamily: "'Dosis', sans-serif" }}>Login quick</h2>

                    <input type="text" placeholder='E-mail' name='email' onChange={handleChange} /><br /><br />
                    <input type="password" placeholder='Password' name='password' onChange={handleChange} /> <br /> <br />
                    <div className='login_title'>

                        <span> Forgot Password? </span>
                        <span onClick={() => navigate("/register")} style={{ color: "red" }}>Đăng kí</span>
                    </div>
                    <br />
                    <br />
                    <div className='btn_login'>
                        <button onClick={handleClick} >Login</button>
                    </div>
                </div>
                <div>
                    © 2017 Online Login Form. All rights reserved | Design by W3layouts
                </div>
            </div>

        </>
    )
}


