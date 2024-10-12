import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { registrations } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const registrationId = parseInt(params.id);
    const [registration] = await db.select().from(registrations).where(eq(registrations.id, registrationId));

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    if (registration.verified) {
      return NextResponse.json({ message: 'Registration already verified' });
    }

    await db.update(registrations).set({ verified: true }).where(eq(registrations.id, registrationId));

    return NextResponse.json({ message: 'Registration verified successfully' });
  } catch (error) {
    console.error('Error verifying registration:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}