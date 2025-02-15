import { useEffect, useRef } from "react";
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel";

const useSlick = () => {
  const slider = useRef(null);
  const productArena1 = useRef(null);
  const categoriesArena1 = useRef(null);
  const testimonialArea1 = useRef(null);
  const testimonialArea2 = useRef(null);
  const proDecBigImgSlider = useRef(null);
  const proDecSmallImgSlider = useRef(null);
  const IngPopup = useRef(null);

  useEffect(() => {
    if (slider.current) {
      $(slider.current).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        infinite: true,
        dots: false,
        arrows: true,
        prevArrow:
          '<span class="slider-icon-1-prev"><i class="far fa-chevron-left"></i></span>',
        nextArrow:
          '<span class="slider-icon-1-next"><i class="far fa-chevron-right"></i></span>',
      });
    }

    if (productArena1.current) {
      $(productArena1.current).slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        fade: false,
        infinite: true,
        dots: false,
        arrows: true,
        prevArrow:
          '<span class="pro-icon-1-prev"><i class="far fa-angle-left"></i></span>',
        nextArrow:
          '<span class="pro-icon-1-next"><i class="far fa-angle-right"></i></span>',
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    }

    if (categoriesArena1.current) {
      $(categoriesArena1.current).slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        fade: false,
        loop: true,
        dots: false,
        arrows: false,
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    }

    if (testimonialArea1.current) {
      $(testimonialArea1.current).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        fade: false,
        loop: true,
        dots: false,
        arrows: true,
        prevArrow:
          '<span class="pro-icon-1-prev"><i class="far fa-angle-left"></i></span>',
        nextArrow:
          '<span class="pro-icon-1-next"><i class="far fa-angle-right"></i></span>',
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    }

    if (testimonialArea2.current) {
      $(testimonialArea2.current).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        fade: false,
        loop: true,
        dots: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    }
    if (proDecBigImgSlider.current) {
      $(proDecBigImgSlider.current).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: false,
        fade: false,
        asNavFor: ".product-dec-slider-small , .product-dec-slider-small-2",
      });
    }
    if (proDecSmallImgSlider.current) {
      $(proDecSmallImgSlider.current).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: ".pro-dec-big-img-slider",
        dots: false,
        focusOnSelect: true,
        fade: false,
        arrows: false,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 2,
            },
          },
        ],
      });
    }

    return () => {
      if (slider.current) {
        $(slider.current).slick("unslick");
      }

      if (productArena1.current) {
        $(productArena1.current).slick("unslick");
      }
      if (categoriesArena1.current) {
        $(categoriesArena1.current).slick("unslick");
      }
      if (testimonialArea1.current) {
        $(testimonialArea1.current).slick("unslick");
      }
      if (testimonialArea2.current) {
        $(testimonialArea2.current).slick("unslick");
      }
      if (proDecBigImgSlider.current) {
        $(proDecBigImgSlider.current).slick("unslick");
      }
      if (proDecSmallImgSlider.current) {
        $(proDecSmallImgSlider.current).slick("unslick");
      }
    };
  }, []);

  return {
    slider,
    productArena1,
    categoriesArena1,
    testimonialArea1,
    testimonialArea2,
    proDecBigImgSlider,
    proDecSmallImgSlider,
  };
};

export default useSlick;
