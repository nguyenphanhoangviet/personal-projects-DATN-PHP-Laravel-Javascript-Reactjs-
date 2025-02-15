import React, { forwardRef} from 'react';

const SliderArena = forwardRef(({ item }, ref) => {

  return (     
        <div
          className="single-hero-slider single-animation-wrap slider-height-1 custom-d-flex custom-align-item-end bg-img"
          style={{ backgroundImage: `url(${item.image_path})` }}
        >
        </div>
  );
});

export default SliderArena;