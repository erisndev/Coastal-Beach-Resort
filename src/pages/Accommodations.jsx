import React, { useEffect, useState } from "react";
import {
  User,
  Users,
  Wifi,
  Tv,
  Wind,
  Car,
  Bath,
  Coffee,
  UtensilsCrossed,
  Bed,
  Eye,
  Mountain,
  TreePine,
  Home,
  Crown,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const Accommodations = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const rooms = [
    {
      id: "standard-double",
      name: "Standard Double Room",
      images: [
        "/SD1.jpg",
        "/SD2.jpg",
        "/SD3.jpg",
        "/SD4.jpg",
        "/SD5.jpg",
        "/SD6.jpg",
        "/SD7.jpg",
        "/SD8.jpg",
      ],
      size: "22 m²",
      guests: 2,
      beds: "1 double bed",
      comfyRating: 8.5,
      reviews: 50,
      description:
        "This air-conditioned double room includes a flat-screen TV with satellite channels, a private bathroom as well as a balcony with sea views. The unit offers 1 bed.",
      amenities: {
        bathroom: [
          "Free toiletries",
          "Toilet",
          "Bath or shower",
          "Towels",
          "Hairdryer",
          "Toilet paper",
        ],
        view: ["Sea view", "Pool view"],
        facilities: [
          "Balcony",
          "Air conditioning",
          "Linen",
          "Socket near the bed",
          "Tile/marble floor",
          "Desk",
          "Soundproofing",
          "TV",
          "Refrigerator",
          "Iron",
          "Flat-screen TV",
          "Electric kettle",
          "Patio",
          "Wardrobe or closet",
          "Upper floors accessible by stairs only",
          "Clothes rack",
          "Single-room air conditioning",
          "Ironing facilities",
          "Satellite channels",
          "Tea/Coffie maker",
        ],
      },
      features: [
        "Room",
        "Balcony",
        "Sea view",
        "Pool view",
        "Air conditioning",
        "Patio",
        "Private bathroom",
        "Flat-screen TV",
        "Soundproofing",
        "Free WiFi",
      ],
      smoking: "No smoking",
    },
    {
      id: "deluxe-double",
      name: "Deluxe Double Room",
      images: [
        "/DD1.jpg",
        "/DD2.jpg",
        "/DD3.jpg",
        "/DD4.jpg",
        "/DD5.jpg",
        "/DD6.jpg",
        "/DD7.jpg",
        "/DD8.jpg",
      ],
      size: "26 m²",
      guests: 2,
      beds: "1 double bed",
      comfyRating: 8.5,
      reviews: 50,
      description:
        "Providing free toiletries, this double room includes a private bathroom with a bath and a shower. The spacious air-conditioned double room provides a flat-screen TV with satellite channels, soundproof walls, a tea and coffee maker, a wardrobe as well as sea views. The unit offers 1 bed.",
      amenities: {
        bathroom: [
          "Free toiletries",
          "Toilet",
          "Bath or shower",
          "Towels",
          "Toilet paper",
        ],
        view: ["Sea view", "Pool view"],
        facilities: [
          "Air conditioning",
          "Linen",
          "Socket near the bed",
          "Tile/marble floor",
          "Desk",
          "Soundproofing",
          "TV",
          "Tea/Coffee maker",
          "Iron",
          "Flat-screen TV",
          "Electric kettle",
          "Patio",
          "Wardrobe or closet",
          "Clothes rack",
          "Refrigerator",
          "Ironing facilities",
          "Satellite channels",
          "Single-room air conditioning",
        ],
      },
      features: [
        "Room",
        "Sea view",
        "Pool view",
        "Air conditioning",
        "Patio",
        "Private bathroom",
        "Flat-screen TV",
        "Soundproofing",
        "Free WiFi",
      ],
      smoking: "No smoking",
    },
    {
      id: "standard-chalet",
      name: "Standard Chalet",
      images: [
        "/SC7.jpg",
        "/SC1.jpg",
        "/SC2.jpg",
        "/SC3.jpg",
        "/SC4.jpg",
        "/SC5.jpg",
        "/SC6.jpg",
        "/SC8.jpg",
        "/SC9.jpg",
        "/SC10.jpg",
        "/SC11.jpg",
        "/SC12.jpg",
        "/SC13.jpg",
        "/SC14.jpg",
        "/SC15.jpg",
      ],
      size: "65 m²",
      guests: 4,
      beds: "Bedroom 1: 1 double bed, Bedroom 2: 1 double bed, Living room: 1 sofa bed",
      comfyRating: 8.5,
      reviews: 50,
      bathrooms: 2,
      description:
        "This chalet comes with 1 living room, 2 separate bedrooms and 2 bathrooms with a shower and free toiletries. The air-conditioned chalet features a flat-screen TV with satellite channels, soundproof walls, a tea and coffee maker, a seating area as well as sea views. The unit has 3 beds.",
      amenities: {
        bathroom: [
          "Free toiletries",
          "Toilet",
          "Bath or shower",
          "Towels",
          "Toilet paper",
        ],
        view: ["Sea view", "River view"],
        facilities: [
          "Air conditioning",
          "Sofa",
          "Linen",
          "Socket near the bed",
          "Tea/Coffee maker",
          "Iron",
          "Flat-screen TV",
          "Electric kettle",
          "Cleaning products",
          "Patio",
          "Tile/marbel floor",
          "Warddrobe",
          "Seating Areas",
          "Upper floora accessible by stairs only",
          "Soundproofing",
          "Clothes rack",
          "TV",
          "Refrigerator",
          "Ironing facilities",
          "Satellite channels",
        ],
      },
      features: [
        "Entire chalet",
        "Sea view",
        "River view",
        "Air conditioning",
        "Patio",
        "Private bathroom",
        "Flat-screen TV",
        "Soundproofing",
        "Free WiFi",
      ],
      smoking: "No smoking",
    },
    {
      id: "standard-queen",
      name: "Standard Queen Room",
      images: [
        "/PS5.jpg",
        "/PS2.jpg",
        "/SC7.jpg",
        "/SC1.jpg",
        "/DD1.jpg",
        "/DD2.jpg",
        "/SD1.jpg",
        "/SD2.jpg",
      ],
      size: "40 m²",
      guests: 2,
      beds: "1 queen bed",
      comfyRating: 8.5,
      reviews: 50,
      description:
        "This double room is air-conditioned and features a private bathroom and a tiled floor.",
      amenities: {
        bathroom: ["Toilet", "Towels", "Toilet paper"],
        facilities: [
          "Air conditioning",
          "Socket near the bed",
          "Tile/marble floor",
          "Desk",
          "TV",
          "Refrigerator",
          "Flat-screen TV",
          "Clothes rack",
        ],
      },
      features: [
        "Room",
        "Air conditioning",
        "Private bathroom",
        "Flat-screen TV",
        "Free WiFi",
      ],
      smoking: "No smoking",
    },
    {
      id: "presidential-suite",
      name: "Presidential Suite",
      images: [
        "/PS5.jpg",
        "/PS2.jpg",
        "/PS3.jpg",
        "/PS4.jpg",
        "/PS1.jpg",
        "/PS6.jpg",
        "/PS7.jpg",
        "/PS8.jpg",
        "/PS9.jpg",
        "/PS10.jpg",
        "/PS11.jpg",
        "/PS12.jpg",
      ],
      guests: 6,
      comfyRating: 8.5,
      reviews: 50,
      description:
        "This air-conditioned suite has a desk, a patio, sea views and a private bathroom.",
      amenities: {
        bathroom: ["Bath", "Free toiletries", "Hairdryer"],
        view: ["Sea view"],
        facilities: [
          "Air conditioning",
          "Desk",
          "Refrigerator",
          "Satellite channels",
          "Tea/Coffee maker",
          "Patio",
          "Dining table",
        ],
      },
      features: [
        "Private suite",
        "Sea view",
        "Bath",
        "Air conditioning",
        "Patio",
        "Private bathroom",
        "Free WiFi",
      ],
      smoking: "No smoking",
    },
  ];

  const ImageSlider = ({ images, roomName }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
      setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToImage = (index) => {
      setCurrentImage(index);
    };

    return (
      <div className="relative">
        {/* Main Image Display */}
        <div className="aspect-[4/3] overflow-hidden rounded-xl mb-4 shadow-lg relative group">
          <img
            src={images[currentImage]}
            alt={`${roomName} - Image ${currentImage + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
              {currentImage + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentImage
                    ? "border-amber-500 shadow-lg"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={image}
                  alt={`${roomName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const RoomModal = ({ room, onClose }) => (
    <div className="fixed inset-0 bg-transparent backdrop-blur-md flex items-center justify-center z-50 p-4 animate-[fadeIn_0.3s_ease-out]">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-[fadeInUp_0.4s_ease-out]">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-light text-slate-800 tracking-wide">
              {room.name}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors duration-200 p-2 hover:bg-slate-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {/* Image Slider Component */}
              <ImageSlider images={room.images} roomName={room.name} />

              <div className="flex flex-wrap gap-2 mt-6">
                {room.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 text-sm rounded-full border border-amber-200"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-xl">
                {room.size && (
                  <div className="flex items-center gap-2 mb-3">
                    <Home size={18} className="text-amber-600" />
                    <span className="text-slate-700">Size: {room.size}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <Bed size={18} className="text-amber-600" />
                  <span className="text-slate-700">{room.beds}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Users size={18} className="text-amber-600" />
                  <span className="text-slate-700">
                    Up to {room.guests} guests
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 font-medium">
                    {room.comfyRating}
                  </span>
                  <span className="text-slate-600 text-sm">
                    Comfort rating — Based on {room.reviews} reviews
                  </span>
                </div>
                {room.bathrooms && (
                  <div className="flex items-center gap-2 mt-3">
                    <Bath size={18} className="text-amber-600" />
                    <span className="text-slate-700">
                      Bathrooms: {room.bathrooms}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-lg font-medium text-slate-800 mb-3">
                  Description
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {room.description}
                </p>
              </div>

              {room.amenities.bathroom && (
                <div>
                  <h4 className="text-lg font-medium text-slate-800 mb-3 flex items-center gap-2">
                    <Bath size={20} className="text-amber-600" />
                    Private Bathroom
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {room.amenities.bathroom.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <span className="text-green-600 text-xs">✓</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {room.amenities.view && (
                <div>
                  <h4 className="text-lg font-medium text-slate-800 mb-3 flex items-center gap-2">
                    <Eye size={20} className="text-amber-600" />
                    Views
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {room.amenities.view.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <span className="text-green-600 text-xs">✓</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {room.amenities.facilities && (
                <div>
                  <h4 className="text-lg font-medium text-slate-800 mb-3">
                    Room Facilities
                  </h4>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {room.amenities.facilities.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <span className="text-green-600 text-xs">✓</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {room.smoking && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">
                    Smoking Policy
                  </h4>
                  <p className="text-sm text-green-700">{room.smoking}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (selectedRoom) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup in case component unmounts with modal open
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedRoom]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('/house.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="text-center z-10 px-4">
          <h1 className="text-6xl md:text-8xl font-extralight text-white mb-6 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_0.5s_forwards]">
            Luxury
          </h1>
          <h1 className="text-6xl md:text-8xl font-light text-white mb-8 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_1s_forwards]">
            Accommodations
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light tracking-wide opacity-0 animate-[fadeInUp_1.5s_ease-out_1.5s_forwards] max-w-3xl mx-auto">
            Discover a sanctuary where luxury meets tranquility
          </p>
          <div className="w-24 h-px bg-white mx-auto opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Room Types Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4 tracking-wide">
              Our Refined Retreats
            </h2>
            <div className="w-16 h-px bg-amber-600 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Each accommodation is thoughtfully designed to provide an
              unparalleled experience of comfort, elegance, and serenity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <div
                key={room.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer bg-white"
                onClick={() => setSelectedRoom(room)}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Photo count indicator */}
                  {room.images.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
                      +{room.images.length - 1} photos
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-light text-slate-800 tracking-wide group-hover:text-amber-700 transition-colors duration-300">
                      {room.name}
                    </h3>
                    {room.id === "presidential-suite" && (
                      <Crown size={20} className="text-amber-600 mt-1" />
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                    {room.size && (
                      <div className="flex items-center gap-1">
                        <Home size={14} />
                        <span>{room.size}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{room.guests} guests</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-2">
                    {room.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {room.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-200"
                      >
                        {feature}
                      </span>
                    ))}
                    {room.features.length > 3 && (
                      <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                        +{room.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-full text-sm font-light tracking-wide">
                    View Details
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Room Detail Modal */}
      {selectedRoom && (
        <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}

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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};
