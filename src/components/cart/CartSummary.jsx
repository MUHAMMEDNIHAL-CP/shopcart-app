import { Link } from "react-router-dom"

const CartSummary = ({cartTotal, tax}) => {

    const subTotal = cartTotal.toFixed(2)
    const cartTax = tax.toFixed(2)
    const total = (cartTotal + tax).toFixed(2)

  return (
    <div className='col-md-4 align-self-start'>
        <div className='cart'>
            <div className='cart-body'>
                <h5 className='cart-title'>Cart Summary</h5>
                <hr />
                <div className='d-flex justify-content-between'>
                    <span>Subtotal:</span>
                    <span>₹{subTotal}</span>
                </div>
                <div className='d-flex justify-content-between'>
                    <span>Tax:</span>
                    <span>₹{cartTax}</span>
                </div>
                <div className='d-flex justify-content-between'>
                    <span>Total:</span>
                    <strong>₹{total}</strong>
                </div>
                <br />
                <Link to="/checkout">
                <button
                  className='btn btn-primary mb-3 w-100'
                  style={{ backgroundColor: '#6050DC', borderColor: '#6050DC' }}
                >
                    Proceed to Checkout
                </button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default CartSummary