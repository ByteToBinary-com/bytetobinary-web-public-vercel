This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Setup

This project requires the following environment variables. Copy `.env.example` to `.env.local` and fill in the values:

- `DATABASE_URL`: PostgreSQL database connection string
- `UPSTASH_REDIS_REST_URL`: Upstash Redis REST URL for rate limiting (get from [Upstash Console](https://console.upstash.com/))
- `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis REST token for rate limiting

### Rate Limiting

The contact form API (`/api/contact`) implements rate limiting to prevent spam and abuse:

- **Limit**: 5 requests per 60 seconds per IP address
- **Algorithm**: Sliding window
- **Headers**: All responses include rate limit information via HTTP headers:
  - `X-RateLimit-Limit`: Maximum requests allowed in the window
  - `X-RateLimit-Remaining`: Remaining requests in the current window
  - `X-RateLimit-Reset`: Timestamp when the rate limit resets

When rate limit is exceeded, the API returns HTTP 429 (Too Many Requests) with a JSON response indicating when the limit resets.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
