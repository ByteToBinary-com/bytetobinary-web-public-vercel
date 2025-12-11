import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import ratelimit from '@/lib/ratelimit';

export async function POST(req: NextRequest) {
  // Get IP address for rate limiting
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'anonymous';
  
  // Check rate limit
  let rateLimitResult;
  let rateLimitSuccess = true;
  try {
    rateLimitResult = await ratelimit.limit(ip);
  } catch (error) {
    console.error('Rate limiting error:', error);
    // If rate limiting fails, allow the request to proceed without rate limit info
    rateLimitSuccess = false;
    rateLimitResult = { success: true, limit: 0, reset: 0, remaining: 0 };
  }
  
  const { success, limit, reset, remaining } = rateLimitResult;
  
  if (!success) {
    return NextResponse.json(
      { 
        error: 'Too many requests. Please try again later.',
        limit,
        reset: new Date(reset).toISOString(),
        remaining
      },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        }
      }
    );
  }

  // Helper to add rate limit headers conditionally
  const addRateLimitHeaders = (headers: Record<string, string> = {}) => {
    if (rateLimitSuccess) {
      return {
        ...headers,
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      };
    }
    return headers;
  };

  try {
    const body = await req.json();
    const { name, email, message, company, phone } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message' },
        { 
          status: 400,
          headers: addRateLimitHeaders()
        }
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
        headers: addRateLimitHeaders()
      }
    );
  } catch (error) {
    console.error('Error saving contact form:', error);
    return NextResponse.json(
      { error: 'Failed to save contact form' },
      { 
        status: 500,
        headers: addRateLimitHeaders()
      }
    );
  }
}
