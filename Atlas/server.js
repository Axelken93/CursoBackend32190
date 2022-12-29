import mongoose from "mongoose";

const URL = "mongodb+srv://axelken93:Racing200793@backend32190.e4b0dmz.mongodb.net/?retryWrites=true&w=majority"

await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

console.log("conectados correctamente")
