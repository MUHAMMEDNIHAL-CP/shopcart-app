import { BASE_URL } from "../../api"
import styles from "./OrderHistoryItem.module.css"
import { FormatDate } from "../../FormatDate"

const OrderHistoryItem = ({items}) => {
    return (
        <div className='card-body'>
            <div className={`order-item mb-3 ${styles.orderItem}`}>
                <div className='row'>
                    <div className='col-md-2'>
                        <img
                            src={`${BASE_URL}${items.product.image}`}
                            alt='Order Item'
                            className='img-fluid'
                            style={{ borderRadius: '5px' }}
                        />
                    </div>
                    <div className='col-md-6'>
                        <h6>{items.product.name}</h6>
                        <p>{`Order Date: ${FormatDate(items.order_date)}`}</p>
                        <p>{`Order ID: ${items.order_id}`}</p>
                    </div>
                    <div className='col-md-2 text-center'>
                        <h6 className='text-muted'>{`Quantity: ${items.quantity}`}</h6>
                    </div>
                    <div className='col-md-2 text-center'>
                        <h6 className='text-muted'>${items.product.price}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderHistoryItem