# star-wars-people-list

A fullstack application needs to create a list from the Star Wars API https://swapi.dev/documentation#people

List of used technologies:
- Next.js
- Tailwind CSS

Expectations:  
- Overall
  - [x] The app needs to show a list from the API ( from the /people endpoint).
  - [x] The list has to be paginated.
  - [ ] An animation has to be shown until the data is successfully downloaded.
  - [x] We need to inform the user if the htpp request fails.
---
- Card
  - [ ] All movie characters have to be wrapped in a card.
  - [ ] All cards have the name of the character and a random picture from https://picsum.photos/ as the profile picture.
  - [ ] Card should be animated if the user hovers the mouse over.
---
- Modal
  - [ ] If we click on the card, a modal will pop up.
  - [ ] Modal has to store personal details.
---
- Search
  - [ ] There needs to be a search bar with a text input.
  - [ ] The user can search for names with this input.
---
- Optional
  - [ ] The search bar should be extended with two dropdown list. ('/films' and '/planets')
  - [ ] The above-mentioned dropdowns could work in one time.
  - [ ] Tests



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
