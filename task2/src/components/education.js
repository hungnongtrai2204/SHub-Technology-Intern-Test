import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

import { Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"; // Import the icons you want to use

export default function Education() {
  const swiperRef = useRef(null);

  const data = [
    "https://shub.edu.vn/images/landing/ver3/image-section/carousel1.png",
    "https://shub.edu.vn/images/landing/ver3/image-section/carousel2.png",
    "https://shub.edu.vn/images/landing/ver3/image-section/carousel3.png",
    "https://shub.edu.vn/images/landing/ver3/image-section/carousel4.png",
    "https://shub.edu.vn/images/landing/ver3/image-section/carousel5.png",
    "https://shub.edu.vn/images/landing/ver3/image-section/carousel6.png",
  ];

  const duplicatedData = [...data, ...data, ...data];
  // const duplicatedData = [...data];

  const goNext = () => {
    if (swiperRef.current !== null) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current !== null) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="container">
      <div className="title">
        <div className="icon">
          <img src="https://shub.edu.vn/_next/image?url=%2Fimages%2Flanding%2Fver3%2Fimage-section%2Fnetworking.gif&w=64&q=75" />
        </div>
        <div className="content-1">
          Hoạt động tiêu biểu từ cộng đồng giáo dục
        </div>
        <div className="content-2">
          Hình ảnh được chính những giáo viên từ khắp 3 miền ghi lại trong quá
          trình giảng dạy, dạy học ứng dụng công nghệ SHub Classroom.
        </div>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        className="mySwiper"
        loop={true}
        navigation={true}
        modules={[Navigation]}
        ref={swiperRef}
        breakpoints={{
          400: {
            spaceBetween: 5,
            slidesPerView: 2,
          },
          800: {
            spaceBetween: 10,
            slidesPerView: 4,
          },
          900: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }}
      >
        {duplicatedData.map((item, index) => (
          <SwiperSlide
            key={index}
            style={index % 2 === 0 ? { top: "30px" } : {}}
          >
            <img src={item} />
          </SwiperSlide>
        ))}
        <div class="swiper-button-next" onClick={goNext}>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
        <div class="swiper-button-prev" onClick={goPrev}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
      </Swiper>
    </div>
  );
}
