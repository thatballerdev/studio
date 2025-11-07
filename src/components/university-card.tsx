import Image from 'next/image';
import { DollarSign, Star, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { University } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getFlagEmoji } from '@/lib/utils';

interface UniversityCardProps {
  university: University;
}

export default function UniversityCard({ university }: UniversityCardProps) {
  const placeholderImage = PlaceHolderImages.find(p => p.id === university.imageId);

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          {placeholderImage && (
            <Image
              src={placeholderImage.imageUrl}
              alt={`Campus of ${university.name}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint={placeholderImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white p-2">
            <CardTitle className="text-2xl [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">{university.name}</CardTitle>
            <CardDescription className="text-gray-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] flex items-center mt-1">
              <span className="text-xl mr-2">{getFlagEmoji(university.countryCode)}</span>
              {university.country}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center text-lg font-semibold text-primary">
            <DollarSign className="h-5 w-5 mr-2" />
            <span>~${university.annualCost.toLocaleString()} / year</span>
        </div>
        <div>
          <h4 className="font-semibold mb-2 flex items-center text-sm text-foreground/80">
            <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
            Highlights
          </h4>
          <div className="flex flex-wrap gap-2">
            {university.highlights.map((highlight) => (
              <Badge key={highlight} variant="secondary">{highlight}</Badge>
            ))}
          </div>
        </div>
        <p className="text-sm italic text-muted-foreground pt-2 border-t">"{university.motto}"</p>
      </CardContent>
    </Card>
  );
}