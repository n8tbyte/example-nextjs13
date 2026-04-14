# Next.js 13 Rendering Methods

## Client-Side Rendering (CSR)
- **How it works**: Browser renders page after fetching from server
- **Pros**: Flexible, easy to develop, supports dynamic content
- **Cons**: Slower load times, SEO challenges

## Server-Side Rendering (SSR)
- **How it works**: Server renders page before sending to browser
- **Pros**: Fast, good for SEO, supports dynamic content
- **Cons**: Harder to develop, harder to update

## Static Site Generation (SSG)
- **How it works**: Server renders page at build time
- **Pros**: Fastest, good for SEO, easy to update
- **Cons**: Not flexible, no dynamic content

## Incremental Static Regeneration (ISR)
- **How it works**: Renders at build time + can regenerate at runtime
- **Pros**: Fast, good for SEO, flexible, supports dynamic content
- **Cons**: Complex to implement

## File Structures

```
pages/
├── csr/                ✅ CSR (Client-Side Rendering)
│   ├── index.js        ✅ Infinite scroll + pagination
│   └── [id].js         ✅ Client-side fetch
├── dynamics/
│   ├── ssg/            ✅ SSG (Static Site Generation)
│   │   ├── index.js    ✅ No revalidate
│   │   └── [id].js     ✅ fallback: "blocking", notFound
│   ├── isr/            ✅ ISR (Incremental Static Regeneration)
│   │   ├── index.js    ✅ revalidate: 60
│   │   └── [id].js     ✅ revalidate: 60, fallback: "blocking"
│   └── ssr/            ✅ SSR (Server-Side Rendering)
│       ├── index.js    ✅ getServerSideProps
│       └── [id].js     ✅ getServerSideProps
└── static/             ✅ Static (SSG with limit)
    ├── index.js        ✅ Pre-render 20 posts
    └── [id].js         ✅ Limit to 10, fallback: "blocking"
```

## Use Cases

| Use Case | Recommended Method |
|----------|-------------------|
| Highly dynamic, real-time data | CSR or SSR |
| SEO-critical content | SSR, SSG, or ISR |
| Static content that rarely changes | SSG |
| Large site with frequently updated content | ISR |
| Simple dashboard or admin panel | CSR |
| Blog or documentation site | SSG |
| E-commerce product listing | ISR or SSG |
| User profile page after login | CSR |
| News or media website | ISR |
| Marketing landing page | SSG |
| Real-time stock prices | CSR |
| Social media feed | CSR |
| Corporate website | SSG |
| Job board with frequent posts | ISR |
| Weather dashboard | CSR or SSR |
| Forum or community site | SSR |
| Recipe or cooking blog | SSG |
| Online course platform | ISR |
| Portfolio website | SSG |
| Chat application | CSR |
| Hotel booking availability | CSR or SSR |
| Wiki or knowledge base | SSG |
| Cryptocurrency tracker | CSR |
| Event listing website | ISR |
| Restaurant menu | SSG |
| Product review section | CSR |
| Job application form | CSR |
| Real estate listings | ISR |
| Music or podcast platform | CSR or SSR |
| Government public data portal | SSG or ISR |
| Sports scores and updates | CSR |
| Flight status tracker | CSR |
| Coupon or deals website | ISR |
| Legal or policy documents | SSG |
| Multi-language site | SSG or ISR |
| SaaS pricing page | SSG |
| User dashboard with personal data | CSR |
| API documentation | SSG |
| Forum thread detail page | SSR |
| Search results page | SSR or CSR |
| Checkout or payment page | SSR |
| Email inbox interface | CSR |
| Admin analytics dashboard | CSR |
| Product comparison tool | CSR |
| Countdown or timer page | SSG |
| Poll or survey page | CSR |
| Notification center | CSR |
| User settings page | CSR |
| File browser interface | CSR |
| Calendar or scheduling app | CSR or SSR |

## Quick Selection Rules

| If you need... | Choose... |
|----------------|-----------|
| Fastest possible load time | SSG |
| SEO + dynamic data | SSR or ISR |
| Real-time user-specific data | CSR |
| Balance of speed and freshness | ISR |
| Zero server costs | SSG |
| Always fresh data | CSR or SSR |
| Handle millions of pages | SSG or ISR |