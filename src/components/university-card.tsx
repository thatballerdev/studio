
import Image from 'next/image';
import { DollarSign, Star, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { University, FeaturedUniversity } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getFlagEmoji } from '@/lib/utils';
import { Button } from './ui/button';

type UniversityCardProps = {
  university: FeaturedUniversity;
};

export default function UniversityCard({ university }: UniversityCardProps) {
  const isPlaceholder = university.image_source === 'placeholder';
  const sourceUrl = university.verified_sources && university.verified_sources.length > 0 ? university.verified_sources[0] : '#';
  const aiHint = university.unsplash_queries && university.unsplash_queries.length > 0 ? university.unsplash_queries[0] : 'university campus';


  return (
    <Card className="flex flex-col h-full w-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card rounded-xl border border-border/60">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={university.image_url}
            alt={university.alt_text}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint={aiHint}
          />
          {isPlaceholder && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-4 text-white">
              {/* The placeholder URL is the image, so we add text on top */}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white p-2">
            <CardTitle className="text-2xl [text-shadow:0_2px_4px_rgba(0,0,0,0.7)]">{university.institution}</CardTitle>
            <CardDescription className="text-gray-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)] flex items-center mt-1">
              <span className="text-xl mr-2">{university.flag}</span>
              {university.city}, {university.country}
            </CardDescription>
          </div>
          {university.premium && (
            <Badge variant="destructive" className="absolute top-4 right-4">Premium</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4 flex-grow">
        <div className="flex items-center text-lg font-semibold text-primary">
            <DollarSign className="h-5 w-5 mr-2" />
            <span>{university.tuition_estimate_usd_per_year} / year</span>
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
        <p className="text-sm italic text-muted-foreground pt-3 border-t">"{university.quote}"</p>
      </CardContent>
       <CardFooter className="flex-shrink-0 flex justify-between gap-2 bg-secondary/30 p-4">
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm">Verify Source</Button>
        </a>
      </CardFooter>
    </Card>
  );
}
