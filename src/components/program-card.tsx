import type { Program } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Euro, Globe, Languages, Lightbulb, Users, FileText } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ProgramCardProps {
  program: Program;
}

const LanguageBadge = ({ lang }: { lang: Program['typicalLanguage'] }) => {
    let variant: 'default' | 'secondary' | 'outline' = 'secondary';
    let text = lang;
    if (lang === 'English') {
        variant = 'default';
        text = "English Taught"
    }
    if (lang === 'English + Local') {
        variant = 'outline';
        text = "English + Local"
    }

    return <Badge variant={variant} className="capitalize">{text}</Badge>
}

export default function ProgramCard({ program }: ProgramCardProps) {
  const formatCost = (cost: number) => `€${(cost / 1000).toFixed(0)}k`;

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 rounded-xl border border-border/60">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-xl font-bold font-heading">{program.subject}</CardTitle>
            <Badge variant="outline" className="text-sm whitespace-nowrap">{program.degreeLevel}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="space-y-2 text-sm text-foreground">
          <div className="flex items-center">
            <Euro className="h-4 w-4 mr-3 text-muted-foreground" />
            <span>Tuition: <strong>{formatCost(program.tuitionRangeEUR.min)} - {formatCost(program.tuitionRangeEUR.max)}</strong> / year</span>
          </div>
          <div className="flex items-center">
            <Globe className="h-4 w-4 mr-3 text-muted-foreground" />
             <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span className="flex items-center gap-2 cursor-help">
                            Est. Total Cost: 
                            <Badge variant="secondary">E. Europe: {formatCost(program.estTotalCost.easternEurope.min)}</Badge>
                            <Badge variant="secondary">W. Europe: {formatCost(program.estTotalCost.westernEurope.min)}</Badge>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Estimated total annual cost including living expenses.</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center">
             <Languages className="h-4 w-4 mr-3 text-muted-foreground" />
             <LanguageBadge lang={program.typicalLanguage} />
          </div>
        </div>
        
        <div className="text-xs italic text-muted-foreground pt-3 border-t border-border/60 flex items-start gap-2">
          <Lightbulb className="h-4 w-4 mt-0.5 shrink-0"/>
          <span>{program.notes}</span>
        </div>
      </CardContent>
      <CardFooter className="flex-shrink-0 flex justify-end gap-2">
        <Button variant="ghost" size="sm">
            <Bookmark className="mr-2 h-4 w-4"/>
            Save
        </Button>
        <Button size="sm">
          View Universities
        </Button>
      </CardFooter>
    </Card>
  );
}
