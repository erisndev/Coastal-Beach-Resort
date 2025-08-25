import React from "react";
import { ExperienceCard } from "@/components/ExperienceCard.jsx";

export function Section({ title, subtitle, items }) {
  return (
    <section className="py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4 tracking-wide">
          {title}
        </h2>

        <p className="mt-4 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Experience Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
        {items.map((item) => (
          <div key={item.id}>
            <ExperienceCard
              imageUrl={item.image}
              imgAltTitle={item.imageTitle}
              title={item.title}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
