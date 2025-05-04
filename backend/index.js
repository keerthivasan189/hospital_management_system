const z=require('express');
const mongoose=require('mongoose');
const app=z();
const HospitalModel=require("./models/Hospital");
const cors=require('cors');


app.use(z.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/Apollo");
//create
app.post("/insert",async(req,res) => {

    const patientName=req.body.patientName
    const mobile=req.body.mobile
    const location=req.body.location
    
    const hospital=new HospitalModel({
        patientName:patientName,
        mobile:mobile,
        location:location
    });
    try{
        await hospital.save();
            }catch(err){
                console.log(err);
            }
});

//fetch data
app.get("/read",async(req,res) => {
    HospitalModel.find({},(err,rezult)=>{
        if(err) {
            res.send(err);
        }
        res.send(rezult);
    });
    
});

//update

app.put("/update",async(req,res) => {

    const newName=req.body.newName;
    const id=req.body.id;
   
    try{
     await HospitalModel.findById(id,(err,updatedName)=>{
            updatedName.patientName=newName;
            updatedName.save();
           
        });
       
            }catch(err){
                console.log(err);
            }
});


app.listen(8081);