import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Contact Us</h1>
        <p className="text-slate-600">Have questions or want to collaborate? We'd love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Get in Touch</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-sky-100 p-3 rounded-lg text-sky-600">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Email</p>
                  <p className="text-slate-600">hello@samudraseva.org</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-sky-100 p-3 rounded-lg text-sky-600">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Phone</p>
                  <p className="text-slate-600">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-sky-100 p-3 rounded-lg text-sky-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Address</p>
                  <p className="text-slate-600">Marine Drive, Mumbai, Maharashtra 400020</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-sky-600 p-8 rounded-2xl shadow-lg text-white">
            <h3 className="text-xl font-bold mb-4">Want to organize a drive?</h3>
            <p className="text-sky-100 mb-6">If you are an NGO or a community group looking to organize a cleanup, reach out to us for platform support.</p>
            <button className="bg-white text-sky-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-sky-50 transition-colors">
              Partner with Us
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-12 text-center">
              <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-emerald-900 mb-2">Message Sent!</h3>
              <p className="text-emerald-700 mb-8">Thank you for reaching out. Our team will get back to you shortly.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-emerald-700 font-bold underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
                  placeholder="Inquiry about cleanup drives"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none resize-none"
                  placeholder="Tell us more about your inquiry..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-sky-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-sky-700 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="h-5 w-5" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
