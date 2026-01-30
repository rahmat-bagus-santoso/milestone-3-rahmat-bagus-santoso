[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/2EJ5Xvqu)

# FakeStore - Next.js Products Listing & Routing Demo
This project demonstrates core Next.js concepts such as routing, data fetching strategies (CSR, SSR, SSG), and component-based UI development as part of Module 4.

### Live Demo
**Vercel** [click here](https://milestone-3-rahmat-bagus-santoso.vercel.app/)

## Features
- Product Listing page (Home)
- Product detail page with dynamic routing
- Client-side rendering (CSR) for product listing
- Server-side rendering (SSR) for product detail
- Static site generation (SSG) for static page

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- FakeStore API (Platzi - EscuelaJS)

## Project Structure
```
.
app/
├── page.tsx
│
├── about/
│     └── page.tsx
│
├── components/
│     ├── Footer.tsx
│     ├── Header.tsx
│     ├── ProductCard.tsx
│     └── ProductGrid.tsx
│
├── lib/
│     └── api.ts
│
├── product/[id]/
│     └── page.tsx
│
├── types/
│     └── product.ts
│
└── Readme.md

```
## Tools Used
- **Framework:** Next.Js
- **Styling:** Tailwind CSS
- **Language:** Typescript
- **Development Environment:** Github Codespaces
- **Development Assistance:** ChatGPT

## Screenshots
![products page](./public/assets/productspage.png)
![product detail](./public/assets/productdetail.png)
![ssg page](./public/assets/ssg.png)

## Getting Started
```
npm run install
npm run dev

```
