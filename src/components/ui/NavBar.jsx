import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import styles from './NavBar.module.css';
import NavBarLink from "./NavBarLink";
import pic from "../../assets/shopcart.png";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import api from "../../api";

const NavBar = ({ numCartItems }) => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  const searchRef = useRef(null);  // Create a ref for the search input area
  
  const fetchData = (value) => {
    api.get('products')
      .then(res => {
        const results = res.data.filter((user) => {
          return (
            value &&
            user &&
            user.name && 
            user.name.toLowerCase().startsWith(value.toLowerCase())
          );
        });
        setResults(results);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
    setDropdownVisible(true);  // Show dropdown when typing
  };

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setDropdownVisible(false);  // Close dropdown if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);  // Listen for clicks outside
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);  // Clean up on component unmount
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2 ${styles.stickyNavbar}`}>
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <img src={pic} style={{ width: '46px' }} alt="Logo" />
        </Link>
      
        {/* Toggle Button for Small Screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navigation Links and Cart */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          
          {/* Search Bar */}
          <div className="d-flex flex-grow-1 justify-content-center position-relative" ref={searchRef}>
            <div className="input-group" style={{ maxWidth: '400px', width: '100%' }}>
              <input
                type="text"
                id="searchInput"
                placeholder="Search..."
                className="form-control"
                aria-label="Search"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
              />
              <button className="btn btn-dark" aria-label="Search button">
                <FaSearch />
              </button>
            </div>
            {/* Dropdown List */}
            {dropdownVisible && (
              <ul className={`${styles.searchDropdown}`}>
                {results.map((result, id) => (
                  <Link style={{ textDecoration: 'none' }} to={`/products/${result.slug}`} key={id}>
                    <li>{result.name}</li>
                  </Link>
                ))}
              </ul>
            )}
          </div>

          <NavBarLink />
          <Link
            to="/cart"
            style={{ backgroundColor: 'black', color: 'white' }}
            className={`btn ms-3 rounded-pill position-relative ${styles.responsiveCart}`}
          >
            <FaCartShopping />
            {numCartItems > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                style={{ fontSize: '0.85rem', padding: '0.5em 0.65em', backgroundColor: '#6050DC' }}
              >
                {numCartItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
