import React, { useRef } from "react";
import experience from "@/assets/experience.jpg";
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
        "Hop aboard a decorated tricycle piloted by a local rickshaw runner in full traditional attire. These iconic rides along Durban’s Golden Mile offer a colorful glimpse into Zulu heritage and festive street culture.",
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

  return (
    <div ref={ref} className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="text-center text-white">
        <div
          className="relative min-h-[40vh] sm:min-h-[50vh] lg:min-h-[60vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${experience})` }}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-invert-30 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-teal-100 leading-tight">
              Experiences <span className="font-serif">&</span> Amenities
            </h2>
            <p className="mt-4 text-base sm:text-lg lg:text-xl text-teal-100 max-w-2xl">
              Wake up to sea views, unwind by the pool, and explore the South
              Coast’s finest escapes.
            </p>
          </div>
        </div>
      </header>

      <div className="md:w-6xl place-self-center">
        {/* Sections */}
        <Section
          title="Wellness"
          subtitle="Tailor-made retreats and tranquil escapes to rejuvenate body and mind."
          items={wellness}
        />
        <Section
          title="Outdoor Adventures"
          subtitle="Exciting ocean and dam activities for thrill-seekers and nature lovers."
          items={adventures}
        />
        <Section
          title="Culinary Delights"
          subtitle="Homestyle meals and curated catering for every occasion."
          items={culinary}
        />
      </div>
    </div>
  );
};
