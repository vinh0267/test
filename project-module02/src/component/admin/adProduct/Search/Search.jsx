import React, { useEffect, useState } from 'react'
import Header from '../../../../pages/Header/Header'
import Footer from '../../../../pages/footer/Footer'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { Card } from 'antd';
import './Search.scss'

export default function Search() {
    const [searchKey, setSearhKey] = useState("")
    const [product, setProduct] = useState([]);
    const location = useLocation()
    const user = JSON.parse(localStorage.getItem("user"))
    const handleGetKey = () => {
        const search = new URLSearchParams(location.search)
        setSearhKey(search.get('searchKey'))
    }
    useEffect(() => {
        handleGetKey()
    }, [location]);
    useEffect(() => {
        axios.get('http://localhost:8200/product')
            .then((res) => {
                const searchArr = res.data.filter(item => item.name.toLowerCase().includes(searchKey));
                setProduct(searchArr)
            });
    }, [searchKey]);
    console.log(product);

    const addToCart = (item) => {
        // dùng hàm find để tìm kiếm id trong user = với id trong sp
        const findItem = user.cart.find((index) => {
          // console.log(index);
          return index.id == item.id
        })
        //nếu không có thì push vào cart
        if (!findItem) {
          user.cart.push(item)
          //lưu lên local user với cart mới
          localStorage.setItem("user", JSON.stringify({ ...user, cart: user.cart }))
        }
        else {
          // nếu có thì tìm kiếm id của các sp ở trong user == id sp truyền vào
          // sau đó sẽ lấy cart ở trong user +1.lưu -> local
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
            <div className='search'>
                {product.map((item) => {
                    return <div className='cardsearch'>
                    <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
                        <div className="custom-image">
                            <img alt="example" width="100%" src={item.url} />
                        </div>
                        <div className="custom-card">
                            <div className='itemName'> <h3>{item.name}</h3></div>
                            <div className='itemPrice'> <p>{item.price}</p> </div>
                            <div className='itemBtn'> <button onClick={() => addToCart( item)}>Buy</button> </div>
                        </div>
                    </Card>
                    </div>
                })}
            </div>
            <Footer />
        </>
    )
}
