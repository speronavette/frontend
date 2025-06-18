import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, Shield, Users, Star } from 'lucide-react';
import SEO from "../../components/SEO";
import BookingFormEN from "../../components/BookingFormEN";

// Structured data for SEO optimization
const structuredData = {
  "@context": "https://schema.org",
  "@type": "TransportationService",
  "name": "SPERO NAVETTE - Charleroi Airport Shuttle",
  "url": "https://www.spero-navette.be/en/charleroi-airport-shuttle",
  "image": "https://www.spero-navette.be/images/logo.jpg",
  "description": "Private door-to-door shuttle service from Charleroi Airport to Brussels, Bruges, Ghent, and all destinations in Belgium. Fixed prices, English-speaking drivers, 24/7 service.",
  "telephone": "+32490197914",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BE"
  },
  "areaServed": ["Brussels", "Bruges", "Ghent", "Antwerp", "Liège", "Namur", "Dinant", "Belgium"],
  "serviceType": ["Airport Shuttle", "Private Transfer", "Door-to-door Transport"]
};

// FAQ data for SEO
const shuttleFAQData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I get from Charleroi Airport to Brussels?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The easiest way to get from Charleroi Airport to Brussels is with our private door-to-door shuttle service. We'll pick you up directly at the airport and take you to your exact destination in Brussels, with no stops or transfers. Fixed price, no waiting for other passengers, and available 24/7."
      }
    },
    {
      "@type": "Question",
      "name": "How much is a shuttle from Charleroi Airport to Bruges?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A private shuttle from Charleroi Airport to Bruges costs between €160-€240 depending on the number of passengers. This is a fixed price with no hidden fees, including luggage space and door-to-door service."
      }
    },
    {
      "@type": "Question",
      "name": "Is the shuttle private or shared?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer private shuttle services, meaning the vehicle is exclusively for you and your group. This ensures a direct journey without stops for other passengers, maximum comfort, and the fastest possible travel time."
      }
    },
    {
      "@type": "Question",
      "name": "Can I book in advance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we recommend booking at least 48 hours in advance to ensure availability. For last-minute bookings (less than 24 hours), please call us directly at +32 490 19 79 14 to check if we can accommodate your request."
      }
    }
  ]
};

const destinations = [
  { id: 'brussels', name: 'Brussels', price1: '110€', price4: '110€', price8: '130€', travelTime: '50-60 min' },
  { id: 'bruges', name: 'Bruges', price1: '190€', price4: '190€', price8: '210€', travelTime: '1h 40min' },
  { id: 'ghent', name: 'Ghent', price1: '140€', price4: '140€', price8: '160€', travelTime: '1h 15min' },
  { id: 'antwerp', name: 'Antwerp', price1: '140€', price4: '140€', price8: '160€', travelTime: '1h 25min' },
  { id: 'liege', name: 'Liège', price1: '125€', price4: '125€', price8: '145€', travelTime: '1h 05min' },
  { id: 'namur', name: 'Namur', price1: '85€', price4: '85€', price8: '105€', travelTime: '35 min' },
  { id: 'dinant', name: 'Dinant', price1: '100€', price4: '100€', price8: '120€', travelTime: '50 min' },
  { id: 'durbuy', name: 'Durbuy', price1: '135€', price4: '135€', price8: '155€', travelTime: '1h 15min' },
  { id: 'spa', name: 'Spa', price1: '180€', price4: '180€', price8: '200€', travelTime: '1h 25min' },
  { id: 'bouillon', name: 'Bouillon', price1: '170€', price4: '170€', price8: '190€', travelTime: '1h 30min' },
  { id: 'malmedy', name: 'Hautes Fagnes (Malmedy)', price1: '200€', price4: '200€', price8: '220€', travelTime: '1h 45min' },
  { id: 'eupen', name: 'Hautes Fagnes (Eupen)', price1: '180€', price4: '180€', price8: '200€', travelTime: '1h 30min' },
  { id: 'other', name: 'Other destination - please contact us', price1: '', price4: '', price8: '', travelTime: '', isContactOption: true }
];

function CharleroiAirportShuttle() {
  return (
    <>
      <SEO
        title="Charleroi Airport Shuttle | Private Transfer to Brussels, Bruges, Ghent"
        description="Private door-to-door shuttle service from Charleroi Airport to anywhere in Belgium. Fixed price, English-speaking drivers, 24/7 service. ☎ +32 490 19 79 14"
        keywords="Charleroi airport shuttle, Brussels airport transfer, Charleroi to Brussels, airport taxi Belgium, private airport transfer"
        canonicalUrl="https://www.spero-navette.be/en/charleroi-airport-shuttle"
        isEnglish={true}>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(shuttleFAQData)}
        </script>
      </SEO>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex justify-end mb-4">
            <Link to="/" className="flex items-center text-gray-600 hover:text-spero">
              <span className="mr-2">🇫🇷</span>
              <span>Version française</span>
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold text-spero mb-4 text-center">
            Private Shuttle from Charleroi Airport to Brussels, Bruges, Ghent and all Belgium
          </h1>
          
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-gray-50 p-4 rounded-lg flex flex-col gap-2">
              <p className="flex items-center text-lg">
                <span className="mr-2">✈️</span>
                <span>Travel easily from Charleroi Airport to your destination in Belgium.</span>
              </p>
              <p className="flex items-center text-lg">
                <span className="mr-2">🚐</span>
                <span>Private, door-to-door shuttle — no waiting, no transfers, no stress.</span>
              </p>
              <p className="flex items-center text-lg">
                <span className="mr-2">💳</span>
                <span>Fixed price, easy online booking, driver waiting for you on arrival.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Destinations & Benefits */}
          <div className="lg:col-span-2 space-y-12">
            {/* Destinations */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-spero mb-6">
                Destinations We Serve
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {destinations.filter(d => !d.isContactOption).map(destination => (
                  <div key={destination.id} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">{destination.name}</span>
                      <span className="text-sm text-gray-500 ml-2">({destination.travelTime})</span>
                    </div>
                  </div>
                ))}
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Other destinations on request</span>
                </div>
              </div>
            </section>

            {/* Benefits */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-spero mb-6">
                Why Choose Us
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-spero/10 p-2 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-spero" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Door-to-door service</h3>
                    <p className="text-gray-600">Direct transfer from the airport to your exact destination</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-spero/10 p-2 rounded-full mr-4">
                    <Shield className="h-6 w-6 text-spero" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Fixed price</h3>
                    <p className="text-gray-600">No surprise fees, no hidden costs, price known in advance</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-spero/10 p-2 rounded-full mr-4">
                    <Users className="h-6 w-6 text-spero" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Comfortable vehicles</h3>
                    <p className="text-gray-600">Spacious cars with ample luggage space for all your bags</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-spero/10 p-2 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-spero" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Available 24/7</h3>
                    <p className="text-gray-600">Service available any time, day or night, for all flight schedules</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-spero/10 p-2 rounded-full mr-4">
                    <CheckCircle className="h-6 w-6 text-spero" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">English-speaking drivers</h3>
                    <p className="text-gray-600">Easy communication and helpful local knowledge</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-spero/10 p-2 rounded-full mr-4">
                    <Star className="h-6 w-6 text-spero" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Meet & Greet</h3>
                    <p className="text-gray-600">Driver waiting for you at arrivals with your name</p>
                  </div>
                </div>
              </div>
            </section>

            {/* About */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-spero mb-6">
                About SPERO NAVETTE
              </h2>
              
              <p className="text-gray-700 mb-4">
                SPERO NAVETTE has been providing professional airport shuttle services since 2010. Our experienced and punctual drivers are trusted by tourists and business travelers alike for reliable airport transfers throughout Belgium.
              </p>
              <p className="text-gray-700">
                We specialize in private airport transfers from Charleroi Airport to Brussels, Bruges, Ghent and other popular destinations in Belgium. Check our <a href="#reviews" className="text-spero hover:underline">Google reviews</a> to see why travelers choose us for their airport transportation needs.
              </p>
            </section>

            {/* FAQ */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-spero mb-6">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    How do I get from Charleroi Airport to Brussels?
                  </h3>
                  <p className="text-gray-700">
                    The easiest way to get from Charleroi Airport to Brussels is with our private door-to-door shuttle service. We'll pick you up directly at the airport and take you to your exact destination in Brussels, with no stops or transfers. Fixed price, no waiting for other passengers, and available 24/7.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    How much is a shuttle from Charleroi Airport to Bruges?
                  </h3>
                  <p className="text-gray-700">
                    A private shuttle from Charleroi Airport to Bruges costs between €160-€240 depending on the number of passengers. This is a fixed price with no hidden fees, including luggage space and door-to-door service. You can see the exact price by selecting your destination and passenger count in our booking form.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Is the shuttle private or shared?
                  </h3>
                  <p className="text-gray-700">
                    We offer private shuttle services, meaning the vehicle is exclusively for you and your group. This ensures a direct journey without stops for other passengers, maximum comfort, and the fastest possible travel time.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Can I book in advance?
                  </h3>
                  <p className="text-gray-700">
                    Yes, we recommend booking at least 48 hours in advance to ensure availability. For last-minute bookings (less than 24 hours), please call us directly at +32 490 19 79 14 to check if we can accommodate your request.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    How does payment work?
                  </h3>
                  <p className="text-gray-700">
                    You can pay securely online when booking with a credit card. We use Stripe for all payments, which pre-authorizes your card. The full amount is only charged after your transfer is completed, giving you peace of mind.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <BookingFormEN destinations={destinations} />
          </div>
        </div>

        {/* Testimonials */}
        <section id="reviews" className="mt-16 mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Perfect service! Driver was waiting for us at the airport even though our flight was delayed. Very comfortable vehicle and professional service. Will definitely use again."
              </p>
              <p className="font-medium">- Michael R. from London</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Great shuttle service from Charleroi to Bruges! The booking process was easy, the driver was very friendly and the journey was comfortable. Highly recommended for anyone traveling to Belgium."
              </p>
              <p className="font-medium">- Sarah J. from Barcelona</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "I used SPERO NAVETTE for a trip from Charleroi to Brussels and was very impressed. The driver was on time, helped with our luggage, and got us to our hotel quickly. The fixed price was fair and there were no surprises."
              </p>
              <p className="font-medium">- John T. from Dublin</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default CharleroiAirportShuttle;