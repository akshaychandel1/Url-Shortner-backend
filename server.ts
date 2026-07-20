// import dotenv from "dotenv";
// import app from "./app";
// import connectDB from "./config/db";

// dotenv.config();

// const PORT = process.env.PORT || 5500;

// const startServer = async () =>{
//     await connectDB();
//     app.listen(PORT, () =>{
//     console.log(`Server is running on http://localhost:${PORT}`);
// })
// }

// startServer();


import "dotenv/config";

import app from "./app";
import connectDB from "./config/db";


const PORT = process.env.PORT || 5500;


const startServer = async()=>{

    await connectDB();


    app.listen(PORT,()=>{

        console.log(
            `Server is running on http://localhost:${PORT}`
        );

    });

};


startServer();