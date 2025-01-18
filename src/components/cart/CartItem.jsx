import { useState } from "react"
import api, { BASE_URL } from "../../api"
import { toast } from "react-toastify"

const CartItem = ({item, setCartTotal, cartitems, setCartItems, setNumberCartItems}) => {

  const [quantity, setQuantity] = useState(item.quantity)
  const [loading, setLoading] = useState(false)

  const itemData = {quantity: quantity, item_id: item.id}
  const itemID = {item_id: item.id}

  function deleteCartitem(){
    const confirmDelete = window.confirm("Are you want to delete this cartitem")

    if(confirmDelete){
      api.post("delete_cartitem/", itemID)
      .then(response => {
        console.log(response.data)
        toast.success("Cartitem deleted succesfully")
        setCartItems(cartitems.filter(cartitem => cartitem.id != item.id))
        setCartTotal(cartitems.filter((cartitem) => cartitem.id != item.id)
        .reduce((acc, curr) => acc + curr.total, 0))


        setNumberCartItems(cartitems.filter((cartitem) => cartitem.id != item.id)
        .reduce((acc, curr) => acc + curr.quantity, 0))

      })
        .catch(error => {
          console.log(error.message)
          })
    }
  }

  function updateCartItem(){
    setLoading(true)
    api.patch('update_quantity/', itemData)
    .then(response => {
      console.log(response.data)
      setLoading(false)
      toast.success("CartItem updated successfully!")
      setCartTotal(cartitems.map((cartitem) => cartitem.id === item.id ? response.data.data : cartitem)
      .reduce((acc, curr) => acc + curr.total, 0))

      setNumberCartItems(cartitems.map((cartitem) => cartitem.id === item.id ? response.data.data : cartitem)
      .reduce((acc, curr) => acc + curr.quantity, 0))
    })
    .catch(err => {
      console.error(err.message)
      setLoading(false)
    })
  }

  return (
    <div className='col-md-12 m-0'>
        <div
          className='cart-item d-flex align-items-center mb-3 py-3'
          style={{ backgroundColor: '#f8f9fa', borderRadius: '8px '}}
        >
          <img
            src={`${BASE_URL}${item.product.image}`}
            alt='Product Image'
            className='img-fluid'
            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }}
          />
          <div className='mms-3 flex-grow-1' style={{ marginLeft: '7px' }}>
            <h5 className='mb-1'>{item.product.name}</h5>
            <p className='mb-0 text-muted'>₹{item.product.price}</p>
          </div>
          <div className='d-flex align-items-center'>
            <input
               type='number'
               min="1"
               className='form-control me-1'
               value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
               style={{ width: '60px' }}
            />
            <button className='btn btn-sm mx-1'
            onClick={updateCartItem} 
            style={{backgroundColor: "#4b3bcb", color: "white"}} disabled={loading} >
              {loading ? "Updating": "Update"}
            </button>
            <button className='btn btn-danger btn-sm' onClick={deleteCartitem}>Remove</button>
          </div>
        </div>
    </div>
  )
}

export default CartItem