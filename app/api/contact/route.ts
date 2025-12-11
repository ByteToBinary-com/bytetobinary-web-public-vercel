import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, company, phone } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message' },
        { status: 400 }
      );
    }

    // Validate maximum length constraints
    const MAX_NAME_LENGTH = 100;
    const MAX_EMAIL_LENGTH = 254;
    const MAX_MESSAGE_LENGTH = 2000;
    if (
      typeof name !== 'string' || name.length > MAX_NAME_LENGTH ||
      typeof email !== 'string' || email.length > MAX_EMAIL_LENGTH ||
      typeof message !== 'string' || message.length > MAX_MESSAGE_LENGTH
    ) {
      return NextResponse.json(
        { error: `Field length exceeded: name (max ${MAX_NAME_LENGTH}), email (max ${MAX_EMAIL_LENGTH}), message (max ${MAX_MESSAGE_LENGTH})` },
        { status: 400 }
      );
    }
    // Save to database
    const contact = await prisma.contactForm.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json(
      { success: true, id: contact.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving contact form:', error);
    return NextResponse.json(
      { error: 'Failed to save contact form' },
      { status: 500 }
    );
  }
}
