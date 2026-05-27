import express, {Request, Response} from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Loading environmental variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5005
const MONGODB_URI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/knowledge_graph_db'

// Middleware to parse incoming JSON payloads
app.use(express.json())

// Simple health check route
app.get('/ping', (req: Request, res:Response) => {
    res.json({message: "Express backend is Live and Listening!"})
})

// Establish connection to MongoDB

// Promise chaining 
// mongoose
// .connect(MONGODB_URI)
// .then(() => {
//     console.log('Successfully connected to MongoDB')

//     // Start listening for network traffic only After the database connects successfully
//     app.listen(PORT, () => {
//         console.log(`Server is running on port http://localhost:${PORT}`)
//     })
// })
// .catch((error) => {
//     console.error('Mongo DB Connection error: ', error)
//     process.exit(1) // Crash the process safely if we can't hit our data layer
// })

// Async function
async function startServer() {
    try {
        // Await the asynchornous database connection
        await mongoose.connect(MONGODB_URI)
        console.log("Successfully connected to MongoDB via async/await")

        // Once connected, boot up the express network listener
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`)
        })
    } catch(err) {
        // catch any connection or initialization errors neatly in the block
        console.error("Failed to initialize application: ", err)
        process.exit(1)
    }
}

startServer()