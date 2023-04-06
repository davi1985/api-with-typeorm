import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import "module-alias/register";

dotenv.config();

import "@/database/connection";
import { routes } from "@/routes";

const PORT = process.env.APPLICATION_PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () =>
  console.log(`Server running in http://localhost:${PORT}`)
);
