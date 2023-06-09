import PropTypes from "prop-types";
import React from "react";
import Swiper from "react-id-swiper";
import SectionTitleSeven from "../../components/section-title/SectionTitleSeven";
import ProductGridNine from "./ProductGridNine";

const ProductSliderFour = ({ spaceBottomClass, category }) => {
  const settings = {
    loop: false,
    slidesPerView: 4,
    grabCursor: true,
    breakpoints: {
      1024: {
        slidesPerView: 4
      },
      768: {
        slidesPerView: 3
      },
      640: {
        slidesPerView: 2
      },
      320: {
        slidesPerView: 1
      }
    }
  };

  return (
    <div
      className={`related-product-area ${spaceBottomClass ? spaceBottomClass : ""
        }`}
    >
      <div className="container">
        <SectionTitleSeven
          titleText="Sản phẩm mới"
          subtitleText="Một số sản phẩm mới do công ty chúng tôi nghiên cứu quý khách có thể tham khảo."
          spaceClass="mb-55"
          borderClass="no-border"
          positionClass="text-center"
        />
        <div className="row">
          <Swiper {...settings}>
            <ProductGridNine
              // category={category}
              limit={6}
              sliderClassName="swiper-slide"
              type="new"
            />
          </Swiper>
        </div>
      </div>
    </div>
  );
};

ProductSliderFour.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default ProductSliderFour;
