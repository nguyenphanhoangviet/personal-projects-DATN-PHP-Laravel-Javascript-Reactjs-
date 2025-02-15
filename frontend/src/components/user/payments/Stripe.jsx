
import React from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './style.scss'

export default function Stripe() {
    const { cartItems } = useSelector(state => state.cart)

    const fetchPaymentUrl = async() => {
        try {

            const response = await axios.post('/pay',
                {cartItems, success_url: 'http://localhost:3000/payment/success'}
            )
            window.location.href = response.data.url

        
            console.log('Redirecting to:', response.data.url); 
            window.location.href = response.data.url;

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='row col-md-6 mx-auto mt-5'>
            <button className="btn-payment" onClick={() => fetchPaymentUrl()}>

                Thanh toán Stripe

            </button>
        </div>
    )
}

