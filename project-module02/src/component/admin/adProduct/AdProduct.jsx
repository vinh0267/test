import React, { useEffect, useState } from 'react'
import './Product.scss'
import axios from 'axios'
import { notification } from "antd"
import { storage } from '../../config/config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
// import logoStyles from './Product.module.scss'
import { Pagination } from 'antd'

export default function AdProduct() {
    const [flag, setFlag] = useState(false)
    const [product1, setProduct1] = useState([])

    const [product, setProduct] = useState(
        {
            name: "",
            price: "",
            image: "",
            quantity: "",
            url: "",
            category: ""
        }
    )

    //tạo biến để lưu dữ liệu call từ api
    const [category, setCategory] = useState([])
    //tạo biến để lưu ảnh
    const [imgUpload, setImgUpload] = useState(null)// lưu ảnh trong nô input
    const [urlImage, setUrlImage] = useState(null) // lưu url trên firebase

    //funcition để lấy ảnh
    const changeImage = (e) => {
        let file = e.target.files[0];
        setImgUpload(file);
        const reader = new FileReader();
        reader.onload = () => {
            setUrlImage(reader.result);
        };
        reader.readAsDataURL(file);

    }



    const handleProduct = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        })
    }



    const handleAdd = () => {
        // up anhr lên firebase
        if (imgUpload == null) return
        const imageRef = ref(storage, `image/${imgUpload.name}`)
        uploadBytes(imageRef, imgUpload).then((snapshot) => {
            //láy url về
            getDownloadURL(snapshot.ref).then((url) => {
                setUrlImage(url);
                //post url ảnh vào Api
                axios.post("http://localhost:8200/product", {
                    ...product,
                    url: url,
                    price: +product.price
                })
                setProduct({
                    name: "",
                    price: "",
                    image: "",
                    quantity: "",
                    url: "",
                    category: ""
                })
                setUrlImage(null)
                setFlag(!flag)
            }
            )
        })
        // post sp vào API
        // axios.post("http://localhost:8200/",
        //     product
        // )
        notification.success({
            message: "Đã thêm thành công",
        })
    }


    useEffect(() => {
        axios.get("http://localhost:8200/product")
            .then(res =>
                setProduct1(res.data))
    }, [flag])


    //lấy dữ liệu từ api để render category
    useEffect(() => {
        axios.get("http://localhost:8200/category")
            .then(res =>
                setCategory(res.data)
            )
    }, [flag])

    //hàm xóa
    const removeProduct = (id) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa?");
        if (isConfirmed) {
            axios.delete(`http://localhost:8200/product/${id}`)
                .then(() => {
                    setFlag(!flag);
                    notification.success({
                        message: "xóa thành công"
                    });
                })
                .catch((error) => {
                    console.error("Error deleting product:", error);
                    notification.error({
                        message: "Lỗi xóa sản phẩm"
                    });
                });
        }
    };

    //hàm sửa
    const editProduct = (prod) => {
        setProduct(prod);
        setUrlImage(prod.url)
    }
    const handleEdit = () => {
        let hghs = { ...product }
        if (imgUpload == null) return
        const imageRef = ref(storage, `image/${imgUpload.name}`)
        uploadBytes(imageRef, imgUpload).then((snapshot) => {
            //láy url về
            getDownloadURL(snapshot.ref).then((url) => {
                setUrlImage(url);
                //post url ảnh vào Api
                axios.put(`http://localhost:8200/product/${hghs.id}`, {
                    ...hghs,
                    url: url,
                    price: +hghs.price
                })

                setProduct({
                    name: "",
                    price: "",
                    image: "",
                    quantity: "",
                    url: "",
                    category: ""
                })
                setUrlImage(null)
                setFlag(!flag)
            }
            )
        })
    }


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const endIndex = currentPage * itemsPerPage;
    const startIndex = endIndex - itemsPerPage;
    const displayedProducts = product1.slice(startIndex, endIndex);
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div >
                <div className='box_table2'>
                    <span >Thông tin sản phẩm</span> <br />
                    <br />
                    <div>
                        <label htmlFor="" >Loại sản phẩm</label><br />
                        <select name="category" value={product.category} onChange={handleProduct} style={{width:"300px",height:"30px"}}>
                            <option value="" >Chọn loại sản phẩm</option>
                            {category.map((item) => {
                                return <option value={item.id}>{item.category}</option>
                            })}
                        </select>
                    </div>
                    <br />
                    <label htmlFor="">Tên sản phẩm</label><br />
                    <input onChange={handleProduct} name='name' value={product.name} style={{width:"300px",height:"30px"}}/> <br />
                    <br />
                    <label htmlFor="">Giá sản phẩm</label><br />
                    <input onChange={handleProduct} name='price' value={product.price} style={{width:"300px",height:"30px"}}/> <br />
                    <br />
                    <label htmlFor=""> Số lượng</label><br />
                    <input onChange={handleProduct} name='quantity' value={product.quantity} style={{width:"300px",height:"30px"}}/> <br />
                    <br />
                    <div>
                        <input type="file" htmlFor="img" onChange={changeImage} value={product.image} />
                        <img src={urlImage} alt="" width="100px" height="100px" />
                    </div>{" "}
                    <br />
                    <div  >
                        <button onClick={handleAdd} style={{width:"100px" ,height:"30px"}}> Save </button>
                        <button className="btn btn-success" onClick={handleEdit} style={{width:"100px" ,height:"30px"}} >
                            Edited
                        </button>
                    </div>
                </div>
                <div className='table_product'>
                    <table className='table_product2'>
                        <thead>
                            <tr>
                                <th className='th2'>STT</th>
                                <th className='th2'>Ảnh</th>
                                <th className='th2'>Tên</th>
                                <th className='th2'>Loại SP</th>
                                <th className='th2'>Giá</th>
                                <th className='th2'>Số lượng</th>
                                <th colSpan={2} className='th2'>Tính năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedProducts.map((prod, item) =>
                                <tr>
                                    <td className='td2'>{item + 1}</td>
                                    <div style={{ padding: "15px" }} className='td2'><img src={prod.url} alt="" style={{ width: "100px" }} /></div>
                                    <td className='td2'>{prod.name}</td>
                                    <td className='td2'>{prod.category}</td>
                                    <td className='td2'>{prod.price}</td>
                                    <td className='td2'> {prod.quantity}</td>
                                    <td className='td2'> <button onClick={() => editProduct(prod)}>sửa</button> </td>
                                    <td className='td2'> <button onClick={() => removeProduct(prod.id)}> xóa</button> </td>
                                </tr>

                            )}
                        </tbody>
                    </table>
                </div>
                <span className='pagination'>
                    <Pagination
                        className="mt-4 mb-4 text-center"
                        current={currentPage}
                        onChange={onPageChange}
                        pageSize={itemsPerPage}
                        total={product1.length}
                    />
                </span>
            </div>
        </>
    )
}
