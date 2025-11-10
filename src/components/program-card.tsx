
import type { Program } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Euro, Globe, Languages, Lightbulb, TrendingUp, TrendingDown, Plane, Building2, Beaker, Briefcase, Cpu, Code, Brush, BookOpen, HeartPulse, Scale, GraduationCap, Dumbbell, ShieldCheck, Soup, Cog, Bot, Anchor, Book, Atom, Landmark } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getProgramIcon } from '@/lib/program-data';

interface ProgramCardProps {
  program: Program;
}

const LanguageBadge = ({ lang }: { lang: Program['typicalLanguage'] }) => {
    let variant: 'default' | 'secondary' | 'outline' = 'secondary';
    let text = lang;
    if (lang === 'English') {
        variant = 'default';
        text = "English Taught"
    } else if (lang === 'English + Local') {
        variant = 'outline';
        text = "English + Local"
    }

    return <Badge variant={variant} className="capitalize">{text}</Badge>
}

export default function ProgramCard({ program }: ProgramCardProps) {
  const formatCost = (cost: number) => `€${(cost / 1000).toFixed(0)}k`;
  const Icon = getProgramIcon(program.subject);

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 rounded-xl border border-border/60">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
            <div className="flex items-center gap-4">
                <div className="bg-accent/10 text-accent p-3 rounded-lg">
                    <Icon className="h-6 w-6" />
                </div>
                <div>
                    <CardTitle className="text-lg font-bold font-heading">{program.subject}</CardTitle>
                    <Badge variant="outline" className="text-xs mt-1">{program.degreeLevel}</Badge>
                </div>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="space-y-3 text-sm text-foreground">
          <div className="flex items-center">
            <Euro className="h-4 w-4 mr-3 text-muted-foreground" />
            <span>Tuition: <strong>{formatCost(program.tuitionRangeEUR.min)} - {formatCost(program.tuitionRangeEUR.max)}</strong> / year</span>
          </div>
          <div className="flex items-start">
            <Globe className="h-4 w-4 mr-3 text-muted-foreground mt-0.5" />
             <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex flex-col items-start gap-1 cursor-help">
                            <span>Est. Total Cost:</span>
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="flex items-center gap-1.5"><TrendingDown className="h-3 w-3" /> E. Europe: {formatCost(program.estTotalCost.easternEurope.min)}+</Badge>
                                <Badge variant="secondary" className="flex items-center gap-1.5"><TrendingUp className="h-3 w-3"/> W. Europe: {formatCost(program.estTotalCost.westernEurope.min)}+</Badge>
                            </div>
                        </div>
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
      <CardFooter className="flex-shrink-0 flex justify-end gap-2 bg-secondary/30 p-4">
        <Button size="sm">
          View Universities
        </Button>
      </CardFooter>
    </Card>
  );
}
