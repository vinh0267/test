import React, { useEffect, useState } from 'react';
import './Header.scss';
import axios from 'axios';
import { Link, NavLink, useNavigate } from 'react-router-dom';


export default function Header() {
  const [ipSearch, setIpSearch] = useState("")// lưu dữ liệu của ô search
  const [prodSearch, setProdSearch] = useState([]) // lưu sp trên Api
  const navigate = useNavigate()
  const [category, setCategory] = useState([])
  const [cartlength, setCartLength] = useState(0)
  const userLogin = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    axios.get('http://localhost:8200/category').then((res) => {
      setCategory(res.data);
    });
  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const prod = user.cart;
      setCartLength(prod.length);
    }
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8200/product`).then((res) => { setProdSearch(res.data) })
  }, [])




  const logout = () => {
    localStorage.removeItem("user")
    navigate("/")
  }

  //Search
  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setIpSearch({ ...ipSearch, [name]: value });

  }

  const handleSearch = () => {
    navigate(`/search?searchKey=${ipSearch}`)
  }

  return (
    <>
      <div>
        <div className='header'> 
          <Link to='/' style={{ color: 'white' }}>
            <h2 style={{ fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" }}> APPLE STORE</h2>
          </Link>
          <div>
            <input placeholder='Search Products' name='search' onChange={(e) => setIpSearch(e.target.value)} style={{ width: "400px", height: "30px" }}></input> <button onClick={handleSearch} style={{ height: "35px" }}>Search</button>
          </div>

          <div style={{ fontSize: "18px" }}> {userLogin ? <span>{userLogin.name} <button onClick={logout} style={{ fontSize: "18px" }}>đăng xuất</button></span> : <button onClick={() => navigate("/login")} >Đăng nhập</button>}</div>
          <Link to='/cart' style={{ color: 'white', fontSize: "20px" }}>
            Giỏ hàng <span>{cartlength}</span>
          </Link>
        </div>
        <div className='navbar23'>
          {category.map((item) => (
            <NavLink key={item.id} to={`/category/${item.id}`} style={{ color: "white", fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" }}>
              {item.category}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}