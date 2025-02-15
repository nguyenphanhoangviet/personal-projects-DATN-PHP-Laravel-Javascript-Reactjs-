import React from "react";
import SectionTitle from "./SectionTitle";
import SingleContactInfo from "./SingleContactInfo";
import ContactMap from "./ContactMap";
import ContactForm from "./ContactForm";
import "./style.scss";

export default function Index() {
  return (
    <div className="contact-us-area pt-65 pb-55">
      <div className="container">
        <SectionTitle />
        <SingleContactInfo />
        <ContactMap />
        <ContactForm />
      </div>
    </div>
  );
}
