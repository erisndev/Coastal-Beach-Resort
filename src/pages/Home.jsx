import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const featuredExperiences = [
    {
      title: "Swimming & Pool Lounging",
      description:
        "Relax in our stunning beachfront pool area with crystal-clear waters and comfortable loungers, perfect for sunbathing and unwinding by the sea.",
      imageUrl: "/pool.jpg", // Replace with actual image path
      gradient: "from-sky-100 to-blue-200",
    },
    {
      title: "Sunset Viewing",
      description:
        "Experience breathtaking ocean sunsets from our rooftop terrace, offering panoramic views and unforgettable romantic moments.",
      imageUrl: "/sunset.jpg", // Replace with actual image path
      gradient: "from-yellow-100 to-rose-200",
    },
    {
      title: "Fine Dining Experience",
      description:
        "Indulge in our fine dining with gourmet meals and expertly crafted cocktails, served in an elegant indoor setting with ocean views.",
      imageUrl: "/dine.jpg", // Replace with actual image path
      gradient: "from-amber-100 to-orange-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('/hero-img.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-extralight mb-6 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_0.5s_forwards]">
            Coastal Beach
          </h1>
          <h1 className="text-6xl md:text-8xl font-light mb-8 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_1s_forwards]">
            Resort
          </h1>
          <div className="w-24 h-px bg-white mx-auto mb-8 opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]"></div>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-0 animate-[fadeInUp_1s_ease-out_2s_forwards]">
            Experience unparalleled tranquility and luxury amidst breathtaking
            natural beauty.
          </p>
          <Button
            size="lg"
            onClick={navigate("/appointment")}
            className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-12 py-4 rounded-full text-lg font-light tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 opacity-0 animate-[fadeInUp_1s_ease-out_2.5s_forwards]"
          >
            BOOK NOW
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Button>
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 pointer-events-none"></div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4 tracking-wide">
            Welcome to Coastal Beach Resort
          </h2>
          <div className="w-16 h-px bg-amber-600 mx-auto mb-12"></div>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Nestled in the heart of nature, Coastal Beach Resort offers an
            escape from the ordinary. Our commitment to exceptional service,
            spectacular scenery, and personalized hospitality ensures every
            guest feels valued and appreciated. Discover unforgettable luxury
            where the wild and serene waters are crafted for perfection.
          </p>
        </div>
      </section>

      {/* Featured Experiences Section */}
      <section className="py-20 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4 tracking-wide">
              Featured Experiences
            </h2>
            <div className="w-16 h-px bg-amber-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExperiences.map((item, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl bg-white m-0 p-0"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: "fadeInUp 0.8s ease-out forwards",
                }}
              >
                <div
                  className={`h-64 sm:h-72 md:h-80 lg:h-80 bg-gradient-to-br ${item.gradient} relative overflow-hidden m-0 p-0`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('${item.imageUrl}')`,
                      opacity: 0.8,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <CardTitle className="text-xl font-light mb-3 text-slate-800 tracking-wide">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 mb-6 leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add custom CSS animations */}
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
