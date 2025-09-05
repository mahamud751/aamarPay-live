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

## Server Call Optimizations

This project implements several optimizations for server calls to improve performance and user experience:

### Caching Strategy

- In-memory caching for event data with 5-minute expiration
- Automatic cache invalidation on data updates
- Request deduplication to prevent multiple simultaneous requests

### Retry Mechanism

- Exponential backoff retry logic for failed API calls
- Configurable retry attempts and delays
- Automatic retry on transient network errors

### Enhanced Error Handling

- Detailed error logging and tracking
- Request duration monitoring
- Improved error messages for better debugging

For detailed information about the optimizations, see [OPTIMIZATION_GUIDE.md](src/services/OPTIMIZATION_GUIDE.md).

## Testing

The project includes unit tests for the caching and retry mechanisms:

```bash
npm test
```

For more information about testing, see [TESTING.md](src/services/TESTING.md).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# next-js-common-file-setup
