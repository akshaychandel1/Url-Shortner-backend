import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes"
import urlRoutes from "./routes/url.routes"
import contactRoutes from "./routes/contact.routes";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://url-shortner-frontend-pied.vercel.app",
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));

// Authentication Routes
app.use("/api/auth", authRoutes);

// Url Shortner Routes
app.use('/api/url', urlRoutes)

// Nodemailer
app.use(
    "/api/contact", contactRoutes);

app.get("/", (req,res)=>{
    res.status(200).json({
        success:true,
        message: "URL Shortner Api is Running",
    });
});

export default app;