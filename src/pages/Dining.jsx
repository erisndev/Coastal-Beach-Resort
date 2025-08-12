import React, { useState } from "react";

export const Dining = () => {
  const [activeGallery, setActiveGallery] = useState("restaurant");

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-screen bg-gradient-to-b from-amber-100 to-amber-200">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center">
          <div className="text-white">
            <h1 className="text-6xl font-light mb-4 tracking-wider">
              Events & Dining
            </h1>
            <p className="text-xl opacity-90">
              Unforgettable experiences by the coast
            </p>
          </div>
        </div>
      </div>

      {/* Host Your Dream Event */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-light text-center text-amber-800 mb-16">
            Host Your Dream Event
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <h3 className="text-2xl text-amber-800 mb-6">
              Weddings & Special Celebrations
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-4xl mx-auto">
              Create magical memories at our stunning coastal venue. From
              intimate ceremonies to grand receptions, our dedicated event
              planning team will ensure every detail is perfect. Our versatile
              spaces can accommodate gatherings with breathtaking views.
            </p>
            <button className="bg-amber-800 text-white px-8 py-3 rounded hover:bg-amber-900 transition-colors">
              Plan Your Event
            </button>
          </div>
        </div>
      </section>

      {/* Dedicated Planning & Catering */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-light text-center text-amber-800 mb-16">
            Dedicated Planning & Gourmet Catering
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <h3 className="text-2xl text-amber-800 mb-6">
              Professional Event Services
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-4xl mx-auto">
              Our experienced event coordinators work closely with you to bring
              your vision to life. We offer comprehensive planning services with
              attention to every detail, ensuring your special day exceeds
              expectations.
            </p>
            <button className="bg-amber-800 text-white px-8 py-3 rounded hover:bg-amber-900 transition-colors">
              Contact Our Planners
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-amber-800 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-light mb-4">GALLERY</h2>

          {/* Gallery Navigation */}
          <div className="flex justify-center space-x-8 mb-12">
            <button
              onClick={() => setActiveGallery("restaurant")}
              className={`text-xl pb-2 border-b-2 transition-colors ${
                activeGallery === "restaurant"
                  ? "border-white"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              RESTAURANT
            </button>
            <button
              onClick={() => setActiveGallery("conferences")}
              className={`text-xl pb-2 border-b-2 transition-colors ${
                activeGallery === "conferences"
                  ? "border-white"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              CONFERENCES
            </button>
            <button
              onClick={() => setActiveGallery("private")}
              className={`text-xl pb-2 border-b-2 transition-colors ${
                activeGallery === "private"
                  ? "border-white"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              PRIVATE FUNCTIONS
            </button>
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages[activeGallery].map((image) => (
              <div
                key={image.id}
                className="bg-black bg-opacity-40 text-white rounded-lg h-64 flex flex-col items-center justify-end hover:bg-opacity-60 transition-all cursor-pointer border-2 border-white border-opacity-20 hover:border-opacity-40 overflow-hidden p-4"
                style={{
                  backgroundImage: `url(${image.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="bg-white bg-opacity-50 text-amber-700 w-full rounded-b-lg p-4">
                  <h4 className="text-lg font-semibold mb-1">{image.title}</h4>
                  <p className="text-md opacity-90">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Surroundings */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-light text-amber-800 mb-8">
            Property surroundings
          </h2>
          <p className="text-amber-600 mb-8">
            Guests loved walking around the neighbourhood! Good location - show
            map
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-4">Restaurants & cafes</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-amber-600">Restaurant</span> •{" "}
                  <span>Crows Nest Restaurant</span>
                </div>
                <div>
                  <span className="text-amber-600">Restaurant</span> •{" "}
                  <span>KFC</span>
                </div>
                <div>
                  <span className="text-amber-600">Restaurant</span> •{" "}
                  <span>Sebastians Seafood Grill & Pub</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
