import Footer from '../footer/Footer'
import Header from '../Header/Header'
import './Cart.scss'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd';
import axios from 'axios';
import { notification } from "antd";
import { useNavigate } from 'react-router-dom';


export default function Cart() {
    const navigate = useNavigate()
    const [bill, setBill] = useState({
        name: "",
        address: "",
        phone: null,
        order: "",
        totalPrice: "",
        status: ""
    })
    console.log(bill);

    const [open, setOpen] = useState(false) // mmodal
    const [flag, setFlag] = useState(false) //thay đổi để render lại
    let users = JSON.parse(localStorage.getItem("user"))
    const [user, setUser] = useState(users) //
    const [total, setTotal] = useState(0) // lưu total
    const product1 = user?.cart || [] // user là mảng get từ local về.chấm đến card



    //hamf tính tổng. forEach duyệt qua từng phần tử của mảng.chấm đến th price và quantity
    useEffect(() => {
        let count = 0;
        product1.forEach(element => {
            const price = Number(element.price) || 0
            const quantity = element.quantity || 0
            count += (price * quantity)
        });
        if (count >= 0) setTotal(count)
    }, [user])
    // console.log(product1);

    //hàm tăng
    const upHandler = (id) => {
        product1.forEach(element => {
            if (element.id == id) {
                element.quantity++
                setUser({ ...user })
                localStorage.setItem("user", JSON.stringify(user))
                return
            }
        });

    }

    // hàm giảm
    const downHandler = (id) => {
        product1.forEach(element => {
            if (element.id == id) {
                element.quantity--
                if (element.quantity < 1) return
                setUser({ ...user })
                localStorage.setItem("user", JSON.stringify(user))
                return
            }
        });
    }


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        setUser(user)
    }, [flag])


    //xóa sp trong cart
    const deleteCart = (index) => {
        let abc = window.confirm("bạn có chắc chắn muốn xóa ?")
        if (abc) {
            users.cart.splice(index, 1)
            localStorage.setItem("user", JSON.stringify(users))
            setFlag(!flag) // đặt biến flag để màn hình render lại 
        }
    }

    //lấy dữ liệu ô input
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setBill({ ...bill, [name]: value })
    }

    // nút ok.tạo mảng mới với 1 đối tượng.clone mảng = cũ thêm total
    const setOpenCart = () => {
        if (bill.name == "" || bill.name == "" && bill.address == "" || bill.name == "" && bill.phone == "" || bill.address == "" && bill.phone == "" || bill.name == "" && bill.address == "" && bill.phone == "") {
            setOpen(false) // tắt modal
            notification.success({
                message: " vui lòng nhập đầy đủ thông tin"
            })
        }
        else {
            const newCart = {
                ...bill, totalPrice: total
            }
            axios.post("http://localhost:8200/bills", newCart)
            setOpen(false) // tắt modal
            notification.success({
                message: "thành công"
            })
            user.cart=[]
            localStorage.setItem("user",JSON.stringify(user))
            setTimeout(() => {
                navigate("/")  
            }, 1500);
        }

    }




    return (
        <>
            <Header />
            <div className='bag'>
                <h1> YOUR BAG </h1>
            </div>
            {product1?.map((item, index) => {
                return <div className='bag_cont'>
                    <div className='bag_child'>
                        <div className='img'><img src={item.url} alt="" style={{}} /></div>
                        <div className='cont'>
                            Name: {item.name}
                            <br />
                            <br />
                            Quantity :
                            <br />
                            <button onClick={() => upHandler(item.id)}>+</button>
                            &nbsp;
                            &nbsp;
                            {item.quantity}
                            &nbsp;
                            &nbsp;
                            <button onClick={() => downHandler(item.id)}>-</button><br /><br />
                        </div>
                        <div className='price'>
                            <div> {item.price}</div>
                            <div><button onClick={() => deleteCart(index)}>xóa</button></div>
                        </div>
                    </div>
                </div>
            })}

            <div className='checkout'>
                <h2> giá : {total}</h2>

                <br />
                <br />
                <Button type="primary" onClick={() => setOpen(true)}>
                    Check out
                </Button>

                <Modal
                    title="Hãy nhập đầy đủ thông tin để mua hàng"
                    centered
                    open={open}
                    onOk={() => setOpenCart()}
                    onCancel={() => setOpen(false)}
                    width={1000}
                >
                    <p>Tên : <br /><input name='name' type="text" style={{ border: "none", borderBottom: "1px solid", outline: "none", width: "500px" }} onChange={handleChange} /></p>
                    <p>SĐT: <br /><input name='phone' type="text" style={{ border: "none", borderBottom: "1px solid", outline: "none", width: "500px" }} onChange={handleChange} /></p>
                    <p>Địa chỉ: <br /><input name='adress' type="text" style={{ border: "none", borderBottom: "1px solid", outline: "none", width: "500px" }} onChange={handleChange} /></p>
                </Modal>
            </div>
            <Footer />
        </>
    )
}
