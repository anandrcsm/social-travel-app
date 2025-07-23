import { useState } from 'react';
import { MapPin, Star, ExternalLink, Plus, ChevronDown, ChevronUp, Navigation } from 'lucide-react';
import { ExperienceCard as ExperienceCardType } from '../types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ExperienceCardProps {
  experience: ExperienceCardType;
  isExpanded?: boolean;
  onExpand?: () => void;
}

const categoryIcons = {
  accommodation: '🏨',
  food: '🍽️',
  events: '🎟️',
  activities: '🧗'
};

const categoryColors = {
  accommodation: 'bg-blue-50 text-blue-700 border-blue-200',
  food: 'bg-green-50 text-green-700 border-green-200',
  events: 'bg-purple-50 text-purple-700 border-purple-200',
  activities: 'bg-orange-50 text-orange-700 border-orange-200'
};

export function ExperienceCard({ experience, isExpanded = false, onExpand }: ExperienceCardProps) {
  const [addedToItinerary, setAddedToItinerary] = useState(false);

  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${categoryColors[experience.category]}`}
                  >
                    {categoryIcons[experience.category]} {experience.category}
                  </Badge>
                </div>
                <h4 className="font-semibold">{experience.title}</h4>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onExpand}
                className="p-1"
              >
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                {experience.location}
              </div>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500 fill-current" />
                {experience.rating.toFixed(1)}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              {experience.images.slice(0, 3).map((image, index) => (
                <ImageWithFallback
                  key={index}
                  src={image}
                  alt={`${experience.title} ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-4">
            <div>
              <h5 className="font-medium mb-2">Review</h5>
              <p className="text-sm text-muted-foreground">{experience.reviewSnippet}</p>
            </div>

            <div>
              <h5 className="font-medium mb-2">Moments</h5>
              <div className="space-y-3">
                {experience.moments.map((moment) => (
                  <div key={moment.id} className="flex gap-3">
                    <ImageWithFallback
                      src={moment.image}
                      alt="Moment"
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{moment.caption}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(moment.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <div>
                <p className="font-medium">{experience.cost}</p>
                <p className="text-xs text-muted-foreground">Total cost</p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Navigation size={14} />
                  Directions
                </Button>
                
                {experience.affiliateLink && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => window.open(experience.affiliateLink, '_blank')}
                  >
                    <ExternalLink size={14} />
                    Book
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant={addedToItinerary ? 'secondary' : 'default'}
                  onClick={() => setAddedToItinerary(!addedToItinerary)}
                  className="flex items-center gap-1"
                >
                  <Plus size={14} />
                  {addedToItinerary ? 'Added' : 'Add to Trip'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {!isExpanded && (
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-4">
              <span className="font-medium text-sm">{experience.cost}</span>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500 fill-current" />
                <span className="text-sm">{experience.rating.toFixed(1)}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              {experience.affiliateLink && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(experience.affiliateLink, '_blank');
                  }}
                >
                  <ExternalLink size={12} />
                  Book
                </Button>
              )}
              
              <Button
                size="sm"
                variant={addedToItinerary ? 'secondary' : 'default'}
                onClick={(e) => {
                  e.stopPropagation();
                  setAddedToItinerary(!addedToItinerary);
                }}
                className="flex items-center gap-1"
              >
                <Plus size={12} />
                {addedToItinerary ? 'Added' : 'Add'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}