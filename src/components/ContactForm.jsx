import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Contactez-nous</h2>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-6">
            {/* Nom */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Nom :
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-md focus:border-spero focus:ring-1 focus:ring-spero"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Adresse email :
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:border-spero focus:ring-1 focus:ring-spero"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="message">
                Message :
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md focus:border-spero focus:ring-1 focus:ring-spero"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            {/* Bouton Envoyer */}
            <button
              type="submit"
              className="w-full bg-spero text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors shadow-md"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;