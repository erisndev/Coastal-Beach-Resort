// import React, { useRef } from "react";
// import { Section } from "@/components/Section";

// import bike from "@/assets/bike-ride.jpg";
// import parade from "@/assets/cultural-parade.jpg";
// import tug from "@/assets/tug-of-war.png";
// import kids from "@/assets/kids-pool.jpg";
// import loungers from "@/assets/beach-loungers.jpg";
// import ocean from "@/assets/ocean-relax.jpg";
// import restaurant from "@/assets/restaurant.jpg";
// import events from "@/assets/private-event.jpg";
// import year from "@/assets/year-end.jpg";

// export const Amenities = () => {
//   const ref = useRef(null);

//   // List or Arrays of experiences
//   const wellness = [
//     {
//       id: 1,
//       title: "Kids' Pool",
//       image: kids,
//       imageTitle: "Splash and play in a safe space.",
//       description:
//         "Children enjoy a dedicated pool designed for fun and safety, perfect for family retreats.",
//     },
//     {
//       id: 2,
//       title: "Beach Chairs & Loungers",
//       image: loungers,
//       imageTitle: "Soak up the sun in comfort.",
//       description:
//         "Unwind on beachfront loungers with panoramic views of Umkomaas Beach and the Indian Ocean.",
//     },
//     {
//       id: 3,
//       title: "Oceanfront Relaxation",
//       image: ocean,
//       imageTitle: "Unwind with majestic ocean views.",
//       description:
//         "Let the sound of waves and salty breeze melt your stress away. Whether you're sipping a cocktail or reading under a palm tree, serenity is always within reach.",
//     },
//   ];

//   const adventures = [
//     {
//       id: 1,
//       title: "Beachfront Leisure Rides",
//       image: bike,
//       imageTitle: "Cruise the coast at your own pace.",
//       description:
//         "While not offered directly by the resort, nearby coastal paths and scenic beachfront roads make for relaxing bike rides with ocean views. Perfect for guests who bring their own bikes or rent locally.",
//     },
//     {
//       id: 2,
//       title: "Coastal Rickshaw Rides",
//       image: parade,
//       imageTitle: "Ride with rhythm and tradition.",
//       description:
//         "Hop aboard a decorated tricycle piloted by a local rickshaw runner in full traditional attire. These iconic rides along Durban’s Golden Mile offer a colorful glimpse into Zulu heritage and festive street culture.",
//     },
//     {
//       id: 3,
//       title: "Team Tug-of-War",
//       image: tug,
//       imageTitle: "Strength in unity.",
//       description:
//         "Join the fun in this classic team challenge where coordination, strategy, and spirit collide. A perfect outdoor activity for group bonding and energetic competition.",
//     },
//   ];

//   const culinary = [
//     {
//       id: 1,
//       title: "Restaurant Dining",
//       image: restaurant,
//       imageTitle: "Taste the coastal flavors.",
//       description:
//         "Enjoy delicious meals in a culturally inspired restaurant setting.",
//     },
//     {
//       id: 2,
//       title: "Private Function Catering",
//       image: events,
//       imageTitle: "Celebrate with flavor.",
//       description:
//         "Custom catering for weddings, conferences, and private events.",
//     },
//     {
//       id: 3,
//       title: "Year-End Luncheons",
//       image: year,
//       imageTitle: "Celebrate milestones.",
//       description:
//         "Host memorable gatherings with curated menus and ocean views.",
//     },
//   ];

//   return (
//     <div
//       ref={ref}
//       className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100"
//     >
//       {/* Hero Section - Gallery Style */}
//       <section
//         className="relative min-h-screen flex items-center justify-center overflow-hidden"
//         style={{
//           backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url("/bikes.jpeg")`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundAttachment: "fixed",
//         }}
//       >
//         <div className="text-center z-10 px-4">
//           <h1 className="text-6xl md:text-8xl font-extralight text-white mb-6 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_0.5s_forwards]">
//             Experiences
//           </h1>
//           <h1 className="text-5xl md:text-7xl font-light text-white mb-8 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_1s_forwards]">
//             <span className="font-serif">&</span> Amenities
//           </h1>
//           <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed opacity-0 animate-[fadeInUp_1.5s_ease-out_1.5s_forwards]">
//             Wake up to sea views, unwind by the pool, and explore the South
//             Coast's finest escapes.
//           </p>
//           <div className="w-24 h-px bg-white mx-auto mt-8 opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]"></div>
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50"></div>
//       </section>

//       {/* Content Sections */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <Section
//           title="Wellness"
//           subtitle="Tailor-made retreats and tranquil escapes to rejuvenate body and mind."
//           items={wellness}
//           index={0}
//         />
//         <Section
//           title="Outdoor Adventures"
//           subtitle="Exciting ocean and dam activities for thrill-seekers and nature lovers."
//           items={adventures}
//           index={1}
//         />
//         <Section
//           title="Culinary Delights"
//           subtitle="Homestyle meals and curated catering for every occasion."
//           items={culinary}
//           index={2}
//         />
//       </div>

//       {/* Custom CSS animations */}
//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };
import React, { useRef } from "react";
import { Section } from "@/components/Section";

import bike from "@/assets/bike-ride.jpg";
import parade from "@/assets/cultural-parade.jpg";
import tug from "@/assets/tug-of-war.png";
import kids from "@/assets/kids-pool.jpg";
import loungers from "@/assets/beach-loungers.jpg";
import ocean from "@/assets/ocean-relax.jpg";
import restaurant from "@/assets/restaurant.jpg";
import events from "@/assets/private-event.jpg";
import year from "@/assets/year-end.jpg";

export const Amenities = () => {
  const ref = useRef(null);

  // List or Arrays of experiences
  const wellness = [
    {
      id: 1,
      title: "Kids' Pool",
      image: kids,
      imageTitle: "Splash and play in a safe space.",
      description:
        "Children enjoy a dedicated pool designed for fun and safety, perfect for family retreats.",
    },
    {
      id: 2,
      title: "Beach Chairs & Loungers",
      image: loungers,
      imageTitle: "Soak up the sun in comfort.",
      description:
        "Unwind on beachfront loungers with panoramic views of Umkomaas Beach and the Indian Ocean.",
    },
    {
      id: 3,
      title: "Oceanfront Relaxation",
      image: ocean,
      imageTitle: "Unwind with majestic ocean views.",
      description:
        "Let the sound of waves and salty breeze melt your stress away. Whether you're sipping a cocktail or reading under a palm tree, serenity is always within reach.",
    },
  ];

  const adventures = [
    {
      id: 1,
      title: "Beachfront Leisure Rides",
      image: bike,
      imageTitle: "Cruise the coast at your own pace.",
      description:
        "While not offered directly by the resort, nearby coastal paths and scenic beachfront roads make for relaxing bike rides with ocean views. Perfect for guests who bring their own bikes or rent locally.",
    },
    {
      id: 2,
      title: "Coastal Rickshaw Rides",
      image: parade,
      imageTitle: "Ride with rhythm and tradition.",
      description:
        "Hop aboard a decorated tricycle piloted by a local rickshaw runner in full traditional attire. These iconic rides along Durban's Golden Mile offer a colorful glimpse into Zulu heritage and festive street culture.",
    },
    {
      id: 3,
      title: "Team Tug-of-War",
      image: tug,
      imageTitle: "Strength in unity.",
      description:
        "Join the fun in this classic team challenge where coordination, strategy, and spirit collide. A perfect outdoor activity for group bonding and energetic competition.",
    },
  ];

  const culinary = [
    {
      id: 1,
      title: "Restaurant Dining",
      image: restaurant,
      imageTitle: "Taste the coastal flavors.",
      description:
        "Enjoy delicious meals in a culturally inspired restaurant setting.",
    },
    {
      id: 2,
      title: "Private Function Catering",
      image: events,
      imageTitle: "Celebrate with flavor.",
      description:
        "Custom catering for weddings, conferences, and private events.",
    },
    {
      id: 3,
      title: "Year-End Luncheons",
      image: year,
      imageTitle: "Celebrate milestones.",
      description:
        "Host memorable gatherings with curated menus and ocean views.",
    },
  ];

  const extra = [
    {
      id: 1,
      title: "Internet Access",
      image: "/api/placeholder/400/300", // Placeholder image
      imageTitle: "Stay connected throughout your stay.",
      description:
        "High-speed Wi-Fi connectivity available throughout the property, keeping you connected to work or loved ones when needed.",
    },
    {
      id: 2,
      title: "Parking Spaces",
      image: "/api/placeholder/400/300", // Placeholder image
      imageTitle: "Convenient and secure vehicle storage.",
      description:
        "Ample parking spaces available for guests, ensuring your vehicle is safe and easily accessible during your stay.",
    },
    {
      id: 3,
      title: "Security Systems",
      image: "/api/placeholder/400/300", // Placeholder image
      imageTitle: "Peace of mind, day and night.",
      description:
        "24/7 security monitoring and access control systems ensure the safety and security of all guests and their belongings.",
    },
    {
      id: 4,
      title: "Laundry Facilities",
      image: "/api/placeholder/400/300", // Placeholder image
      imageTitle: "Fresh and clean throughout your stay.",
      description:
        "On-site laundry facilities with modern washers and dryers, perfect for extended stays or keeping your beachwear fresh.",
    },
    {
      id: 5,
      title: "Kitchen Appliances",
      image: "/api/placeholder/400/300", // Placeholder image
      imageTitle: "Cook with convenience and comfort.",
      description:
        "Fully equipped kitchens with modern appliances including refrigerators, stoves, microwaves, and all necessary cookware for a home-away-from-home experience.",
    },
  ];

  return (
    <div
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100"
    >
      {/* Hero Section - Gallery Style */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url("/bikes.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="text-center z-10 px-4">
          <h1 className="text-6xl md:text-8xl font-extralight text-white mb-6 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_0.5s_forwards]">
            Experiences
          </h1>
          <h1 className="text-5xl md:text-7xl font-light text-white mb-8 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_1s_forwards]">
            <span className="font-serif">&</span> Amenities
          </h1>
          <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed opacity-0 animate-[fadeInUp_1.5s_ease-out_1.5s_forwards]">
            Wake up to sea views, unwind by the pool, and explore the South
            Coast's finest escapes.
          </p>
          <div className="w-24 h-px bg-white mx-auto mt-8 opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50"></div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section
          title="Wellness"
          subtitle="Tailor-made retreats and tranquil escapes to rejuvenate body and mind."
          items={wellness}
          index={0}
        />
        <Section
          title="Outdoor Adventures"
          subtitle="Exciting ocean and dam activities for thrill-seekers and nature lovers."
          items={adventures}
          index={1}
        />
        <Section
          title="Culinary Delights"
          subtitle="Homestyle meals and curated catering for every occasion."
          items={culinary}
          index={2}
        />
        <Section
          title="Extra Amenities"
          subtitle="Essential facilities and services to make your stay comfortable and convenient."
          items={extra}
          index={3}
        />
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
