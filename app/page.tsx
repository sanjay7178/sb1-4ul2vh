import { Button } from '@/components/ui/button';
import Link from 'next/link';
import EventList from '@/components/event-list';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Event Hosting</h1>
      <div className="flex justify-center space-x-4 mb-8">
        <Button asChild>
          <Link href="/events">Browse Events</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/auth/signin">Sign In</Link>
        </Button>
      </div>
      <EventList />
    </div>
  );
}