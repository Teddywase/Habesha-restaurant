# Habesha Restaurant

Habesha Restaurant is a React web application for exploring Ethiopian and Eritrean-inspired dishes, viewing dish details, building an order, and making a reservation.

The experience is centered around communal dining, traditional spices, teff injera, slow-cooked stews, tibs, kitfo, fasting-friendly dishes, and house beverages.

## Features

- Hero landing page with curated chef specials
- Filterable menu by category and searchable dish list
- Dish detail pages with images, descriptions, prices, and quantity controls
- Quick Add and Add to Order cart actions
- Persistent cart stored in browser localStorage
- Cart quantity management, item removal, and cart clearing
- Checkout page with order summary
- Reservation form
- Client-side registration, login, and logout flows
- Responsive layout for desktop and mobile screens

## Tech Stack

- React 19
- React Router
- Vite
- ESLint
- JSON data files for menu items and chef specials

## Getting Started

### Requirements

- Node.js and npm

### Install

From the project directory:

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will print the local development URL in the terminal, usually `http://localhost:5173`.

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

## Application Routes

| Route | Description |
| --- | --- |
| `/` | Home page and today's specials |
| `/menu` | Complete menu with search and category filters |
| `/menu/:dishId` | Details for a specific dish |
| `/cart` | Current order/cart |
| `/checkout` | Checkout and order summary |
| `/reservation` | Table reservation form |
| `/login` | Sign-in page |
| `/register` | Account registration page |

## Project Structure

```text
src/
	App.jsx                 Application routes and shared cart state
	Components/
		Header/               Navigation and account/cart controls
		Footer/               Site footer
		Main/
			Home/               Hero, specials, testimonials, and CTA sections
			Menu/               Searchable and filterable menu
			MenuDetail/         Individual dish details
			Cart/               Cart management
			CheckOut/           Checkout flow
			Reservation/        Reservation form
			Login/              Login form
			Register/           Registration form
	data/
		menu.json             Full menu data
		specials.json         Curated specials data
	assets/                 Food and restaurant images
```

## Data and Authentication Notes

This project currently uses browser localStorage rather than a backend service:

- `habesha-cart` stores the current cart
- `habesha-users` stores locally registered users
- `habesha-current-user` stores the signed-in user

These client-side authentication and checkout flows are intended for demonstration and development. A production deployment should replace them with a secure backend, server-side authentication, and a real payment/order service.

