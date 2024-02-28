import express, { query } from "express";
import cors from "cors";
import "dotenv/config.js"; //temp, move this to repo

import questionRoutes from "./routes/question-service-routes.js";

import QuestionModel from "./model/question-model.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

// To handle CORS Errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // "*" -> Allow all links to access

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Browsers usually send this before PUT or POST Requests
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
    return res.status(200).json({});
  }

  // Continue Route Processing
  next();
});

app.use("/questions", questionRoutes);

app.get("/", (req, res, next) => {
  console.log("Sending Greetings!");
  res.json({
    message: "Hello World from question-service",
  });
});

// C: QUESTION CREATION ENDPOINT (PLEASE MOVE TO CONTROLLER)
app.post("/api/question", async (req, res) => {
  try {
    const question = await QuestionModel.create(req.body);
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default app;
