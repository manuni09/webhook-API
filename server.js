const express = require("express")
const bodyParser = require("body-parser")
const MongoClient = require("./Database/connection")
const app = express();
const WebHookModel = require("./Database/webhook.model")

//parse
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

MongoClient().then(()=>{
    console.log("Connected successfully")
})
.catch(console.log)

app.get("/",(req,res) => {
    res.send("Welcome")
})

//get all 
app.get("/api/webhook",(req,res)=>{

    WebHookModel
    .find()
    .then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"Successfully fetched"
        });
    })
    .catch(e =>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    })

})

//create
app.post("/api/webhook",(req,res)=>{
    let body = req.body;

    WebHookModel.create(body)
    .then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"Successfully fetched data"
        });
    })
    .catch(e =>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    })
})

//update
app.put("/api/webhook/:id",(req,res)=> {
    let body = req.body;

    WebHookModel
    .findByIdAndUpdate(req.params.id,body)
    .then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"Successfully fetched data"
        });
    })
    .catch(e =>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    })
})

//delete
app.delete("/api/webhook/:id",(req,res)=>{
    WebHookModel.findByIdAndRemove(req.params.id,function(err,wh){
        if(err){
            res.json({
                    flag:false,
                    data:null,
                    message:err.message
            });
        }
        else{
            res.json({
                flag:true,
                data:wh,
                message:"SuccessfullyDeleted"
            });
        }
    })
})

app.listen(3000);

// .then((wh)=>{
//     res.json({
//         message:"started"
//     })
// })
// .catch(e=>{
//     res.json({
//         message:e.message
//     })
// })