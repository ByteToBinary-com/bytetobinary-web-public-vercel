import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { rateLimit, getRateLimitHeaders } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = req.headers.get('x-forwarded-for') || 
               req.headers.get('x-real-ip') || 
               'unknown';
    
    // Apply rate limit: 5 requests per minute per IP
    const rateLimitResult = rateLimit(ip, 5, 60000);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult)
        }
      );
    }

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
      { 
        status: 201,
        headers: getRateLimitHeaders(rateLimitResult)
      }
    );
  } catch (error) {
    console.error('Error saving contact form:', error);
    return NextResponse.json(
      { error: 'Failed to save contact form' },
      { status: 500 }
    );
  }
}
