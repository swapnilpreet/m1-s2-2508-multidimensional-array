import express from 'express';
const app=express();
app.use(express.json()); 
const port=3000;

app.use("/todos", todoRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "404 Not Found" });
});

app.use((err, req, res, next)=>{
  console.error("[ERROR]", err);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});


app.listen(port,()=>{
    console.log(`Surver Running on http://localhost:${port}`)
})