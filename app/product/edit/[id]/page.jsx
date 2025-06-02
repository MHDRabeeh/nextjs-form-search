"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Loading from '@/app/Loading'
import axios from 'axios'

export default function ProductEditForm() {
    const [productData, setProductData] = useState({})
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState()
    const { id } = useParams()

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true)
                const { data } = await axios.get(`/api/product/get?id=${id}`)
                setProductData(data.data[0]);
            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [])

    if (loading) {
        return <Loading />
    }



    return (
        <div className='w-full h-screen py-20'>
            <h1 className='text-gray-800 font-semibold  text-xl text-center  mb-2'>Edit Product </h1>
            <div className='w-2/3 p-4 mx-auto shadow bg-gray-50 rounded'>
                <form className='space-y-3  w-full' action="">
                    <div className='flex space-x-3'>
                        <div className='w-1/2'>
                            <label >Product Name</label>
                            <input
                                value={productData.productName}
                                onChange={(e) => setProductData((prev) => ({ ...prev, productName: e.target.value }))}
                                className='py-2 px-4 outline-none  rounded focus:border focus:border-purple-400 block text-sm 
             border border-gray-200 text-gray-800 w-full' type="text" />
                        </div>
                        <div className='w-1/2'>
                            <label >product id </label>
                            <input
                                disabled
                                value={productData.productId}
                                className='py-2 px-4 outline-none  rounded focus:border focus:border-purple-400 block text-sm 
             border border-gray-200 text-gray-800 w-full' type="text" />
                        </div>
                    </div>
                    <div className='flex space-x-3'>
                        <div className='w-1/2'>
                            <label >Quantity</label>
                            <input
                                value={productData.quantity}
                                className='py-2 px-4 outline-none  rounded focus:border focus:border-purple-400 block text-sm 
             border border-gray-200 text-gray-800 w-full' type="number" />
                        </div>
                        <div className='w-1/2'>
                            <label >status</label>
                            <select
                                value={productData.status}
                                // onChange={(e) => setData((prev) => ({ ...prev, status: e.target.value }))}
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
                                <input type="file" id='image-upload' className='cursor-pointer hidden' onChange={(e) => {
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
                            <textarea value={productData.discription} className='py-2 px-4 outline-none  rounded focus:border focus:border-purple-400 block text-sm 
             border border-gray-200 text-gray-800 w-full' type="text" />
                        </div>
                    </div>

                    <div className=''>
                        <button className='px-6 py-2 bg-blue-300 text-white rounded hover:bg-blue-400 font-medium mt-4 transition-colors '>Save Changes</button>
                    </div>

                </form>
            </div>
        </div>
    )
}
