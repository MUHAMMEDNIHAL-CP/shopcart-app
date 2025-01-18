import { useEffect, useState } from 'react';
import api from '../../api';
import UserInfo from './UserInfo';
import OrderHistoryItemContainer from './OrderHistoryItemContainer';
import Spinner from '../ui/Spinner';

const UserProfilePage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [orderitems, setOrderitems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get("user_info/")
      .then(response => {
        console.log(response.data);  // To debug the API response
        setUserInfo(response.data);  // User info remains the same
        setOrderitems(response.data.items || []);  // Set order items properly
        setLoading(false);
      })
      .catch(error => {
        console.log(error.message);
        setError("Failed to load order history");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <div className="container" style={{ marginTop: '90px', marginBottom: '50px' }}>
      <UserInfo userInfo={userInfo} />
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <OrderHistoryItemContainer orderitems={orderitems} />
    </div>
  );
};

export default UserProfilePage;
