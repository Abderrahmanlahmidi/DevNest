import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { userTypeDefs } from "./graphql/schemas/user.schema.ts";
import { userResolvers } from "./graphql/resolvers/user.resolver.ts";
import { skillResolvers } from "./graphql/resolvers/skill.resolver.ts";
import { skillTypeDefs } from "./graphql/schemas/skill.schema.ts";
import { projectResolvers } from "./graphql/resolvers/project.resolver.ts";
import { projectTypeDefs } from "./graphql/schemas/project.schema.ts";
import { experienceTypeDefs } from "./graphql/schemas/experience.schema.ts";
import { experienceResolvers } from "./graphql/resolvers/experience.resolver.ts";
import { competenceResolvers } from "./graphql/resolvers/competence.resolver.ts";
import { competenceTypeDefs } from "./graphql/schemas/competence.schema.ts";
import { getUserFromToken } from "./middleware/authMiddleware.ts";
import { connectDB } from "./config/db.ts";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

dotenv.config();

async function startServer() {
  const app = express();


  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );


  app.post("/logout", (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({ message: "Logged out" });
  });


  const uploadDir = path.resolve("uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + "-" + file.originalname;
      cb(null, uniqueName);
    },
  });

  const upload = multer({ storage });

  app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  });

  app.use("/uploads", express.static(uploadDir));


  app.post("/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT!),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.CONTACT_EMAIL,
        subject: subject,
        text: message,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong><br>${message}</p>`,
      };

      await transporter.sendMail(mailOptions);
      res.json({ message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });


  const baseTypeDefs = gql`
    type Query { _empty: String }
    type Mutation { _empty: String }
  `;

  const server = new ApolloServer({
    typeDefs: [
      baseTypeDefs,
      userTypeDefs,
      skillTypeDefs,
      projectTypeDefs,
      experienceTypeDefs,
      competenceTypeDefs,
    ],
    resolvers: [
      userResolvers,
      skillResolvers,
      projectResolvers,
      experienceResolvers,
      competenceResolvers,
    ],
    context: ({ req, res }) => {
      const token = req.cookies.token;
      const user = getUserFromToken(token);
      return { user, res };
    },
  });

  await server.start();
  server.applyMiddleware({ app, cors: false });

  await connectDB();

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`Upload endpoint at http://localhost:${PORT}/upload`);
    console.log(`Static files served from /uploads`);
  });
}

startServer();
