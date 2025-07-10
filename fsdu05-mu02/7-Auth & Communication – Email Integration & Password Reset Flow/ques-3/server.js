const express =require("express");
const connecttoDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const dishRoutes = require("./routes/dish.routes");
const orderRoutes = require("./routes/order.route");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");


const app=express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dishes", dishRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(3000,async()=>{
    await connecttoDB();
    console.log("server is runing 3000 port")
});
