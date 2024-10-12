import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Markdown from 'markdown-to-jsx';

// ... (rest of the component code)

export async function generateStaticParams() {
  // In a real application, you would fetch all event IDs here
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}