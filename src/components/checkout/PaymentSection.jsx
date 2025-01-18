import { useState } from 'react'
import styles from './PaymentSection.module.css'
import api from '../../api'

const PaymentSection = () => {

    const cart_code = localStorage.getItem("cart_code")
    const [loading, setLoading] = useState(false)

    function makePayment(){
        api.post("initiate_payment/", {cart_code})
        .then(response => {
            console.log(response.data)
              window.location.href = response.data.data.link
        })

        .catch(err => {
            console.log(err.message)
        })
    }

    function paypalPayment(){
        setLoading(true)
        api.post("initiate_paypal_payment/", {cart_code})
        .then(response => {
            console.log(response.data)
            setLoading(false)
            if(response.data.approval_url){
                window.location.href = response.data.approval_url
            }
        })

        .catch(err => {
            console.error('Error initiating payment', err.message)
            setLoading(false)
        })
    }

  return (
    <div className='col-md-4 mt-3'>
        <div className={`card ${styles.card}`}>
            <div className="card-header" style={{ backgroundColor: '#6050DC', color: "white" }}>
                <h5>Payment Opitions</h5>
            </div>
            <div className="card-body">
                <button className={`btn btn-primary w-100 mb-3 ${styles.paypalButton}`} onClick={paypalPayment} id='paypal-button'>
                    <i className="bi bi-paypal" /> Pay wit PayPal
                </button>

                <button className={`btn btn-warning w-100 ${styles.flutterwaveButton}`} disabled={loading} onClick={makePayment} id='flutterwave-button'>
                    <i className="bi bi-credit-card" /> Pay wit Flutterwave
                </button>
            </div>
        </div>
    </div>
  )
}

export default PaymentSection