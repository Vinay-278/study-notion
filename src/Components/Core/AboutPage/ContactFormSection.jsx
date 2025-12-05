import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className="mx-auto">
      <div className="text-center text-4xl font-semibold text-white">Get in Touch</div>
      <p className="text-center text-[#838894] mt-3">
        We&apos;d love to hear form you. Please fill out this form .
      </p>
      <ContactUsForm />
    </div>
  );
}

export default ContactFormSection
