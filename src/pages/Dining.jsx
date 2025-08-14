import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Dining = () => {
  const [activeGallery, setActiveGallery] = useState("restaurant");
  const navigete = useNavigate();

  const handleContact = () => {
    navigete("/contact");
  };

  const galleryImages = {
    restaurant: [
      {
        id: 1,
        title: "Dining Area",
        description: "Guests enjoying meals in our warm atmosphere",
        src: "/R1.png",
      },
      {
        id: 2,
        title: "Wood Fire Cooking",
        description: "Traditional cooking methods",
        src: "/R2.png",
      },
      {
        id: 3,
        title: "Bar",
        description: "Refreshing beverages and artisan spirits",
        src: "/bar.jpeg",
      },
      {
        id: 4,
        title: "Tea Service",
        description: "Elegant afternoon tea presentation",
        src: "/R3.png",
      },
    ],
    conferences: [
      {
        id: 1,
        title: "Conference Setup",
        description: "Professional meeting arrangements",
        src: "/C2.png",
      },
      {
        id: 2,
        title: "Welcome Setup",
        description: "Corporate hospitality area",
        src: "/C1.png",
      },
      {
        id: 3,
        title: "Lounge Area",
        description: "Comfortable networking space",
        src: "/C3.png",
      },
    ],
    private: [
      {
        id: 1,
        title: "Elegant Dining",
        description: "Private function dining setup",
        src: "/P1.png",
      },
      {
        id: 2,
        title: "Event Space",
        description: "Versatile venue for celebrations",
        src: "/P2.png",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('/bar.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="text-center z-10 px-4">
          <h1 className="text-6xl md:text-8xl font-extralight text-white mb-6 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_0.5s_forwards]">
            Events &
          </h1>
          <h1 className="text-6xl md:text-8xl font-light text-white mb-8 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_1s_forwards]">
            Dining
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide opacity-0 animate-[fadeInUp_1.5s_ease-out_1.5s_forwards]">
            Unforgettable experiences by the coast
          </p>
          <div className="w-24 h-px bg-white mx-auto mt-8 opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Host Your Dream Event */}
        <section className="py-20 border-b border-slate-200">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4 tracking-wide">
              Host Your Dream Event
            </h2>
            <div className="w-16 h-px bg-amber-600 mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-12 text-center transform hover:-translate-y-1">
              <h3 className="text-3xl font-light text-slate-800 mb-6 tracking-wide">
                Weddings & Special Celebrations
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 font-light">
                Create magical memories at our stunning coastal venue. From
                intimate ceremonies to grand receptions, our dedicated event
                planning team will ensure every detail is perfect. Our versatile
                spaces can accommodate gatherings with breathtaking views.
              </p>
              <Button
                onClick={handleContact}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-12 py-4 rounded-full text-lg font-light tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Plan Your Event
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Button>
            </div>
          </div>
        </section>

        {/* Dedicated Planning & Catering */}
        <section className="py-20 border-b border-slate-200">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4 tracking-wide">
              Dedicated Planning & Gourmet Catering
            </h2>
            <div className="w-16 h-px bg-amber-600 mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-12 text-center transform hover:-translate-y-1">
              <h3 className="text-3xl font-light text-slate-800 mb-6 tracking-wide">
                Professional Event Services
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 font-light">
                Our experienced event coordinators work closely with you to
                bring your vision to life. We offer comprehensive planning
                services with attention to every detail, ensuring your special
                day exceeds expectations.
              </p>
              <Button
                onClick={handleContact}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-12 py-4 rounded-full text-lg font-light tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Contact Our Planners
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Button>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 border-b border-slate-200">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4 tracking-wide">
              Gallery
            </h2>
            <div className="w-16 h-px bg-amber-600 mx-auto"></div>
          </div>

          {/* Gallery Navigation */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {Object.keys(galleryImages).map((category) => (
              <button
                key={category}
                onClick={() => setActiveGallery(category)}
                className={`text-lg font-light tracking-wide pb-3 border-b-2 transition-all duration-300 hover:text-amber-600 ${
                  activeGallery === category
                    ? "border-amber-600 text-amber-600"
                    : "border-transparent text-slate-600 hover:border-amber-300"
                }`}
              >
                {category === "restaurant" && "Restaurant"}
                {category === "conferences" && "Conferences"}
                {category === "private" && "Private Functions"}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages[activeGallery].map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <h4 className="text-xl font-light mb-2 tracking-wide">
                    {image.title}
                  </h4>
                  <p className="text-sm text-white/90 font-light">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Property Surroundings */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4 tracking-wide">
              Property Surroundings
            </h2>
            <div className="w-16 h-px bg-amber-600 mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <p className="text-amber-600 text-lg mb-12 text-center font-light">
                Guests loved walking around the neighbourhood! Good location
              </p>

              <div className="grid md:grid-cols-1 gap-8">
                <div>
                  <h3 className="text-2xl font-light text-slate-800 mb-8 tracking-wide">
                    Restaurants & Cafes
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-4 border-b border-slate-100">
                      <div>
                        <span className="text-amber-600 font-light tracking-wide">
                          Restaurant
                        </span>
                        <span className="text-slate-800 font-light ml-4">
                          Crows Nest Restaurant
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-slate-100">
                      <div>
                        <span className="text-amber-600 font-light tracking-wide">
                          Restaurant
                        </span>
                        <span className="text-slate-800 font-light ml-4">
                          KFC
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-slate-100">
                      <div>
                        <span className="text-amber-600 font-light tracking-wide">
                          Restaurant
                        </span>
                        <span className="text-slate-800 font-light ml-4">
                          Sebastians Seafood Grill & Pub
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Add custom CSS animations
const style = document.createElement("style");
style.textContent = `
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
`;
document.head.appendChild(style);

export default Dining;
