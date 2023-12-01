import React, { useState } from 'react'

import AdProduct from './adProduct/AdProduct';
import AdOrder from './AdOrder';
import AdUser from './AdUser';
import Category from './Category';
import './admin.scss'
import { Link } from 'react-router-dom';


export default function Admin() {
    const [page, setPage] = useState(1);
    return (
        <>
            <div className='admin'>
                <Link to='/' onClick={(e) => {
                    setPage(1)
                    e.preventDefault()
                }} className='ad_product'>Products</Link>
                <Link to='/' onClick={(e) => {
                    setPage(2)
                    e.preventDefault()
                }} className='ad_order'>Order</Link>
                <Link to='/' onClick={(e) => {
                    setPage(3)
                    e.preventDefault()
                }} className='ad_user'>Users</Link>
                <Link to='/' onClick={(e) => {
                    setPage(4)
                    e.preventDefault()
                }} className='ad_category'>Category</Link>
            </div>
            {page == 1 ? <AdProduct></AdProduct> : ""}
            {page == 2 ? <AdOrder></AdOrder> : ""}
            {page == 3 ? <AdUser></AdUser> : ""}
            {page == 4 ? <Category></Category> : ""}
        </>
    )
}
