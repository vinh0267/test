import React, { useEffect, useState } from 'react'
import './User.scss'
import axios from 'axios'

export default function AdUser() {
    const [flag, setFlag] = useState(false)
    const [user, setUser] = useState([])
    console.log(user);


    useEffect(() => {
        axios.get("http://localhost:8200/users")
            .then(res =>{
                console.log(res)
                setUser(res.data)
            } 
                // setUser(res.data)
            )
    }, [flag])

    const handleLock = (id) => {
        axios.patch(`http://localhost:8200/users/${id}`, { status: false });
        setFlag(!flag)
    }

    const handleUnLock = (id) => {
        axios.patch(`http://localhost:8200/users/${id}`, { status: true });
        setFlag(!flag)
    }



    return (
        <>
            <div className="user">
                <table className='table2'>
                    <thead>
                        <tr>
                            <th className='tth'>STT</th>
                            <th className='tth'>Tên đăng nhập</th>
                            <th className='tth'>Email</th>
                            <th className='tth'>Vai trò</th>
                            <th className='tth'> Tình trạng</th>
                            <th className='tth' colSpan={2}>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((item, index) => {
                            return <tr>
                                <td className='ttd'>{index + 1}</td>
                                <td className='ttd'>{item.name}</td>
                                <td className='ttd'>{item.email}</td>
                                <td className='ttd'>{item.role}</td>
                                <td className='ttd'>{item.status ? " đang hoạt động" : "bị khóa"}</td>
                                <td className='ttd'>{item.status ? <button disabled={item.role == "admin" ? true : false} onClick={() => handleLock(item.id)}> khóa</button> : <button onClick={() => handleUnLock(item.id)}>mở khóa</button>}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

        </>
    )
}
