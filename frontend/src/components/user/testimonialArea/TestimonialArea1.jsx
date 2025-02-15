import React from 'react';

export default function TestimonialArea1({ title, content, name, position }) {
  return (
    <div className="testimonial-plr-1">
      <div className="single-testimonial">
        <h4>{title}</h4>
        <p>{content}</p>
        <div className="client-info">
          <h5>{name}</h5>
          <span>{position}</span>
        </div>
      </div>
    </div>
  );
}
