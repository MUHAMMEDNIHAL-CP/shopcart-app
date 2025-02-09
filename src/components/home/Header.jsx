import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "./Header.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const banners = [
  {
    image: "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/766ea612e03ff01d.jpg?q=20", // Replace with your image URL
  },
  {
    image: "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/3f976ca32ddc651e.jpg?q=20",
  },
  {
    image: "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/c928b14a5cddaf18.jpg?q=20",
  },
];

const Header = () => {
  return (
    <div className="banner-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="swiper-container"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <a to="/#shop"> 
            <div className="banner">
              <img src={banner.image} className="banner-image" />
            </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Header;
