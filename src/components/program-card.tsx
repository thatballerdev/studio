
import type { Program } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Euro, Lightbulb } from 'lucide-react';
import { getProgramIcon } from '@/lib/program-data';

interface ProgramCardProps {
  program: Program;
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
      <CardContent className="flex-grow space-y-4 pt-4">
        <div className="space-y-3 text-sm text-foreground">
          <div className="flex items-center">
            <Euro className="h-4 w-4 mr-3 text-muted-foreground" />
            <span>Tuition: <strong>{formatCost(program.tuitionRangeEUR.min)} - {formatCost(program.tuitionRangeEUR.max)}</strong> / year</span>
          </div>
        </div>
        
        <div className="text-xs italic text-muted-foreground pt-3 border-t border-border/60 flex items-start gap-2">
          <Lightbulb className="h-4 w-4 mt-0.5 shrink-0"/>
          <span>{program.notes}</span>
        </div>
      </CardContent>
    </Card>
  );
}
