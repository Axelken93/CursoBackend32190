import mongoose from "mongoose";



async function mongoDBConnection (){
    const URL = "mongodb+srv://axelken93:Racing200793@backend32190.e4b0dmz.mongodb.net/ecommerce?retryWrites=true&w=majority"
    try{
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Conectados a MongoDB correctamente")
    } catch(err){
        console.log(`Error: ${err}`)
    }
}

export {mongoDBConnection};

