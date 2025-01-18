import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
            <footer className="py-3" style={{ backgroundColor: '#6050DC', color: 'white' }}>
                <div className="container text-center">
                    <div className='mb-2'>
                        <a href="/" className="text-white text-decoration-none mx-3">Home</a>
                        <a href="/" className="text-white text-decoration-none mx-3">About</a>
                        <a href="/#shop" className="text-white text-decoration-none mx-3">Shop</a>
                        <a href="#" className="text-white text-decoration-none mx-3">Contact</a>
                    </div>
                    <div className='mb-2'>
                        <a href="https://www.linkedin.com/in/muhammed-nihal-cp/" className="text-white mx-3"><FaLinkedin /></a>
                        <a href="https://github.com/MUHAMMEDNIHAL-CP" className="text-white mx-3"><FaGithub /></a>
                        <a href="https://www.instagram.com/muhdnihhal/" className="text-white mx-3"><FaInstagram /></a>
                    </div>
                    <p className='small mb-0'>© 2024 Shopping. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;