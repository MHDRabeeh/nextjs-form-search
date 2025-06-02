"use client"
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Table({ data }) {

    const [query, setQuery] = useState({
        productName: "",
        status: "",
        quantity: "",
        productId: ""
    });
    const searchParams = useSearchParams()
    const router = useRouter()



    function handleSearch() {
        try {
            const params = new URLSearchParams();
            if (query.productName) {
                params.set("productName", query.productName);
            } else {
                params.delete("productName")
            }
            if (query.status) {
                params.set("status", query.status)
            } else {
                params.delete("status")
            }
            if (query.quantity) {
                params.set("quantity", query.quantity)
            } else {
                params.delete("quantity")
            }
            if (query.productId) {
                params.set("productId", query.productId)
            } else {
                params.delete("productId")
            }

            router.replace(
                `?${params.toString()}`,
            );

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className='p-6'>
            <div className='w-full py-2 px-3 bg-slate-100 text-sm text-gray-700  overflow-auto flex justify-between items-end'>

                <div className='flex space-x-2  items-end'>
                    <div className='flex flex-col gap-1 '>
                        <label className='font-semibold text-gray-400' htmlFor="">Product name</label>
                        <input onChange={(e) => setQuery((prev) => ({ ...prev, productName: e.target.value }))} type="text"
                            className='px-4 py-1.5 outline-none border-gray-200 border rounded ' />
                    </div>
                    <div className=' flex flex-col gap-1 '>
                        <label className='font-semibold text-gray-400' htmlFor="">status</label>
                        {/* <input type="text" className='px-4 py-1.5 outline-none border-gray-200 border rounded ' />
                     */}
                        <select
                            onChange={(e) => setQuery((prev) => ({ ...prev, status: e.target.value }))}
                            className='px-4 py-1.5 outline-none border-gray-200 border rounded bg-white' name="" id="">
                            <option value=""> All</option>
                            <option value="in_stock"> In Stock</option>
                            <option value="out_of_stock"> Out Of Stock</option>
                            <option value="Discontinued"> Discontinued</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-1 '>
                        <label className='font-semibold text-gray-400' htmlFor="">Quatity</label>
                        <input
                            onChange={(e) => setQuery((prev) => ({ ...prev, quantity: e.target.value }))}
                            type="text" className='px-4 py-1.5 outline-none border-gray-200 border rounded ' />
                    </div>
                    <div className='flex flex-col gap-1 '>
                        <label className='font-semibold text-gray-400' htmlFor="">Product Id</label>
                        <input
                            onChange={(e) => setQuery((prev) => ({ ...prev, productId: e.target.value }))}
                            type="text" className='px-4 py-1.5 outline-none border-gray-200 border rounded ' />
                    </div>
                    <div >
                        <button onClick={handleSearch} className='py-1.5 px-6 bg-blue-300 text-white font-medium rounded hover:bg-blue-400 transition-colors'>Search</button>
                    </div>
                    <div >
                        <button onClick={()=>{router.replace(window.location.pathname)}} className='py-1.5 px-6 bg-blue-300 text-white font-medium rounded hover:bg-blue-400 transition-colors'>Reset</button>
                    </div>
                </div>
                <div >
                    <button onClick={() => router.push('/product/add')} className='px-6 py-2 bg-blue-300 text-white font-medium rounded hover:bg-blue-400 transition-colors'> Add Product</button>
                </div>

            </div>
            <table className='w-full'>
                <thead className='bg-gray-50 border-b-2 border-b-gray-200  '>
                    <tr >
                        <th className='text-sm tracking-wider p-3 font-semibold text-left'>Product Id</th>
                        <th className='text-sm tracking-wider p-3 font-semibold text-left'> Image</th>
                        <th className='text-sm tracking-wider p-3 font-semibold text-left'>Product Name</th>
                        <th className='text-sm tracking-wider p-3 font-semibold text-left'>Quantity</th>
                        <th className='text-sm tracking-wider p-3 font-semibold text-left'>status</th>
                        <th className='text-sm tracking-wider p-3 font-semibold text-left'>action</th>

                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => (
                        <tr key={item._id} className='odd:bg-white even:bg-gray-50'>
                            <td className='text-sm text-gray-600 p-3 whitespace-normal '>{item.productId}</td>
                            <td className='text-sm text-gray-600 p-3 whitespace-normal '>
                                <img className='h-8 w-8' src={item.imageUrl} alt="" />
                            </td>
                            <td className='text-sm text-gray-600 p-3 whitespace-normal '>{item.productName}</td>
                            <td className='text-sm text-gray-600 p-3 whitespace-normal '>{item.quantity}</td>
                            <td className='text-sm text-gray-600 p-3 whitespace-normal '>{item.status}</td>
                            <td className='text-sm text-gray-600 p-3 whitespace-normal  space-x-3 '>
                                <span onClick={()=>router.push(`/product/edit/${item._id}`)} className='font-semibold text-blue-700 cursor-pointer'>Edit</span>
                                <span className='font-semibold text-red-700 cursor-pointer' > Delete</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}
