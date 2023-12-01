import React, { useState, useEffect } from 'react'
import style from './ProductDetailed.module.css'
import Header from '../../pages/Header/Header'
import Footer from '../../pages/footer/Footer'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

export default function ProductDetailed() {
    const user = JSON.parse(localStorage.getItem("user"))

    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState({
        name: '',
        price: '',
        image: '',
        quantity: '',
        url: '',
        category: '',
        id: ''
    })

    useEffect(() => {
        axios.get(" http://localhost:8200/product")
            .then(res => {
                const arr = res.data.filter((item) => {
                    return item.id == id
                })
                if (arr.length > 0) setProduct(arr[0])
            })
    }, [])

    const addToCart = () => {
        if (!user) {
            alert("bạn chưa đăng nhập!")
            return
        }
        
        //tìm kiếm id trong user = với id trong sp
        const findItem = user.cart.find((index) => {
            return index.id == product.id
        })
        if (!findItem) {
            user.cart.push(product)
        }
        else {
            const idItem = user.cart.findIndex((i) => {
                return i.id == product.id
            })
            user.cart[idItem].quantity += 1
        }
        localStorage.setItem("user", JSON.stringify({ ...user, cart: user.cart }))
        navigate('/cart')
    }

    return (
        <>
            <Header />
            <div className={style.container}>
                <div className={style.card}>
                    <div className={style.containerFluid}>
                        <div className={`${style.wrapper} ${style.row}`}>
                            <div className={`${style.preview} ${style.colMd6}`}>
                                <div className="preview-pic tab-content">
                                    <div className="tab-pane" id="pic-1">
                                        {product.url
                                            ? <img src={product.url} />
                                            : <img src="https://i.quotev.com/b2gtjqawaaaa.jpg" />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={style.details}>
                                <h3 className={style.productTitle}>
                                    {product.name
                                        ? product.name
                                        : 'Name Not Found!'
                                    }
                                </h3>
                                <h4 className="price">current price: <span>
                                    {product.price
                                        ? product.price
                                        : 'Out of Stock!'
                                    }
                                </span></h4>
                                <h5 className="price">category: <span>
                                    {product.category
                                        ? product.category
                                        : 'No Brand!'
                                    }
                                </span></h5>
                                <div className="action">
                                    <button className={style.btn} type="button" onClick={addToCart}>Buy</button>
                                    <button className={style.btn} type="button" onClick={() => navigate(-1)}>Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
