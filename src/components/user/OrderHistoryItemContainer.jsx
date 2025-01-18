import React from 'react';
import OrderHistoryItem from './OrderHistoryItem';

const OrderHistoryItemContainer = ({ orderitems }) => {
  return (
    <div className="row" style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <div className="col-md-12">
        <div className="card">
          <div
            className="card-header"
            style={{ backgroundColor: '#6050DC', color: 'white' }}
          >
            <h5>Order History</h5>
          </div>

          {Array.isArray(orderitems) && orderitems.length > 0 ? (
            orderitems.map((items) => (
              <OrderHistoryItem key={items.id} items={items} />
            ))
          ) : (
            <div>No order history available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItemContainer;
