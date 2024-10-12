import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { registrations } from '@/lib/schema';
import { getServerSession } from 'next-auth/next';
import nodemailer from 'nodemailer';
import QRCode from 'qrcode';

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { eventId } = body;

    // Create registration
    const [registration] = await db.insert(registrations).values({
      userId: session.user.id,
      eventId,
    }).returning();

    // Generate QR code
    const qrCodeData = `${process.env.NEXT_PUBLIC_BASE_URL}/verify/${registration.id}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    // Send email with QR code
    const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER);

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: session.user.email,
      subject: 'Event Registration Confirmation',
      html: `
        <h1>Event Registration Confirmation</h1>
        <p>Thank you for registering for the event. Please use the QR code below for entry:</p>
        <img src="${qrCodeImage}" alt="QR Code" />
      `,
    });

    return NextResponse.json({ message: 'Registration successful' }, { status: 201 });
  } catch (error) {
    console.error('Error registering for event:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}