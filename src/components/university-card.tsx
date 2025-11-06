import Image from 'next/image';
import { DollarSign, Star } from 'lucide-react';
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
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          {placeholderImage && (
            <Image
              src={placeholderImage.imageUrl}
              alt={`Campus of ${university.name}`}
              fill
              className="object-cover"
              data-ai-hint={placeholderImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <CardTitle className="text-2xl font-headline text-shadow">{university.name}</CardTitle>
            <CardDescription className="text-gray-200 text-shadow-sm flex items-center">
              <span className="text-xl mr-2">{getFlagEmoji(university.countryCode)}</span>
              {university.country}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <p className="italic text-muted-foreground">"{university.motto}"</p>
        <div className="flex items-center text-lg font-semibold text-accent">
          {university.id === '1' ? (
            <span>€2,000 - €6,000 / year (est.)</span>
          ) : university.id === '2' ? (
            <span>€2,000 - €10,000 / year for non-medical fields (est.)</span>
          ) : university.id === '3' ? (
            <span>€726.72 per semester for non-medical fields</span>
          ) : (
            <>
              <DollarSign className="h-5 w-5 mr-2" />
              <span>{university.annualCost.toLocaleString()} / year (est.)</span>
            </>
          )}
        </div>
        <div>
          <h4 className="font-semibold mb-2 flex items-center">
            <Star className="h-4 w-4 mr-2 text-yellow-500 fill-yellow-500" />
            Highlights
          </h4>
          <div className="flex flex-wrap gap-2">
            {university.highlights.map((highlight) => (
              <Badge key={highlight} variant="secondary">{highlight}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
