// // import express from "express";
// // import dotenv from "dotenv";
// // import path from "path";

// // import { connectDB } from "./config/db.js";
// // import productRoutes from "./routes/product.route.js";

// // dotenv.config();

// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // const __dirname = path.resolve();

// // app.use(express.json()); // allows us to accept JSON data in req.body

// // app.use("/api/products", productRoutes); // Mount product routes

// // if (process.env.NODE_ENV === "production") {
// //   app.use(express.static(path.join(__dirname, "/frontend/dist")));
// //   app.get("*", (req, res) => {
// //     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// //   });
// // }

// // app.listen(PORT, () => {
// //   connectDB();
// //   console.log(`Server started on port ${PORT}`);
// // });

// import express from "express";
// import dotenv from "dotenv";
// import path from "path";

// import { connectDB } from "./config/db.js";
// import productRoutes from "./routes/product.route.js";

// dotenv.config({ path: "./backend/.env" });

// const app = express();
// const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

// app.use(express.json());
// app.use("/api/products", productRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }

// const startServer = async () => {
//   try {
//     await connectDB();
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Server startup failed", error);
//     process.exit(1);
//   }
// };

// startServer();

import express from "express";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed", error);
    process.exit(1);
  }
};

startServer();
