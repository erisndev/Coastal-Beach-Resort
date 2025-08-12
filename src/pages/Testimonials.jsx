import React from "react";
import { Star, Award, Shield, Zap, Mountain } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      rating: 8.0,
      title: "Great location. We upgraded to the presidential suite.",
      content: "The place is well maintained. Staff a friendly and helpful",
      author: "Ishan",
      location: "South Africa",
      date: "12 August 2025",
      avatar: "I",
    },
    {
      rating: 9.0,
      title: "From the second we arrived, it felt completely at ease.",
      content:
        "Our host treatment case perfect and the perfect oasis for our romantic retreat.",
      author: "Nonhlanhla",
      location: "South Africa",
      date: "1 June 2025",
      avatar: "N",
    },
    {
      rating: 7.0,
      title: "The design experience was superb, well fresh local ingredients.",
      content:
        "Executive breakfast the attention was well mentioned, comfortable and functional and perfect retreat.",
      author: "Richard",
      location: "South Africa",
      date: "3 January 2025",
      avatar: "R",
    },
    {
      rating: 8.0,
      title:
        "Excellent service and outstanding hospitality in the city center.",
      content:
        "We loved our enthusiastic service, from the warm welcome to the outstanding service and clean.",
      author: "Marera",
      location: "South Africa",
      date: "2 January 2025",
      avatar: "M",
    },
    {
      rating: 9.0,
      title:
        "The attention to detail and excellent service, it felt like home.",
      content:
        "Exceeded our expectations, and our view service by far. This is a perfect escape from home.",
      author: "Sifiso",
      location: "South Africa",
      date: "29 December 2024",
      avatar: "S",
    },
    {
      rating: 7.0,
      title: "Perfect service and cleanliness throughout the stay.",
      content:
        "The view amazing. The toasted sandwiches really good. The Aircon was much appreciated.",
      author: "Simpson",
      location: "South Africa",
      date: "29 December 2024",
      avatar: "S",
    },
  ];

  const awards = [
    {
      icon: <Award className="w-12 h-12 text-gray-600" />,
      text: "Excellence Award",
    },
    {
      icon: <Shield className="w-12 h-12 text-gray-600" />,
      text: "Trusted Partner",
    },
    { icon: <Zap className="w-12 h-12 text-gray-600" />, text: "Best Service" },
    {
      icon: <Mountain className="w-12 h-12 text-gray-600" />,
      text: "Premium Location",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hear From Our Cherished Guests
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what makes us special through the voices of our guests. Our
            guests continue to share stories about the unforgettable moments and
            lasting.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="bg-amber-600 text-white px-3 py-1 rounded-lg font-bold">
                  {Number(testimonial.rating).toFixed(1)}
                </div>
              </div>

              <blockquote className="text-gray-700 mb-4">
                "{testimonial.title}"
              </blockquote>

              <p className="text-gray-600 text-sm mb-4">
                {testimonial.content}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {testimonial.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Awards Section */}
        <div className="bg-white rounded-2xl shadow-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Recognized for Excellence
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {awards.map((award, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {award.icon}
                </div>
                <p className="text-gray-600 font-medium">{award.text}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 mt-8 text-sm">
            Proudly acknowledged for our commitment to exceptional service and
            sustainable luxury
          </p>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-800 rounded-2xl shadow-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Experience Serenity For Yourself
          </h2>
          <p className="text-amber-100 mb-8 text-lg max-w-2xl mx-auto">
            Inspired by our guests' stories? Plan your own unforgettable escape
            at our award-winning resort.
          </p>
          <button className="bg-white cursor-pointer text-amber-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg">
            Book Your Stay
          </button>
        </div>
      </div>
    </div>
  );
};
