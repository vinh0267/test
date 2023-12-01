import { Card } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Home.scss'
import Header from '../../pages/Header/Header'
import Footer from '../../pages/footer/Footer'
import { useNavigate } from 'react-router-dom'
import { notification } from "antd";

export default function Home() {
    const { Meta } = Card
    const user = JSON.parse(localStorage.getItem("user"))
    const [product, setProduct] = useState([])
    const navigate = useNavigate()

    // Lấy dữ liệu từ API để render danh sách sản phẩm
    useEffect(() => {
        axios.get('http://localhost:8200/product')
            .then((res) => {
                setProduct(res.data)
            })
    }, [])

    // Lấy toàn bộ dữ liệu một lần duy nhất
    const handleSort = async (order) => {
        let url = 'http://localhost:8200/product?_sort=price&_order=' + order
        const result = await axios.get(url)
        setProduct(result.data)
    }

    const addToCart = (item) => {
        //tìm kiếm id trong user = với id trong sp
        const findItem = user.cart.find((index) => {
            return index.id == item.id
        })
        //nếu không có thì push vào cart
        if (!findItem) {
            user.cart.push(item)
            notification.success({
                message: "đã thêm vào giỏ hàng"
            })
        }
        // nếu có thì tìm kiếm id của các sp ở trong user == id sp truyền vào
        else {
            const idItem = user.cart.findIndex((i) => {
                return i.id == item.id
            })
            // sau đó sẽ lấy quantity +1
            user.cart[idItem].quantity += 1
            notification.success({
                message: "đã thêm vào giỏ hàng"
            })
        }
        //lưu lên local user với cart mới
        localStorage.setItem("user", JSON.stringify({ ...user, cart: user.cart }))
    }

    return (
        <>
            <Header />
            <div className='sort'>
                <select onClick={(e) => handleSort(e.target.value)}>
                    <option>Sắp xếp theo</option>
                    <option value="asc">Giá thấp đến cao</option>
                    <option value="desc">Giá cao đến thấp</option>
                </select>
            </div>
            <div className='product'>
                {product.map((item) => (
                    <div className='product1' >
                        <Card
                            key={item.id}
                            hoverable
                            style={{ width: "250" }}
                            cover={<img alt="example" src={item.url} />}
                        >
                            <div onClick={() => navigate(`/ProductDetailed/${item.id}`)} >
                                <div className='itemName'> <Meta title={item.name} description="" /></div>
                                <div className='itemPrice'>price: {item.price}</div>
                                </div>
                                <div className='itemTitle'><button onClick={() => addToCart(item)} className='BuyToCart'>Buy</button>
                            </div>
                        </Card>
                    </div>
                ))}
            </div >
            <Footer />
        </>
    )
}