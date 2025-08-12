import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ExperienceCard({
  imageUrl,
  imgAltTitle,
  title,
  description,
  buttonText,
  onClick,
}) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center bg-white pt-0">
        <div className="relative w-full h-48 sm:h-56">
          <img
            src={imageUrl}
            alt={imgAltTitle}
            className="w-full h-full object-cover rounded-t-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-teal-700/20 rounded-t-xl" />
        </div>
        <CardHeader className="px-4 pt-4">
          <CardTitle className="text-lg sm:text-xl font-semibold text-teal-700">
            {title}
          </CardTitle>
          <CardDescription className="mt-2 text-sm sm:text-base text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="px-4 pb-4">
          <div className="w-full active:scale-95 transition-transform duration-150">
            <Button
              className="w-full text-sm sm:text-base transition-all duration-300 hover:bg-teal-600 hover:text-white hover:scale-[1.02]"
              variant="outline"
              onClick={onClick}
            >
              {buttonText}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
