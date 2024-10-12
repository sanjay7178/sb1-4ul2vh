import EventList from '@/components/event-list';

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">All Events</h1>
      <EventList />
    </div>
  );
}