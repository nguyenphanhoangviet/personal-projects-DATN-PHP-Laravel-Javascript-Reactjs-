import React from "react";
import { useLocation } from 'react-router-dom'; // Thêm import useLocation
import useSlick from '../../../hooks/user/slick';
import TestimonialArea1 from "./TestimonialArea1";
import TestimonialTitle1 from "./TestimonialTitle1";
import TestimonialTitle2 from "./TestimonialTitle2";

export default function Index() {
  const { testimonialArea1, testimonialArea2 } = useSlick();
  const location = useLocation(); 

  const testimonials = [
    {
      title: "Chất lượng tuyệt vời!",
      content: "Đây là một thiết kế tuyệt vời và tôi hy vọng rằng chúng tôi sẽ tạo ra một trang web với dấu ấn tốt. Đội ngũ ThemeMove rất nhanh nhẹn và thân thiện. Cảm ơn sự hỗ trợ cho đến giờ.",
      name: "Luke Olfert",
      position: "/ Nhà phát triển web, Canada"
    },
    {
      title: "Làm việc chuyên nghiệp!",
      content: "Đội ngũ ThemeMove không chỉ nhanh nhẹn mà còn rất tận tâm trong công việc. Họ luôn sẵn sàng lắng nghe và điều chỉnh, tạo cảm giác như làm việc với những người bạn đáng tin cậy.",
      name: "Anna Lee",
      position: "/ Giám đốc Marketing, Mỹ"
    },
    {
      title: "Tạo dấu ấn mạnh mẽ!",
      content: "Dự án này sẽ không thể thành công nếu thiếu đi sự hỗ trợ của đội ngũ ThemeMove. Sự sáng tạo, tốc độ trong công việc của họ đã giúp chúng tôi tạo ra một trang web thật sự ấn tượng.",
      name: "John Doe",
      position: "/ CEO, Anh"
    },
    // Thêm các testimonial khác nếu cần
  ];
  

  let TestimonialTitle;
  let TestimonialClass;
  let TestimonialArea;
  let TestimonialSlider
  let TestimonialContainer;
  switch (location.pathname) {
    case '/':
      TestimonialTitle = TestimonialTitle1
      TestimonialArea = testimonialArea1
      TestimonialContainer = 'custom-container';
      TestimonialClass = 'testimonial-area pt-65 pb-75';
      TestimonialSlider = 'testimonial-active-1 wow tmFadeInUp nav-style-2 nav-style-2-modify-1';

      break;
    case '/about':
      TestimonialTitle = TestimonialTitle2; 
      TestimonialArea = testimonialArea2;
      TestimonialContainer = 'container';
      TestimonialClass = 'testimonial-area pt-65 pb-65'; 
      TestimonialSlider = 'testimonial-active-3 nav-style-2-modify-1 dot-style-1 dot-style-1-center dot-style-1-mt1 wow tmFadeInUp';
      break;
    default:
      TestimonialTitle = TestimonialTitle1; 
      TestimonialArea = testimonialArea1;
      TestimonialContainer = 'custom-container';
      TestimonialClass = 'testimonial-area pt-65 pb-75';
      TestimonialSlider = 'testimonial-active-1 wow tmFadeInUp nav-style-2 nav-style-2-modify-1';
      break;
  }

  return (
    <div className={TestimonialClass}>
      <div className={TestimonialContainer}>
        <TestimonialTitle />
        <div ref={TestimonialArea} className={TestimonialSlider}>
        {testimonials.map((testimonial, index) => (
            <TestimonialArea1 
              key={index} 
              title={testimonial.title} 
              content={testimonial.content} 
              name={testimonial.name} 
              position={testimonial.position}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
