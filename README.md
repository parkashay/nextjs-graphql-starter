## NextJS and Graphql Starter

Welcome to the Next.js & GraphQL Starter! This repository serves as a boilerplate for building applications with Next.js 14 and GraphQL, providing all the essential setups to get you started quickly

### Prerequisites

    - Node.js (>=18.0)
    - npm, yarn, pnpm
    - git

### Installation

    - clone the repo
    - cd nextjs-graphql-starter
    - `npm install` or `pnpm install` or `yarn`
    - copy env.example to .env

### Folder Structure

```
    nextjs-graphql-starter/
    ├── public/
    │ ├── favicon.ico
    │ └── ...
    ├── src/
    │ ├── app/
    │ ├── components/
    │ ├── graphql/
    │ │ ├── queries/
    │ │ ├── mutations/
    | | └── fragments/
    │ ├── styles/
    │ └── lib/
    | | └── providers/
    | └── utils/
    ├── .eslintrc.js
    ├── .gitignore
    ├── .prettierrc
    ├── next.config.js
    ├── package.json
    └── tsconfig.json
```

### Instructions

- keep your graphql files (queries, mutations and fragments) inside /src/graphql directory with their respective folders.
- Add your api url in the .env file.
- generate your graphql schema with command `pnpm run codegen` or `npm run codegen` or `yarn codegen`
- generated code will be in the /src/generated directory in graphql.ts file
- use the /lib/providers directory to define your functions to make api calls
