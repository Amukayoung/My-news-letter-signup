const express =require("express");
const https = require("https");




const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.static("stat"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    var ourFirstName = req.body.surname;
    var ourSecondName = req.body.firstname;
    var ourEmail = req.body.email;

    //console.log(ourFirstName+","+ourSecondName + ","ourEmail);
    var data = {

        members: [
            {
                email_address:ourEmail,
                status:"subscribed",
                merge_fields: {
                    FNAME:ourFirstName,
                    LNAME:ourSecondName
                }
            }
        ]

    };

    var jsondata =JSON.stringify(data);
    const url="https://us18.api.mailchimp.com/3.0/lists/9f6cc8b5e3";
    const Options ={
        method:"POST",
        auth:"amuka:8ca8df3d056d2bcffc09147e53062ee2-us18"
    };

    const message = https.request(url, Options,function(response){
        if (response.statusCode==200) {   
            res.sendFile(__dirname +"/success.html");
        }else{
            console.log(response.statusCode);
            res.sendFile(__dirname +"/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    app.post("/failure", function(req,res){
        res.redirect("/");
    });

    message.write(jsondata);
    message.end();
    

    
});















app.listen(3000,function(){
    console.log("The server is running on port 3000");
});

//9f6cc8b5e3 mail chimp list id
// 8ca8df3d056d2bcffc09147e53062ee2-us18 Mail chim API key