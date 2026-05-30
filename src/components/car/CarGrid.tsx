"use client";

import type { Car } from "@/types";
import { CarCard } from "./CarCard";

interface CarGridProps {
  cars: Car[];
  onDetail: (id: number) => void;
}

export function CarGrid({ cars, onDetail }: CarGridProps) {
  return (
    <div className="premium-grid">
      {Array.isArray(cars) && cars.map((car) => (
        <CarCard key={car.id} car={car} onDetail={onDetail} />
      ))}
    </div>
  );
}
