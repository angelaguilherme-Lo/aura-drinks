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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Catalogue availability

The storefront normally reads the configured `NEXT_PUBLIC_API_URL`. If the API
is unreachable, times out after three seconds, returns an invalid response, or
returns a server error, it displays the original 16-product, four-collection
catalogue bundled in `src/lib/catalog/demo-catalog.json`. This snapshot was
recovered from `aura-backend/src/db/seedData.json` and uses the original images
under `public/images`. Update the snapshot alongside any demo catalogue changes.

Successful API results, including empty lists, and client errors such as 404
remain authoritative. Set `CATALOG_DEMO_FALLBACK=false` to disable recovery for
live commerce. Bundled products have `demo:` IDs, which the real order client refuses to submit.
The public checkout is now a self-contained shopping simulation; it never calls
the real order client. Authentication still requires a healthy backend.

Run `npm test` to check outage recovery, catalogue consistency, image paths,
API precedence, not-found behavior and the demo-order guard.

## Shopping sandbox

Add drinks to the cart and choose **Demo checkout**. No account is required.
The cart shows product images, editable quantities, and bundle savings: 5% for
3–5 bottles or 10% for 6+ bottles. Delivery is complimentary in the simulation.

Checkout has delivery, payment, review and confirmation screens. Fictional
delivery details are prefilled and a non-editable test card is supplied. Choose
**Decline payment — test retry** to demonstrate a declined payment, then change
the scenario to **Approve payment** and retry. No requests are made to a payment
provider or the order API, no email is sent, and no real purchase is created.

The cart and last simulated receipt persist in browser local storage. Delivery
form values are not persisted or transmitted. Use **Clear** in the cart or
**Start another demo purchase** on the receipt to reset the respective demo data.
If browser storage is unavailable, the flow continues in memory for that visit.
