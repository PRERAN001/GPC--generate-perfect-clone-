const mongoose=require("mongoose")
const rabbitzSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    details: [
        {
            prompt: String,
            result: String
        }
    ]
});
const rabbitzuser=mongoose.model("rabbitzuser",rabbitzSchema)
module.exports=rabbitzuser 