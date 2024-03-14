'use client'
import instance from '@/data/instance'
import { Button, TextField } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import React from 'react'
import { toast } from 'react-toastify'

export default function Login() {
    const router = useRouter()
    const handleLogin =(e)=>{
        e.preventDefault();
 
        const formData = new FormData(e.target)
        instance.post('/auth/login',formData).then(x=>{
            localStorage.setItem('token',x.data.value)
            router.push('/')
        }).catch(e=>{
        toast.error('Error')
    })
    }
    return (
        <div className='bg-[url("/background.jpg")] h-[100vh] w-full relative'>
            <div className=' absolute h-[100vh] w-full top-0 bottom-0 bg-black opacity-40'>
            </div>

            <div className='w-full h-[100vh] flex items-center justify-center'>
                <div className='w-[600px] flex justify-center bg-white z-[1] rounded-md px-6 py-10'>
                    <div className='w-full px-20'>
                        <h1 className='text-4xl font-semibold text-center '>Login Form</h1>
                        <form onSubmit={handleLogin} className='my-5 flex flex-col gap-4'>
                            <TextField id="email" label="Email" variant="outlined" name='email' type='email' />
                            <TextField id="password" label="Password" variant="outlined" name='password' type='password' className='w-full' />
                            <div className='w-full flex justify-end'>
                                <Link href="/register" className='text-sm text-blue-500 border-b-2  hover:border-blue-300 border-white  w-fit'><h1 className='pb-1'>Forgot Password?</h1></Link>
                            </div>

                            <Button type='submit' variant="outlined" color='primary'>Login</Button>
                        </form>
                        <div class="inline-flex items-center justify-center w-full">
                            <hr class="w-4/5 h-[2px] my-8 bg-gray-200 border-0 rounded dark:bg-gray-300" />
                            <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2 ">
                                OR
                            </div>
                        </div>
                        <button type="button" class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 w-full justify-center">
                            <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                                <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd" />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
