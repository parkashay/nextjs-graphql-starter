import type { CodegenConfig } from "@graphql-codegen/cli";

import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const schema = process.env.API_URL;

const config: CodegenConfig = {
  overwrite: true,
  schema,
  documents: ["src/graphql/**/*.graphql"],
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
};
export default config;
