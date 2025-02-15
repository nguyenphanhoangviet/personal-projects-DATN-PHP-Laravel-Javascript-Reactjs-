import React, { useState } from 'react';
import axios from 'axios';

export default function ContactMap() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    title: '',
    message: ''
  });

  const [errors, setErrors] = useState({}); // State to store validation errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    try {
      const response = await axios.post('/api/contacts', formData);
      alert(response.data.message);
      setFormData({
        name: '',
        email: '',
        phone: '',
        title: '',
        message: ''
      });
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Set validation errors from response
        setErrors(error.response.data.errors);
      } else {
        alert('There was an error submitting the contact form.');
      }
    }
  };

  return (
    <div className="row">
      <div className="col-xl-8 col-lg-10 ml-auto mr-auto">
        <div className="contact-from-area padding-20-row-col wow tmFadeInUp">
          <h3>Hãy hỏi chúng tôi bất cứ điều gì ở đây</h3>
          <form className="contact-form-style text-center" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="input-style mb-20">
                  <input
                    name="name"
                    placeholder="Tên"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && <p className="text-danger">{errors.name[0]}</p>}
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="input-style mb-20">
                  <input
                    name="email"
                    placeholder="Email của bạn"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <p className="text-danger">{errors.email[0]}</p>}
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="input-style mb-20">
                  <input
                    name="phone"
                    placeholder="Số điện thoại của bạn"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  {errors.phone && <p className="text-danger">{errors.phone[0]}</p>}
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="input-style mb-20">
                  <input
                    name="title"
                    placeholder="Chủ đề"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                  {errors.title && <p className="text-danger">{errors.title[0]}</p>}
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="textarea-style mb-30">
                  <textarea
                    name="message"
                    placeholder="Tin nhắn"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  {errors.message && <p className="text-danger">{errors.message[0]}</p>}
                </div>
                <button className="submit submit-auto-width" type="submit">
                  Gửi tin nhắn
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
