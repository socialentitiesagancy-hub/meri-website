import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Send, ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    service: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // FormSubmit endpoint for socialentitiesagancy@gmail.com
    const formEndpoint = 'https://formsubmit.co/ajax/socialentitiesagancy@gmail.com';
    const emailSubject = formData.service.trim() || 'General Service Inquiry';
    const userEmail = formData.email.trim();
    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
    const userMessage = formData.message.trim();

    try {
      // Direct POST to FormSubmit with exact requested parameters
      await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: emailSubject, // Service of interest as subject
          _template: 'box', // Clean boxed layout without default table intro
          'Service Requested': emailSubject,
          'Sender Name': fullName,
          'Sender Email': userEmail,
          Message: userMessage,
          _replyto: userEmail, // Direct reply to user
          _captcha: 'false',
        }),
      });

      setIsSubmitting(false);
      setSubmitted(true);
    } catch {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full bg-white min-h-[75vh] py-10 sm:py-16 font-sans select-none animate-in fade-in duration-300">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200/60">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#5B6A50] hover:text-[#4e5c44] font-semibold text-[14px] sm:text-[15px] bg-white border border-stone-200 px-4 py-2 rounded-full shadow-2xs hover:shadow-xs transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-[13px] text-stone-500 font-medium">
            <Link to="/" className="hover:text-[#5B6A50] flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="text-[#5B6A50] font-semibold">Contact Us</span>
          </div>
        </div>

        {/* Header Title */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-[#5B6A50] font-bold text-[12px] sm:text-[14px] uppercase tracking-[0.25em] mb-2 block">
            CONTACT US
          </span>
          <h1 className="text-[36px] sm:text-[50px] lg:text-[56px] font-black text-[#0F1A34] tracking-tight leading-tight">
            Get in Touch
          </h1>
        </div>

        {/* Main Grid: Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Copy & Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-start pr-0 lg:pr-4">
            <h2 className="text-[#0F1A34] font-black text-[28px] sm:text-[36px] leading-[1.2] mb-4 tracking-tight">
              Let’s start a conversation.
            </h2>
            <p className="text-[#334155] font-medium text-[15px] sm:text-[17px] leading-[1.6] mb-8 sm:mb-10">
              Whether you have a specific project in mind or just want to explore possibilities, we’d love to hear from you. Fill out the form and our team will get back to you within 24 hours.
            </p>

            {/* Contact Details Stack */}
            <div className="space-y-6">
              {/* Email Us */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-[#5B6A50]/10 text-[#5B6A50] flex items-center justify-center shrink-0 group-hover:bg-[#5B6A50] group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-[#0F1A34] font-bold text-[16px]">Email Us</h4>
                  <a
                    href="mailto:socialentitiesagancy@gmail.com"
                    className="text-[#475569] font-medium text-[15px] hover:text-[#5B6A50] transition-colors"
                  >
                    socialentitiesagancy@gmail.com
                  </a>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-[#5B6A50]/10 text-[#5B6A50] flex items-center justify-center shrink-0 group-hover:bg-[#5B6A50] group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-[#0F1A34] font-bold text-[16px]">Call Us</h4>
                  <a
                    href="tel:+923024482639"
                    className="text-[#475569] font-medium text-[15px] hover:text-[#5B6A50] transition-colors"
                  >
                    +92 302 4482639
                  </a>
                </div>
              </div>

              {/* Visit Us */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-[#5B6A50]/10 text-[#5B6A50] flex items-center justify-center shrink-0 group-hover:bg-[#5B6A50] group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-[#0F1A34] font-bold text-[16px]">Visit Us</h4>
                  <p className="text-[#475569] font-medium text-[15px] leading-snug max-w-xs">
                    50-N Gurumangat Rd, Block N<br />
                    Gulberg 2, Lahore, Punjab, Pakistan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-900/5 p-6 sm:p-10">
              {submitted ? (
                <div className="py-10 flex flex-col items-center text-center animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#5B6A50]/15 text-[#5B6A50] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                  </div>
                  <h3 className="text-[#0F1A34] font-extrabold text-[24px] sm:text-[28px] mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-[#475569] font-medium text-[15px] sm:text-[16px] max-w-md mb-6">
                    Thank you for reaching out. Our team has received your inquiry and will get back to you shortly.
                  </p>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ firstName: '', lastName: '', email: '', service: '', message: '' });
                    }}
                    className="bg-[#5B6A50] hover:bg-[#4e5c44] text-white px-7 py-3 rounded-full font-bold text-[15px] transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[#0F1A34] font-bold text-[14px] mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="w-full bg-[#f8fafc] border border-stone-200 rounded-xl px-4 py-3 text-[15px] text-[#0F1A34] placeholder-stone-400 focus:outline-none focus:border-[#5B6A50] focus:ring-2 focus:ring-[#5B6A50]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[#0F1A34] font-bold text-[14px] mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="w-full bg-[#f8fafc] border border-stone-200 rounded-xl px-4 py-3 text-[15px] text-[#0F1A34] placeholder-stone-400 focus:outline-none focus:border-[#5B6A50] focus:ring-2 focus:ring-[#5B6A50]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-[#0F1A34] font-bold text-[14px] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-[#f8fafc] border border-stone-200 rounded-xl px-4 py-3 text-[15px] text-[#0F1A34] placeholder-stone-400 focus:outline-none focus:border-[#5B6A50] focus:ring-2 focus:ring-[#5B6A50]/20 transition-all"
                    />
                  </div>

                  {/* Service of Interest */}
                  <div>
                    <label className="block text-[#0F1A34] font-bold text-[14px] mb-2">
                      Service of Interest
                    </label>
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-[#f8fafc] border border-stone-200 rounded-xl px-4 py-3 text-[15px] text-[#0F1A34] focus:outline-none focus:border-[#5B6A50] focus:ring-2 focus:ring-[#5B6A50]/20 transition-all cursor-pointer"
                    >
                      <option value="">Select a service...</option>
                      <option value="Marketing Consultation">Marketing Consultation</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
                      <option value="Content Creation & Strategy">Content Creation & Strategy</option>
                      <option value="E-Commerce Solutions">E-Commerce Solutions</option>
                      <option value="IT & Development Solutions">IT & Development Solutions</option>
                      <option value="Branding & Creative Studio">Branding & Creative Studio</option>
                      <option value="Media & Video Production">Media & Video Production</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[#0F1A34] font-bold text-[14px] mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      className="w-full bg-[#f8fafc] border border-stone-200 rounded-xl px-4 py-3 text-[15px] text-[#0F1A34] placeholder-stone-400 focus:outline-none focus:border-[#5B6A50] focus:ring-2 focus:ring-[#5B6A50]/20 transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#5B6A50] hover:bg-[#4e5c44] active:scale-[0.99] text-white font-bold py-3.5 sm:py-4 rounded-xl text-[16px] tracking-wide shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer mt-2"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

