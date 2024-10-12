import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { events } from '@/lib/schema';

export async function GET() {
  try {
    const allEvents = await db.select().from(events);
    return NextResponse.json(allEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newEvent = await db.insert(events).values(body).returning();
    return NextResponse.json(newEvent[0], { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}