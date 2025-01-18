import React from 'react'
import { BASE_URL } from '../../api'

const OrderItem = ({cartitems}) => {

  const price = (cartitems.product.price * cartitems.quantity).toFixed(2)

  return (
    <div className='d-flex justify-content-between align-items-center mb-3' style={{padding: '8px'}}>
        <div className='d-flex align-items-center'>
            <img 
            src={`${BASE_URL}${cartitems.product.image}`} 
            alt='Product'
            className='img-fluid' 
            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }}
            />
            <div className='ms-3'>
                <h6 className='mb-0'>{cartitems.product.name}</h6>
                <small>{`Quantity: ${cartitems.quantity}`}</small>
            </div>
        </div>
        <h6>₹{price}</h6>
    </div>
  )
}

export default OrderItem