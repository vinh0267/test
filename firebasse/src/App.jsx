import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useState } from 'react'
import { storage } from './config/firebase'
import axios from 'axios'

export default function App() {
  const [imgUpload, setImgUpload] = useState()
  const [urlImage, setUrlImage] = useState(null);
  const [prod, setProd] = useState(
    {
      name: "",
      price: "",
      url: urlImage
    }
  )
  const handleInput = (e) => {
    setProd
      ({
        ...prod,
        [e.target.name]: e.target.value,

      })
    console.log(prod);
  }

  const UpImage = (e) => {
    console.log(e.target.files);
    let file = e.target.files[0]
    setImgUpload(file)
  }

  const handleAdd = () => {
    if (imgUpload == null) return
    const imageRef = ref(storage, `image/${imgUpload.name}`)
    uploadBytes(imageRef, imgUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setUrlImage(url);

        axios.post("http://localhost:8002/product", { ...prod, url: url })
      }
      )
    })
  }



  return (
    <>
      <h1> fire base</h1>
      <input type="text" onChange={handleInput} name='name' />
      <label htmlFor=''>Name</label><br /><br />
      <input type="text" onChange={handleInput} name='price' />
      <label htmlFor=''>price</label><br /><br />
      <input type="file" onChange={UpImage} />
      <label htmlFor=''>image</label><br /><br />
      <button onClick={handleAdd}>add</button>
      <img src={urlImage} alt="" style={{ width: "200px" }} />
    </>
  )
}
