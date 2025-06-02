"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'


export default function AddProductForm() {

  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [data, setData] = useState({
    productName: "",
    productId: "",
    quantity: "",
    status: "",
    productDetails: ""
  });


  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("productName", data.productName);
      formData.append("productId", data.productId);
      formData.append("quantity", data.quantity);
      formData.append("discription", data.productDetails)
      formData.append("status", data.status);
      formData.append("image", image)
      const res = await axios.post("/api/product/add", formData)
      setLoading(false)
      console.log(res.data);
      if (res.data.success) {
        setData({
          productName: "",
          productId: "",
          quantity: "",
          status: "",
          productDetails: ""
        })
        setImage(null)
        router.refresh();
      }
    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='w-full h-screen py-20'>
      <h1 className='text-gray-800 font-semibold  text-xl text-center  mb-2'>Add Product </h1>
      <div className='w-2/3 p-4 mx-auto shadow bg-gray-50 rounded'>
        <form className='space-y-3  w-full' onSubmit={handleSubmit}>
          <div className='flex space-x-3'>
            <div className='w-1/2'>
              <label >Product Name</label>
              <input
                onChange={(e) => setData((prev) => ({ ...prev, productName: e.target.value }))}
                className='py-2 px-4 outline-none  rounded focus:border focus:border-purple-400 block text-sm 
             border border-gray-200 text-gray-800 w-full' type="text" name='productName' />
            </div>
            <div className='w-1/2'>
              <label >product id </label>
              <input
                onChange={(e) => setData((prev) => ({ ...prev, productId: e.target.value }))}
                className='py-2 px-4 outline-none  rounded focus:border focus:border-purple-400 block text-sm 
             border border-gray-200 text-gray-800 w-full' type="text" name='productId' />
            </div>
          </div>
          <div className='flex space-x-3'>
            <div className='w-1/2'>
              <label >Quantity</label>
              <input
                onChange={(e) => setData((prev) => ({ ...prev, quantity: e.target.value }))}
                className='py-2 px-4 outline-none  rounded focus:border focus:border-purple-400 block text-sm 
             border border-gray-200 text-gray-800 w-full' type="number" name='quantity' />
            </div>
            <div className='w-1/2'>
              <label >status</label>
              <select
                value={data.value}
                onChange={(e) => setData((prev) => ({ ...prev, status: e.target.value }))}
                className='py-2 px-4 outline-none  rounded focus:border focus:border-purple-400 block text-sm 
             border border-gray-200 text-gray-800 w-full' name='status' id="">
                <option value="in_stock">In stock</option>
                <option value="out_of_stock">out of stock</option>
                <option value="Discontinued">discountinued</option>
              </select>
            </div>

          </div>
          <div>
            {/* image uploading  */}
            <div className=' m-2'>
              <label htmlFor='image-upload' className='cursor-pointer w-24 h-24 inline-block'>
                <input type="file" id='image-upload' className='cursor-pointer hidden' name='image' onChange={(e) => {
                  if (e.target.files[0]) {
                    setImage(e.target.files[0])
                  }
                }} />

                <img className='w-24 h-24 border-2  border-dashed rounded object-cover hover:opacity-80 transition  border-gray-500'
                  src={image ? URL.createObjectURL(image) : "/upload.png"} alt="" />
              </label>
            </div>
            <div>
              <label >Product details </label>
              <textarea
                onChange={(e) => setData((prev) => ({ ...prev, productDetails: e.target.value }))}
                className='py-2 px-4 outline-none  rounded focus:border focus:border-purple-400 block text-sm 
             border border-gray-200 text-gray-800 w-full' type="text" name='productDetails' />
            </div>
          </div>

          <div className=''>
            <button type='submit' className={`${loading ? "bg-blue-300" : "bg-blue-400"} px-6 py-2  text-white rounded hover:bg-blue-400 font-medium mt-4 transition-colors `}>{loading ? "Loading..." : "submit"}</button>
          </div>

        </form>
      </div>
    </div>

  )
}
