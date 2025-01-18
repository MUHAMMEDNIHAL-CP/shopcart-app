import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import api from '../../api'
import Spinner from '../ui/Spinner'
import useCartData from '../../hooks/useCartData'
import { Link } from 'react-router-dom'

const CartPage = ({ setNumberCartItems }) => {

    const { cartitems, setCartItems, cartTotal, setCartTotal, loading, tax } = useCartData()


    if (loading) {
        return <Spinner loading={loading} />
    }

    if (cartitems.length < 1) {
        return <div
            style={{
                backgroundColor: '#f8f8f8',
                padding: '1px',
                minHeight: '90vh', // Ensures full height on all devices
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    textAlign: 'center',
                    padding: '30px 16px',
                    margin: '16px', // Adjust for smaller screens
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px',
                    maxWidth: '800px', // Prevents it from being too wide on large screens
                    width: '100%',
                    borderRadius: '8px', // Optional: Adds rounded corners for better aesthetics
                }}
            >
                <img
                    src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                    alt="Empty Cart"
                    style={{
                        height: '162px',
                        maxWidth: '100%', // Ensures the image scales down on smaller screens
                    }}
                />
                <div style={{ fontSize: '18px', marginTop: '24px' }}>
                    Your cart is empty!
                </div>
                <div style={{ fontSize: '12px', marginTop: '10px' }}>
                    Add items to it now.
                </div>
                <Link to="/">
                    <button
                        style={{
                            fontSize: '14px',
                            marginTop: '20px',
                            fontWeight: '400',
                            padding: '12px 36px', // Adjusted padding for smaller devices
                            backgroundColor: '#2874f0',
                            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, .2)',
                            border: 'none',
                            borderRadius: '4px', // Rounded corners for the button
                            color: 'white',
                            cursor: 'pointer',
                        }}
                    >
                        Shop now
                    </button>
                </Link>
            </div>
        </div>

    }

    return (
        <div className='container' style={{ height: '70vh', overflow: 'scroll', marginTop: '100px' }} >
            <h5 className='mb-4'>Shopping Cart</h5>
            <div className='row'>
                <div className='col-md-8'>
                    {cartitems.map(item => <CartItem key={item.id}
                        item={item}
                        cartitems={cartitems}
                        setCartTotal={setCartTotal}
                        setCartItems={setCartItems}
                        setNumberCartItems={setNumberCartItems} />)}
                </div>

                <CartSummary cartTotal={cartTotal} tax={tax} />
            </div>
        </div>
    )
}

export default CartPage