import 'dotenv/config'
import express from "express";
import cors from "cors";
// import pool from "./db.mjs"

const PORT = process.env.PORT || 3000;
const app = express()


//middleware//
app.use(cors());
app.use(express.json());

//route//

app.get('/', (req, res) => {
    res.send('Hello from server side');
});
app.get('/')


//start the server//
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

