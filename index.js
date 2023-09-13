import express from "express";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute";

const app = express();
app.use(cors());
app.use(express.json());
app.use(ProductRoute);

app.listen(5000, () => console.log("servernya running broww!!!"));