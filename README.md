# ShopZone — E-Commerce SPA
[Live link](https://e-commerce-gmmp.onrender.com)

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Language | TypeScript 5 |
| Build Tool | Vite 5 |
| Routing | React Router DOM v7 |
| Server State | TanStack React Query v5 |
| HTTP Client | Axios |
| Linting | ESLint + typescript-eslint + eslint-plugin-react-hooks |

---

## Project Structure

```
src/
├── Router/           # Route definitions
├── components/       # Feature components (ProductsList, ProductDetails, CartCard, …)
├── pages/            # Page-level wrappers (Products, ProductDetail, Cart, Home)
├── layout/           # Layout shell with Header + Outlet
├── context/          # CartContext — global cart state via React Context
├── config/           # Axios instance & React Query client setup
├── constants/        # Route paths, API endpoints, query keys, global config
├── dto/              # TypeScript interfaces for API shapes (Product, Cart, …)
├── types/            # Narrower type aliases (CartDetail, RatingCategory)
└── utils/            # Pure utility functions (debounce, throttle, discount, renderStars)
```

---

## Routes

| Path | Page | Description |
|---|---|---|
| `/` | Home | Redirects to `/products` |
| `/products` | Products | Product listing with search & pagination |
| `/products/:id` | ProductDetail | Full product view — images, specs, reviews |
| `/cart` | Cart | Cart items, quantity controls, order total |

All routes share a common layout that renders the persistent Header (with live cart badge) and a React Router `<Outlet>`.

---

## Getting Started

```bash
npm install
npm run dev
```

Requires a `.env` file with:

```
VITE_API_PATH=https://dummyjson.com
```

---

## Highlights

- Search is debounced (400 ms) so the API is only hit when the user stops typing.
- `search` and `page` are kept in the URL as query params — the listing survives a refresh or a shared link, and switching the search term resets the page back to 1 automatically.
- Cart state lives in a React Context with a `useCart()` hook, so no prop drilling. Adding to cart is capped at the product's stock value, enforced on the client without an extra request.
- API shapes are typed via a DTO layer, route paths live in constants, and React Query cache keys use an enum, no magic strings anywhere.
- The loading spinner uses a React Portal so it overlays correctly regardless of where it's triggered.
- ErrorBoundary for catching global run-time errors

## Improvements that can be done with extra time
- Filters in product listing page (this public API supports filters)
- Sorting in product listing page (this public API supports sorting)
- Toggle for different views in product listing (card,list view)
- Better error handling if API fails with reusable ErrorHandler component
- Backend based cart (this public API do not supports it though)
- Review section in product detail page
- Restriction on cart unless users logs in






