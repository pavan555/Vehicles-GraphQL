import express from 'express';
import responseTimings from 'response-time';
const app = express();



app.use(responseTimings());

app.all("/health", (req, res, next) => {
    res.status(200).json({ message: "Healthy" });
} )




export default app;