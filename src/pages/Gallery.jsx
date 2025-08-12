import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import grouped media arrays
import heroImage from "../Images/heroImage";
import { videos } from "../Videos/videos";
import { accommodations } from "../Images/accommodations";
import { experiences } from "../Images/experiences";
import { nature } from "../Images/nature";
import { restaurant } from "../Images/restaurant";

export const Gallery = () => {
  const sections = [
    {
      key: "accommodations",
      title: "Luxury Accommodations",
      items: accommodations,
    },
    {
      key: "experiences",
      title: "Experiences & Amenities",
      items: experiences,
    },
    { key: "nature", title: "Nature & Surroundings", items: nature },
    { key: "restaurant", title: "Restaurant & Bar", items: restaurant },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="text-center z-10 px-4">
          <h1 className="text-6xl md:text-8xl font-extralight text-white mb-6 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_0.5s_forwards]">
            Our Visual
          </h1>
          <h1 className="text-6xl md:text-8xl font-light text-white mb-8 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_1s_forwards]">
            Journey
          </h1>
          <div className="w-24 h-px bg-white mx-auto opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cinematic Views */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4 tracking-wide">
              Cinematic Views
            </h2>
            <div className="w-16 h-px bg-amber-600 mx-auto"></div>
          </div>

          <div className="max-w-5xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {videos.map((video, index) => (
                  <CarouselItem key={index}>
                    <div className="px-4">
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-2">
                        <div className="aspect-video overflow-hidden rounded-xl">
                          <video
                            src={video.src}
                            controls
                            className="w-full h-full object-cover"
                            poster={heroImage}
                          />
                        </div>
                        <div className="p-6 text-center">
                          <h4 className="text-2xl font-light text-slate-800 mb-3">
                            Coastal Beach Resort
                          </h4>
                          <p className="text-slate-600 leading-relaxed">
                            {video.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="border-0 bg-white/90 hover:bg-white shadow-lg -left-6" />
              <CarouselNext className="border-0 bg-white/90 hover:bg-white shadow-lg -right-6" />
            </Carousel>
          </div>
        </section>

        {/* All Sections */}
        {sections.map((section, index) => (
          <SectionWithLoadMore
            key={section.key}
            title={section.title}
            items={section.items}
            loadStep={6}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

// Section with its own Load More
const SectionWithLoadMore = ({ title, items, loadStep, index }) => {
  const initialVisible = loadStep;
  const [visibleCount, setVisibleCount] = useState(initialVisible);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + loadStep, items.length));
      setIsLoading(false);
    }, 500);
  };

  const allLoaded = visibleCount >= items.length;

  return (
    <section
      className={`py-20 ${index < 3 ? "border-b border-slate-200" : ""}`}
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4 tracking-wide">
          {title}
        </h2>
        <div className="w-16 h-px bg-amber-600 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.slice(0, visibleCount).map((src, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            style={{
              animationDelay: `${(i % loadStep) * 100}ms`,
              animation:
                i >= visibleCount - loadStep
                  ? "fadeInUp 0.6s ease-out forwards"
                  : "none",
            }}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={src}
                alt={`${title} ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <p className="text-sm font-medium">
                {title} View {i + 1}
              </p>
            </div>
          </div>
        ))}
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
                View More
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </>
            )}
          </Button>
        </div>
      )}
    </section>
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

export default Gallery;
