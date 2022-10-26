const express = require('express')
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://dbUser:dbUser@cluster0.x699fpr.mongodb.net/dbUser",{ useNewUrlParser:true},{useUnifiedTopology:true});

const dbUserSchema = {
    name: String,
    email: String,
    password: String,
    color: String
}
app.use(express.static(__dirname + '/public'));
const dbUser = mongoose.model("dbUser", dbUserSchema);
app.get("/", function(req,res){
    res.sendFile(__dirname+'/index.html')
})
app.get("/index.html", function(req,res){
    res.sendFile(__dirname+'/index.html')
})
app.get("/home.html", function(req,res){
    res.sendFile(__dirname+'/home.html')
})
app.get("/login.html", function(req,res){
    res.sendFile(__dirname+'/login.html')
})

app.get("/login", async(req,res) => {
    let email = req.query.email;
	let user = await dbUser.findOne({email: email});
	if(!user){
		res.status(400).json({msg:"User doesnt exist"});
	}
	color = user.color;
	password = user.password;
    console.log(color+password)
    res.json({color:color, password:password})
})

app.post("/", async(req,res)=>{
    let newdbUser = new dbUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        color: req.body.colors

    })
    var name =req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	var color = req.body.color;
    console.log(name)
    if(!name || !email || !password || !color){
		res.status(400).json({msg : "Enter valid details"},)
        return;
	}
	else { 
        let user = await dbUser.findOne({email})
        if (user){
            res.status(400).json({msg : "User already exists"})
            return;
        }
        const success = await newdbUser.save();
        if(success){
            res.status(200).json({msg: "User created successfully"})
        }
        else{
            res.status(400).json({msg:"User not created try again"})
        }
    }
    // newdbUser.save();
    // res.redirect("/home.html")
} )
app.listen(3002,function(){
    console.log('listen to 3002')
})