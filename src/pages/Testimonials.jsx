import React, { useState } from "react";
import { Star, Award, Shield, Zap, Mountain, StarHalf } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Testimonials = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const testimonials = [
    {
      rating: 10.0,
      title: "Exceptional Experience",
      content:
        "From check-in to check-out, everything exceeded our expectations. The beachfront views were stunning, the pool area clean and inviting, and the staff went out of their way to make us comfortable.",
      author: "Thando",
      location: "South Africa",
      date: "15 February 2024",
      avatar: "T",
      room: "Presidential Suite",
      stay: "2 nights · February 2024",
      groupType: "Couple",
    },
    {
      rating: 9.5,
      title: "Amazing Stay",
      content:
        "The staff was incredibly welcoming, the rooms were spotless, and the view from the balcony was breathtaking. Highly recommended!",
      author: "Lerato",
      location: "South Africa",
      date: "20 February 2024",
      avatar: "L",
      room: "Deluxe Double Room",
      stay: "3 nights · February 2024",
      groupType: "Family",
    },
    {
      rating: 9.0,
      title: "Best Stay",
      content:
        "I like the fact that my room was upstairs and the sea view at the balcony was breathtaking. The pool area was amazing. The host was welcoming, staff very friendly.",
      author: "Nossy",
      location: "South Africa",
      date: "5 January 2024",
      avatar: "N",
      room: "Standard Double Room",
      stay: "3 nights · January 2024",
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
      room: "Standard Queen Room",
      stay: "1 night · December 2023",
      groupType: "Family",
    },
    {
      rating: 9.0,
      title: "Thumbs up for Coastal Beach Resort",
      content:
        "I liked everything about the accommodation, it was relaxing and quiet with beautiful view. The staff was friendly especially Nondumiso, she was exceptional. Her customer service is the best!",
      author: "Nondumiso",
      location: "South Africa",
      date: "21 December 2023",
      avatar: "N",
      room: "Standard Chalet",
      stay: "3 nights · December 2023",
      groupType: "Family",
    },
    {
      rating: 9.5,
      title: "Perfect Weekend Escape",
      content:
        "Everything about the resort was perfect. Great beach access, clean pool, and the staff were attentive and friendly. Highly recommend for couples!",
      author: "Sipho",
      location: "South Africa",
      date: "12 March 2024",
      avatar: "S",
      room: "Standard Double Room",
      stay: "2 nights · March 2024",
      groupType: "Couple",
    },
    {
      rating: 10.0,
      title: "Unforgettable Stay",
      content:
        "The Presidential Suite was incredible! Stunning views, luxurious interiors, and the staff were amazing. Definitely returning next year.",
      author: "Miriam",
      location: "South Africa",
      date: "18 March 2024",
      avatar: "M",
      room: "Presidential Suite",
      stay: "3 nights · March 2024",
      groupType: "Family",
    },
    {
      rating: 9.0,
      title: "Wonderful Experience",
      content:
        "The Deluxe Double Room was spacious and comfortable. Loved the pool area and proximity to the beach. Staff made us feel very welcome.",
      author: "Jason",
      location: "United Kingdom",
      date: "5 April 2024",
      avatar: "J",
      room: "Deluxe Double Room",
      stay: "4 nights · April 2024",
      groupType: "Couple",
    },
    {
      rating: 9.5,
      title: "Family Friendly Resort",
      content:
        "Our kids loved the pool and the beach was just a short walk away. Rooms were clean and the staff were extremely helpful.",
      author: "Nomsa",
      location: "South Africa",
      date: "12 April 2024",
      avatar: "N",
      room: "Standard Chalet",
      stay: "3 nights · April 2024",
      groupType: "Family",
    },
    {
      rating: 10.0,
      title: "Luxury at its Best",
      content:
        "The Presidential Suite exceeded our expectations. Every detail was perfect and the service was outstanding. Highly recommend for special occasions.",
      author: "David",
      location: "United Kingdom",
      date: "20 April 2024",
      avatar: "D",
      room: "Presidential Suite",
      stay: "2 nights · April 2024",
      groupType: "Couple",
    },
    {
      rating: 9.0,
      title: "Relaxing Getaway",
      content:
        "Perfect place for a weekend escape. The property is peaceful, well-maintained, and just a short walk from the beach. Great value for money and very family friendly.",
      author: "Zanele",
      location: "South Africa",
      date: "10 March 2024",
      avatar: "Z",
      room: "Standard Chalet",
      stay: "2 nights · March 2024",
      groupType: "Family",
    },
    {
      rating: 9.0,
      title: "Lovely Stay",
      content:
        "The rooms were very comfortable and clean. Loved the breakfast buffet and beach access. Staff made our stay wonderful.",
      author: "Kevin",
      location: "South Africa",
      date: "2 May 2024",
      avatar: "K",
      room: "Standard Queen Room",
      stay: "3 nights · May 2024",
      groupType: "Couple",
    },
    {
      rating: 9.5,
      title: "Amazing Staff",
      content:
        "The staff went above and beyond to make our stay memorable. Beautiful property and well-maintained rooms. We’ll be back soon!",
      author: "Lindiwe",
      location: "South Africa",
      date: "10 May 2024",
      avatar: "L",
      room: "Deluxe Double Room",
      stay: "4 nights · May 2024",
      groupType: "Family",
    },
    {
      rating: 9.0,
      title: "Great Vacation",
      content:
        "Clean rooms, friendly staff, and a beautiful location. Enjoyed the pool and beach. Highly recommend for couples and families.",
      author: "Brian",
      location: "South Africa",
      date: "15 May 2024",
      avatar: "B",
      room: "Standard Double Room",
      stay: "3 nights · May 2024",
      groupType: "Couple",
    },
    {
      rating: 10.0,
      title: "Outstanding Stay",
      content:
        "Everything was perfect. Spacious Presidential Suite, amazing beach view, and staff that truly care about your comfort.",
      author: "Thandi",
      location: "South Africa",
      date: "20 May 2024",
      avatar: "T",
      room: "Presidential Suite",
      stay: "2 nights · May 2024",
      groupType: "Couple",
    },
    {
      rating: 9.0,
      title: "Peaceful Retreat",
      content:
        "Loved the serene atmosphere and friendly staff. Rooms were very comfortable and clean. Perfect getaway spot.",
      author: "Sihle",
      location: "South Africa",
      date: "28 May 2024",
      avatar: "S",
      room: "Standard Queen Room",
      stay: "3 nights · May 2024",
      groupType: "Family",
    },
    {
      rating: 9.5,
      title: "Excellent Location",
      content:
        "The resort is right on the beach and very well-maintained. Staff are attentive and helpful. Will visit again!",
      author: "Ayanda",
      location: "South Africa",
      date: "3 June 2024",
      avatar: "A",
      room: "Standard Chalet",
      stay: "2 nights · June 2024",
      groupType: "Couple",
    },
    {
      rating: 9.0,
      title: "Memorable Experience",
      content:
        "Our stay was unforgettable. Rooms are comfortable and the view is spectacular. Staff make you feel at home.",
      author: "Nokuthula",
      location: "South Africa",
      date: "10 June 2024",
      avatar: "N",
      room: "Deluxe Double Room",
      stay: "3 nights · June 2024",
      groupType: "Family",
    },
    {
      rating: 9.5,
      title: "Perfect Holiday",
      content:
        "Everything was excellent! Beautiful location, friendly staff, and comfortable rooms. We’ll definitely come back.",
      author: "Michael",
      location: "United Kingdom",
      date: "15 June 2024",
      avatar: "M",
      room: "Standard Double Room",
      stay: "4 nights · June 2024",
      groupType: "Couple",
    },
    {
      rating: 9.0,
      title: "Highly Recommend",
      content:
        "A wonderful resort with attentive staff, clean rooms, and easy beach access. Perfect for families and couples.",
      author: "Sibusiso",
      location: "South Africa",
      date: "20 June 2024",
      avatar: "S",
      room: "Standard Queen Room",
      stay: "3 nights · June 2024",
      groupType: "Family",
    },
    {
      rating: 10.0,
      title: "Top Notch Resort",
      content:
        "From the luxurious Presidential Suite to the amazing staff, everything was perfect. Beachfront views were stunning.",
      author: "Linda",
      location: "South Africa",
      date: "25 June 2024",
      avatar: "L",
      room: "Presidential Suite",
      stay: "2 nights · June 2024",
      groupType: "Couple",
    },
    {
      rating: 9.5,
      title: "Fantastic Vacation",
      content:
        "The Standard Chalet was comfortable, clean, and well-maintained. Staff went out of their way to make us feel welcome.",
      author: "Kgalema",
      location: "South Africa",
      date: "30 June 2024",
      avatar: "K",
      room: "Standard Chalet",
      stay: "3 nights · June 2024",
      groupType: "Family",
    },
    {
      rating: 9.0,
      title: "Wonderful Service",
      content:
        "Staff were very attentive, rooms clean, and location unbeatable. Great place for a peaceful getaway.",
      author: "Zinhle",
      location: "South Africa",
      date: "5 July 2024",
      avatar: "Z",
      room: "Deluxe Double Room",
      stay: "3 nights · July 2024",
      groupType: "Couple",
    },
    {
      rating: 9.5,
      title: "Relaxing Vacation",
      content:
        "Everything from the Standard Queen Room to the pool area was perfect. The staff made us feel very comfortable.",
      author: "Tumi",
      location: "South Africa",
      date: "10 July 2024",
      avatar: "T",
      room: "Standard Queen Room",
      stay: "4 nights · July 2024",
      groupType: "Family",
    },
    {
      rating: 9.0,
      title: "Amazing Location",
      content:
        "Perfect spot right on the beach. Rooms are comfortable and staff are friendly. Great place for couples or families.",
      author: "Nokwanda",
      location: "South Africa",
      date: "15 July 2024",
      avatar: "N",
      room: "Standard Double Room",
      stay: "3 nights · July 2024",
      groupType: "Couple",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Hero Section - Gallery Style */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url("/test.jpeg")`,
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
                <Button
                  onClick={() => navigate("/appointment")}
                  className="bg-white text-amber-700 px-10 py-4 rounded-full text-lg font-medium hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:text-amber-800"
                >
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
