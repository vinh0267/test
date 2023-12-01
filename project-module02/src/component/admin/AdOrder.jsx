import React, { useEffect, useState } from 'react'
import './Oder.scss'
import axios from 'axios'

export default function AdOrder() {
  const [bills, setBills] = useState([])

  // const product = JSON.parse(localStorage.getItem("user"))
  // const cart = product.cart
  // console.log(cart);

  useEffect(() => {
    axios.get("  http://localhost:8200/bills")
      .then(res => 
        setBills(res.data)
      )
  }, [])
  // console.log();

  return (
    <>
      <div className="box1">
        <table className="table1">
          <thead>
            <tr>
              <th className='th_Oder'>STT</th>
              <th className='th_Oder'>Tên người nhận</th>
              <th className='th_Oder'>SĐT</th>
              <th className='th_Oder'>Địa chỉ</th>
              <th className='th_Oder'>Đơn hàng</th>
              <th className='th_Oder'>Tổng giá</th>
              <th className='th_Oder'>Trạng thái đơn hàng</th>
              <th colSpan={2} className='th_Oder'>Tính năng</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((item, index) => {
              return <tr>
                <td className='td_Oder'>{index+1}</td>
                <td className='td_Oder'>{item.name} </td>
                <td className='td_Oder'> {item.phone}</td>
                <td className='td_Oder'>{item.adress} </td>
                <td className='td_Oder'>1</td>
                <td className='td_Oder'>{item.totalPrice}</td>
                <td className='td_Oder'>1 </td>
                <td className='td_Oder'><button>hủy</button> </td>
                <td className='td_Oder'><button>xóa</button> </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </>

  )
}
