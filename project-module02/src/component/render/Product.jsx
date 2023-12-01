import axios from 'axios'
import { Card, Form ,notification} from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../../pages/Header/Header'
import Footer from '../../pages/footer/Footer'
import './Product.scss'

export default function Product() {

    const user = JSON.parse(localStorage.getItem("user"))

    const [cateId, setCateId] = useState([])
    const { Meta } = Card;
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(" http://localhost:8200/product")
            .then(res => {
                const arr = res.data.filter((item) => {
                    return item.category == id
                })
                setCateId(arr)
            })
    }, [id])


    const addToCart = (item) => {
        const findItem = user.cart.find((index) => {
            return index.id == item.id
        })
        if (!findItem) {
            user.cart.push(item)
        notification.success({
            message:"đã thêm vào giỏ hàng"
        })
            localStorage.setItem("user", JSON.stringify({ ...user, cart: user.cart }))
            //  axios.post("http://localhost:8200/cart",cart)
        }
        else {
            const idItem = user.cart.findIndex((i) => {
                return i.id == item.id
            })
            user.cart[idItem].quantity += 1
            localStorage.setItem("user", JSON.stringify({ ...user, cart: user.cart }))
        }
    }
    return (
        <>
            <Header />
            <div className='product'>
                {cateId.map((item) => (
                    <div className='product1' >

                        <Card
                            key={item.id}
                            hoverable
                            style={{ width: "250" }}
                            cover={<img alt="example" src={item.url} />}
                        >
                            <div onClick={() => navigate(`/ProductDetailed/${item.id}`)} className='div-tilte'>
                                    <Meta title={item.name} description="" />
                                    <div >price: {item.price}</div>
                            </div>
                            <div style={{textAlign:"center"}}>
                                <button onClick={() => addToCart(item)} className='btn-render'>Buy</button>
                            </div>
                        </Card>
                    </div>
                ))}
            </div >
            <Footer />
        </>
    )
}
