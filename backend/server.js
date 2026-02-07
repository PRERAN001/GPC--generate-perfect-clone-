const express=require("express")
const dotenv=require("dotenv")
dotenv.config()
const {createServer }=require("http")
const {Server}=require("socket.io")

const mongoose=require("mongoose")
mongoose.connect(process.env.mongodburl).then(()=>{
    console.log("connet to db")
})
const rabbitzrouter=require("./routes/rabbitz.router")
const { serve}=require("inngest/express")   
const {inngest,functions}=require("./inngest/inngest")
const port=process.env.PORT || 3000

const app=express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors:{
        origin: "https://rabbitz-nu.vercel.app/",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});
io.on("connection",(socket)=>{
    console.log("socket connected:", socket.id)
    // join room by user name if provided by client
    socket.on('join', (room) => {
        socket.join(room)
        console.log(`socket ${socket.id} joined room ${room}`)
    })
})
app.use(express.json())
app.use("/api/inngest",serve({client:inngest,functions}))
const cors=require("cors")
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.get("/",(req,res)=>{
    return res.status(200).json({"message":"success"})
})
app.use('/rabbitz',rabbitzrouter)
app.post('/build',async(req,res)=>{
    await inngest.send({
        name:"build/build",
        data:{prompt:req.body.prompt,
            name:req.body.name

        }
    })
    res.send("event sent")
})
// expose io to other modules
const { setIo } = require('./socket')
setIo(io)

httpServer.listen(port,()=>{
    console.log("server connected")
})
