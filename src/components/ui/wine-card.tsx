
import React from 'react';
import { cn } from '@/lib/utils';

export interface WineCardProps {
  name: string;
  type: string;
  region: string;
  year: string;
  price: string;
  description?: string;
  image?: string;
  badge?: string;
  className?: string;
  style?: React.CSSProperties;
}

const WineCard = ({
  name,
  type,
  region,
  year,
  price,
  description,
  image,
  badge,
  className,
  style,
}: WineCardProps) => {
  return (
    <div 
      className={cn(
        "wine-card bg-white rounded-lg overflow-hidden shadow-elegant",
        className
      )}
      style={style}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {badge && (
            <div className="absolute top-4 right-4 bg-wine-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {badge}
            </div>
          )}
        </div>
      )}
      <div className="p-5">
        <span className="text-sm text-wine-600 font-medium">{type} • {year}</span>
        <h3 className="text-lg font-bold font-serif mt-1 mb-2 text-gray-900">{name}</h3>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-600">{region}</span>
          <span className="text-wine-700 font-medium">{price}</span>
        </div>
        {description && (
          <p className="text-sm text-gray-500 line-clamp-3">{description}</p>
        )}
      </div>
    </div>
  );
};

export default WineCard;
