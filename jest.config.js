import nextJest from "next/jest.js";
import dotenv from "dotenv";

dotenv.config({
  path: ".env.development"
});

const createJestConfig = nextJest({
  dir: "./",
});

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>/"],
});

export default jestConfig;
