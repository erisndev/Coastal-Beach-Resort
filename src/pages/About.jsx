import React from "react";
import {
  Building2,
  Users,
  Leaf,
  Wifi,
  Shield,
  Waves,
  Utensils,
  Briefcase,
  Home,
  Activity,
  Bed,
} from "lucide-react";

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('/entrance.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="text-center z-10 px-4">
          <h1 className="text-6xl md:text-8xl font-extralight text-white mb-6 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_0.5s_forwards]">
            Our
          </h1>
          <h1 className="text-6xl md:text-8xl font-light text-white mb-8 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_1s_forwards]">
            Journey
          </h1>
          <div className="w-24 h-px bg-white mx-auto mb-8 opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]"></div>
          <p className="text-xl text-white  md:text-2xl font-medium leading-relaxed drop-shadow-md max-w-2xl mx-auto opacity-0 animate-[fadeInUp_1s_ease-out_2s_forwards]">
            Discover the story behind Coastal Beach Resort - where dreams come
            true and customer satisfaction is guaranteed
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50"></div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4 tracking-wide">
              Our Story: A Legacy of Excellence
            </h2>
            <div className="w-16 h-px bg-amber-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
                Amakhumbe Investments t/a Coastal Beach Resort is a black owned
                Events and Tourism Company in Umhlali Farm, Umgababa, about 38
                km from Durban central. Being an informal urban and peri-urban
                area which falls under the authority of the Rural Area Based
                Management (ABM) of the Ethekwini municipality.
              </p>
              <p className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
                We started off as a restaurant and wedding venue. However, as
                time went on, pressure from our clients opened our eyes to a
                need that was not being fulfilled fully in the tourism and
                hospitality industry in our vicinity. Thus we added conferences
                and team building to the list of our services.
              </p>
              <p className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
                Besides its picturesque panorama and unsurpassed natural beauty,
                the uMgababa coastal shore has historical significance as it was
                the only beach that was set aside for blacks during apartheid.
                This strategic location as well as our exceptional service make
                Coastal Beach Resort an ideal venue.
              </p>
            </div>
            <div className="flex justify-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="/entrance.jpeg"
                  alt="Resort Entrance"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4 tracking-wide">
              Our Core Values
            </h2>
            <div className="w-16 h-px bg-amber-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl text-center transition-all duration-500 transform hover:-translate-y-2 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-light text-slate-800 mb-4 tracking-wide">
                Excellence
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Delivering exceptional service and unforgettable experiences
                with attention to every detail
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl text-center transition-all duration-500 transform hover:-translate-y-2 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-light text-slate-800 mb-4 tracking-wide">
                Integrity
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Treating every customer as if they are the only client and
                winning their loyalty through honest service
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl text-center transition-all duration-500 transform hover:-translate-y-2 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Leaf className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-light text-slate-800 mb-4 tracking-wide">
                Sustainability
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Preserving our beautiful coastal environment while providing
                world-class hospitality services
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement Section */}
      <section className="py-20 relative overflow-hidden border-t border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-orange-100/50"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4 tracking-wide">
            Our Vision
          </h2>
          <div className="w-16 h-px bg-amber-600 mx-auto mb-12"></div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl">
            <p className="text-xl md:text-2xl leading-relaxed font-light text-slate-700">
              It is our vision to be able to be a power-house in the corporate
              and social events business and be able to give accommodation to
              all our clients on the resort by 2025.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Objectives Section */}
      <section className="py-20 bg-white/60 backdrop-blur-sm border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-8 tracking-wide">
                Mission Statement
              </h2>
              <div className="w-12 h-px bg-amber-600 mb-8"></div>
              <p className="text-lg text-slate-600 leading-relaxed mb-12">
                Treat every customer as if they are the only client and win
                their loyalty, repeat business as well as referrals.
              </p>

              <h3 className="text-2xl font-light text-slate-800 mb-6 tracking-wide">
                Our Objectives
              </h3>
              <div className="w-10 h-px bg-amber-600 mb-6"></div>
              <p className="text-lg text-slate-600 leading-relaxed">
                Dominate the events industry and transform it to a level where
                clients go about their business knowing that all their
                recreational and training needs are in the hands of a dedicated
                and passionate team that always gives them value for money.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="house.jpg"
                  alt="Resort House"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Facilities Section */}
      <section className="py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4 tracking-wide">
              Our Facilities & Amenities
            </h2>
            <div className="w-16 h-px bg-amber-600 mx-auto"></div>
          </div>

          {/* Accommodation Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { number: "38", label: "Accommodation Units" },
              { number: "26", label: "Units Completed" },
              { number: "11", label: "Single Bedroom Units" },
              { number: "7", label: "Family Chalets" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "fadeInUp 0.8s ease-out forwards",
                  opacity: 0,
                }}
              >
                <div className="text-4xl font-light text-amber-600 mb-2">
                  {stat.number}
                </div>
                <p className="text-slate-600 font-light">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Facilities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                icon: Bed,
                title: "Room Features",
                items: [
                  "Air conditioning",
                  "Private bathroom",
                  "Non-smoking rooms",
                  "Family rooms",
                ],
              },
              {
                icon: Waves,
                title: "Outdoor & Wellness",
                items: [
                  "Outdoor swimming pool",
                  "Kids' pool",
                  "Beachfront access",
                  "Sun loungers",
                ],
              },
              {
                icon: Utensils,
                title: "Food & Dining",
                items: [
                  "Restaurant",
                  "Bar",
                  "BBQ facilities",
                  "Kids meals available",
                ],
              },
              {
                icon: Briefcase,
                title: "Business Services",
                items: [
                  "Meeting facilities",
                  "Conference rooms",
                  "Daily housekeeping",
                  "Reception services",
                ],
              },
              {
                icon: Wifi,
                title: "Connectivity",
                items: [
                  "Free WiFi (all areas)",
                  "Free parking",
                  "Accessible parking",
                  "Desk in rooms",
                ],
              },
              {
                icon: Shield,
                title: "Safety & Security",
                items: [
                  "24-hour security",
                  "CCTV monitoring",
                  "Fire extinguishers",
                  "Key card access",
                ],
              },
              {
                icon: Activity,
                title: "Activities",
                items: [
                  "Beach access",
                  "Bike tours*",
                  "Team building",
                  "Additional charges apply*",
                ],
              },
              {
                icon: Home,
                title: "Living Amenities",
                items: [
                  "Refrigerator",
                  "Open all year",
                  "All ages welcome",
                  "English spoken",
                ],
              },
            ].map((facility, index) => {
              const IconComponent = facility.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.8s ease-out forwards",
                    opacity: 0,
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="text-white w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-light text-slate-800 tracking-wide">
                      {facility.title}
                    </h3>
                  </div>
                  <ul className="space-y-2 text-slate-600">
                    {facility.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-sm">
                        <span className="text-green-500 mr-2 text-xs">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto font-light">
                Built using traditional Thatch Roof design that appreciates the
                Zulu cultural homes, we seamlessly blend cultural heritage with
                modern structures to create a unique and authentic experience.
                Our swimming pool is open all year with shallow end access,
                making it perfect for families and guests of all ages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="py-20 bg-white/60 backdrop-blur-sm border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light text-slate-800 mb-8 tracking-wide">
                Our Future Vision
              </h2>
              <div className="w-12 h-px bg-amber-600 mb-8"></div>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  To become the leading events company (the Mecca of all events)
                  in Durban offering the best customer experience with a market
                  reach of the whole of South Africa within the next 2-3 years.
                </p>
                <p>
                  We hope to achieve this by increasing our accommodation units,
                  as well as introducing a variety of exciting ocean and dam
                  activities such as jet skiing, boat rides, archery, fishing,
                  suspension bridge walks and so forth.
                </p>
                <p>
                  We are committed to continuously upskilling our staff to
                  ensure exceptional service delivery.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="pool1.jpeg"
                  alt="Resort Pool"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-20 bg-gradient-to-br from-amber-100/60 to-orange-100/60 backdrop-blur-sm border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-light text-slate-800 mb-8 tracking-wide">
            Recognition & Achievement
          </h2>
          <div className="w-16 h-px bg-amber-600 mx-auto mb-12"></div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="text-6xl mb-6">⭐</div>
            <p className="text-xl text-slate-700 leading-relaxed font-light">
              Based on the completed structures, we have just finalized a 3 STAR
              GRADING with the Tourism Grading Council of South Africa.
            </p>
          </div>
        </div>
      </section>
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

export default About;
