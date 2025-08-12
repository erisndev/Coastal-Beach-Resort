import React, { useState } from "react";
import { Star, Award, Shield, Zap, Mountain, StarHalf } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Testimonials = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const testimonials = [
    {
      rating: 8.0,
      title: "Awesome",
      content:
        "It’s a walking distance to the beach. The staff is hands on and welcoming. No mirrors in the bathroom. Had to ask for kitchen equipment from reception in the morning.",
      author: "Noni",
      location: "South Africa",
      date: "1 April 2024",
      avatar: "N",
      room: "Standard Chalet",
      stay: "1 night · March 2024",
      groupType: "Group",
    },
    {
      rating: 7.0,
      title: "It was ok, except the small problems with water and electricity.",
      content:
        "The location of the lounge. The place was quiet and clean. The staff was also welcoming and friendly. Water and electricity blackouts.",
      author: "Tsotetsi",
      location: "South Africa",
      date: "18 March 2024",
      avatar: "T",
      room: "Standard Double Room",
      stay: "2 nights · March 2024",
      groupType: "Couple",
    },
    {
      rating: 8.0,
      title: "Wonderful.",
      content:
        "Our stay was very delightful. The area the property is in looks a bit dodgy and the road going to the property looks scary especially at night.",
      author: "Malehlohonolo",
      location: "South Africa",
      date: "19 January 2024",
      avatar: "M",
      room: "Standard Double Room",
      stay: "3 nights · December 2023",
      groupType: "Group",
    },
    {
      rating: 8.0,
      title: "Will return",
      content:
        "View, room, wifi, staff, facilities, decor. Room furnished well, air con a bonus. Tip: supply mozzie plugs to guests. Promised microwave, iron, cleaning and toiletries - none of the above. Wary of safety at night due to electric locking systems. Generator, alternate power not available. Streaming facilities listed not functioning and no one on site knew how to access.",
      author: "Linzilee",
      location: "South Africa",
      date: "5 January 2024",
      avatar: "L",
      room: "Standard Double Room",
      stay: "2 nights · January 2024",
      groupType: "Family",
    },
    {
      rating: 9.0,
      title: "Best Stay",
      content:
        "I like the fact that my room was upstairs and the sea view at the balcony was breathtaking. The pool area was amazing. The host was welcoming, staff very friendly. I am definitely going back December. Just a bit more activities. The only downfall was not having a microwave at the rooms.",
      author: "Nossy",
      location: "South Africa",
      date: "5 January 2024",
      avatar: "N",
      room: "Standard Double Room",
      stay: "3 nights · January 2024",
      groupType: "Couple",
    },
    {
      rating: 7.0,
      title: "Good",
      content:
        "We had free meals on New Year’s Eve, 1st of January there was an event and they offered us free lunch and dinner which was delicious. We booked a standard double with the balcony and sea view room online but they gave us something else downstairs which we didn’t book, after we complained the manager managed to make some arrangements to get us the rooms upstairs.",
      author: "Nontokozo",
      location: "South Africa",
      date: "3 January 2024",
      avatar: "N",
      room: "Standard Double Room",
      stay: "2 nights · January 2024",
      groupType: "Couple",
    },
    {
      rating: 7.0,
      title: "It was a good holiday except the double booking",
      content:
        "The view was good. The structure of the property. The double booking and inconvenience is a problem. The room had no kettle. A two sleeper room with 1 towel.",
      author: "Preyanka",
      location: "South Africa",
      date: "29 December 2023",
      avatar: "P",
      room: "Standard Double Room",
      stay: "2 nights · December 2023",
      groupType: "Couple",
    },
    {
      rating: 7.0,
      title: "Good",
      content:
        "There was no microwave, plates, as well as ironing board. We had to improvise.",
      author: "Moeti",
      location: "South Africa",
      date: "28 December 2023",
      avatar: "M",
      room: "Standard Double Room",
      stay: "2 nights · December 2023",
      groupType: "Couple",
    },
    {
      rating: 9.0,
      title: "Superb",
      content: "Beautiful complex. Amazing management team.",
      author: "Khosi",
      location: "South Africa",
      date: "27 December 2023",
      avatar: "K",
      room: "Standard Double Room",
      stay: "1 night · December 2023",
      groupType: "Family",
    },
    {
      rating: 9.0,
      title: "Thumbs up for Coastal beach resort",
      content:
        "I liked everything about the accommodation, it was relaxing and quiet with beautiful view. The staff was friendly especially Nondumiso, she was exceptional. She would come check in our rooms if everything was OK, we slept well, do we need anything for our room. And when she was off we could tell. Her customer service is the best. Only if they can at least provide cleaning materials like brooms for guests staying longer as they were not cleaning our rooms as we booked from Sunday to Wednesday.",
      author: "Nondumiso",
      location: "South Africa",
      date: "21 December 2023",
      avatar: "N",
      room: "Standard Double Room",
      stay: "3 nights · December 2023",
      groupType: "Family",
    },
  ];

  const awards = [
    {
      icon: <Award className="w-12 h-12 text-amber-600" />,
      text: "Excellence Award",
    },
    {
      icon: <Shield className="w-12 h-12 text-amber-600" />,
      text: "Trusted Partner",
    },
    {
      icon: <Zap className="w-12 h-12 text-amber-600" />,
      text: "Best Service",
    },
    {
      icon: <Mountain className="w-12 h-12 text-amber-600" />,
      text: "Premium Location",
    },
  ];

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 3, testimonials.length));
      setIsLoading(false);
    }, 500);
  };

  const allLoaded = visibleCount >= testimonials.length;

  // Hero background image
  const heroImage =
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&h=800&fit=crop";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Hero Section - Gallery Style */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="text-center z-10 px-4">
          <h1 className="text-6xl md:text-8xl font-extralight text-white mb-6 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_0.5s_forwards]">
            Guest
          </h1>
          <h1 className="text-6xl md:text-8xl font-light text-white mb-8 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_1s_forwards]">
            Stories
          </h1>
          <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed opacity-0 animate-[fadeInUp_1.5s_ease-out_1.5s_forwards]">
            Discover what makes us special through the voices of our cherished
            guests and their unforgettable moments.
          </p>
          <div className="w-24 h-px bg-white mx-auto mt-8 opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50"></div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Section */}
        <section className="py-20 border-b border-slate-200">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4 tracking-wide">
              Cherished Experiences
            </h2>
            <div className="w-16 h-px bg-amber-600 mx-auto mb-6"></div>
            <p className="text-slate-600 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Our guests continue to share stories about the unforgettable
              moments and lasting memories created at our coastal retreat.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, visibleCount).map((testimonial, index) => {
              const ratingOutOf5 = testimonial.rating / 2;
              return (
                <div
                  key={`${testimonial.author}-${testimonial.date}`}
                  className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white
          ${index >= visibleCount - 3 ? "fade-in-up" : ""}`}
                  style={{ animationDelay: `${(index % 3) * 100}ms` }}
                >
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-3 py-1 rounded-full font-medium text-sm shadow-lg">
                      {Number(testimonial.rating).toFixed(1)}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800 text-lg">
                          {testimonial.author}
                        </h4>
                        <p className="text-sm text-slate-500">
                          {testimonial.location}
                        </p>
                        {(testimonial.room ||
                          testimonial.stay ||
                          testimonial.groupType) && (
                          <p className="text-sm text-slate-400 italic">
                            {[
                              testimonial.room,
                              testimonial.stay,
                              testimonial.groupType,
                            ]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        )}
                      </div>
                    </div>

                    <blockquote className="text-slate-700 mb-4 text-lg font-light leading-relaxed">
                      "{testimonial.title}"
                    </blockquote>

                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {testimonial.content}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => {
                          if (i + 1 <= ratingOutOf5) {
                            return (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            );
                          } else if (i + 0.5 <= ratingOutOf5) {
                            return (
                              <StarHalf
                                key={i}
                                className="w-4 h-4 fill-current"
                              />
                            );
                          } else {
                            return (
                              <Star
                                key={i}
                                className="w-4 h-4 stroke-current"
                              />
                            );
                          }
                        })}
                      </div>
                      <span className="text-xs text-slate-500 font-light">
                        {testimonial.date}
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-amber-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {!allLoaded && (
            <div className="flex justify-center mt-16">
              <Button
                onClick={loadMore}
                disabled={isLoading}
                className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-12 py-4 rounded-full text-lg font-light tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    Read More Stories
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}
              </Button>
            </div>
          )}
        </section>

        {/* Awards Section */}
        <section className="py-20 border-b border-slate-200">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4 tracking-wide">
              Recognized Excellence
            </h2>
            <div className="w-16 h-px bg-amber-600 mx-auto mb-6"></div>
            <p className="text-slate-600 text-lg font-light max-w-2xl mx-auto leading-relaxed">
              Proudly acknowledged for our commitment to exceptional service and
              sustainable luxury hospitality.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-12 backdrop-blur-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center group cursor-pointer"
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animation: "fadeInUp 0.8s ease-out forwards",
                  }}
                >
                  <div className="mb-6 group-hover:scale-110 transition-all duration-500 p-4 rounded-2xl group-hover:bg-amber-50">
                    {award.icon}
                  </div>
                  <p className="text-slate-700 font-medium text-lg group-hover:text-amber-700 transition-colors duration-300">
                    {award.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <div
              className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 p-12 lg:p-20 text-center relative"
              style={{
                backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.9), rgba(217, 119, 6, 0.9)), url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-wide">
                  Experience Serenity
                </h2>
                <h3 className="text-3xl md:text-4xl font-extralight text-white mb-8">
                  For Yourself
                </h3>
                <p className="text-amber-100 mb-10 text-xl max-w-2xl mx-auto leading-relaxed font-light">
                  Inspired by our guests' stories? Plan your own unforgettable
                  escape at our award-winning coastal retreat.
                </p>
                <Button className="bg-white text-amber-700 px-10 py-4 rounded-full text-lg font-medium hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:text-amber-800">
                  Book Your Stay
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/5 rounded-full"></div>
                <div className="absolute top-1/2 right-20 w-12 h-12 bg-white/10 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
