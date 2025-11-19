
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Clapperboard, Video } from "lucide-react";
import Link from "next/link";
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";

export default function WebinarsPage() {

    // In a real application, you would replace this with your actual Zoom meeting link.
    const webinarLink = "https://zoom.us/j/1234567890";

    return (
        <div className="container mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col items-center text-center">
                <motion.div
                    animate={{ scale: [1, 1.05, 1], color: ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--primary))'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
                    className="bg-primary/10 rounded-full p-6 mb-8 w-24 h-24 flex items-center justify-center"
                >
                    <Clapperboard className="h-12 w-12" />
                </motion.div>
                <h1 className="text-4xl font-bold font-heading mb-4">Northway Webinars</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                    Join our live sessions to get expert advice, ask questions, and learn everything you need to know about studying abroad debt-free.
                </p>
            </div>

            <Card className="shadow-lg border-border/60">
                <CardHeader>
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div>
                            <Badge variant="secondary" className="mb-2">Upcoming Webinar</Badge>
                            <CardTitle className="text-2xl font-bold">The Ultimate Guide to Affordable European Degrees</CardTitle>
                            <CardDescription className="mt-2">Thursday, November 7th, 2024 at 1:00 PM (EST)</CardDescription>
                        </div>
                        <div className="shrink-0">
                             <Button size="lg" className="w-full md:w-auto font-bold" asChild>
                                <Link href={webinarLink} target="_blank" rel="noopener noreferrer">
                                    <Video className="mr-2 h-5 w-5" />
                                    Join Live Webinar
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-foreground/80 border-t pt-6 mt-6">
                        <p>In this live session, our founders will walk you through:</p>
                        <ul>
                            <li>The top 5 countries for high-quality, low-cost education in 2025.</li>
                            <li>A live demo on how to find English-taught programs under $5,000/year.</li>
                            <li>Case studies from students who are now studying abroad with zero debt.</li>
                            <li>Live Q&A: Get your most pressing questions answered by the experts.</li>
                        </ul>
                        <p>This is a must-attend event for any student or parent who thinks an international education is out of reach. We'll show you the exact roadmap.</p>
                    </div>
                </CardContent>
            </Card>

             <div className="text-center mt-12">
                <p className="text-muted-foreground">Stay tuned for more upcoming events!</p>
            </div>
        </div>
    );
}
