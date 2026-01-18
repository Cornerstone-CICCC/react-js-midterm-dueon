<<<<<<< HEAD
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/LaIhohPu)
# 🛒 React JS - Midterm Project

**Goal:** Design and create a shopping web application using **React**, **Tailwind CSS**, **NodeJS**, and **Express** with login and sign-up functionality.

🎯 **Bonus Challenge:** Integrate Stripe Checkout for payments!

## 📌 Instructions

1. **Decide** on the shopping website idea you or your team will build. Example: clothing shop, tech gadgets store, etc.
2. **Design** your user interface on [Figma](https://figma.com) before coding.
3. **Set up** your backend server with Express and connect it to a database (MongoDB, PostgreSQL, Firebase, or Supabase are all fine).
4. **Build** your frontend using React and Tailwind CSS based on your Figma design.
5. **Test** your login, sign-up, and shopping flows.
6. **Commit & push** your changes regularly with clear messages.

## 🔧 Project Requirements

### 🖼️ Frontend

- Built using **ReactJS** and **Tailwind CSS**
- Use UI libraries like [shadcn/ui](https://ui.shadcn.com) or [HeroUI](https://heroui.com/) if helpful
- Fully responsive layout (desktop & mobile)
- Pages/Routes to include but not limited to:
  - Home
  - Products (List & Detail)
  - Cart
  - Login & Signup
  - Admin Dashboard (Admin-only)
  - Checkout (optional)

### 🛠️ Backend

- Use **NodeJS** and **Express** to create your API
- Use any database of your choice (e.g., **MongoDB**, **Firebase**, **Supabase**, **PostgreSQL**)
- Implement user **roles**:

  - **User**: can browse products, manage their cart, and checkout
  - **Admin**: can add, edit, and delete products

- Store product, user, and cart data
- Implement **CRUD** operations for products

### 🧩 Functionality

- User **sign-up** and **login**
- Role-based access:
  - Regular users can view products, add to cart, and checkout
  - Admin users can manage products via an admin dashboard
- View cart items and total price
- All data should be stored and retrieved from the database

## 💳 Bonus: Stripe Checkout

Integrate [Stripe Checkout](https://stripe.com/docs/checkout) to allow users to simulate or make real purchases. You can use Stripe test mode for development.

- Use the `stripe` npm package on the backend
- Add a “Checkout” button that redirects users to Stripe Checkout
- No real money needs to be charged

Good luck! 💻🎉
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
>>>>>>> 28c459b (frontend files temporary complete)
