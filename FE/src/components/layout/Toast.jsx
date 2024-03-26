'use client'
import React from 'react'
import { ToastContainer } from 'react-toastify'

export default function Toast() {
    return (
        <div>
            <ToastContainer position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                />
        </div>

    )
}