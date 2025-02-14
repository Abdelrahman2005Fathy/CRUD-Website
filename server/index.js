const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");


const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8080;

//Schema

const schemaData = new mongoose.Schema({
    name: String,
    email: String,
    mobile:String,
},{ 
    timestamps: true 
});

const userModel = mongoose.model("user",schemaData);

// read
//​http://localhost:8080/
app.get("/",async (req ,res)=>{
    const data = await userModel.find({});
    res.json({
        success: true,
        data: data,
    })
});


// create
 //​http://localhost:8080/create
 /*
 * Sample Request Body:
 * {
 *     "name",
 *     "email",
 *     "mobile"
 * }
 */ 
app.post("/create", async (req,res) => {
    console.log(req.body);
    const data = new userModel(req.body);
    await data.save();

    res.send({
        message: "Data save Successfully!",
        success: true,
    })
});

// update
 //​http://localhost:8080/update
 /*
 * Sample Request Body:
 * {
 *     "_id",
 *     "name",
 *     "email",
 *     "mobile"
 * }
 */
 app.put("/update/:id", async (req, res) => {
    console.log(req.body);
    const { id } = req.params; 
    const updateData = req.body;
    
    try {
        const data = await userModel.updateOne({ _id: id }, updateData);
        res.send({
            message: "User Updated Successfully!",
            success: true,
            data: data,
        });
    } catch (error) {
        res.status(500).send({ message: "Error updating user", success: false });
    }
});


// delete
 //​http://localhost:8080/delete/:id
 /*
 * Sample Request Body:
 * {
 *     "_id"
 * }
 */
app.delete("/delete/:id", async (req,res) => {
    console.log(req.body);
    const id = req.params.id;
    const data = await userModel.deleteOne({_id:id});
    res.send({
        message: "User Deleted Successfully!",
        success: true,
        data: data,
    })
});


mongoose.connect("mongodb+srv://bdalrhmnfthy000:gK7cwCgotozPfZUq@cluster0.fagof.mongodb.net/CRUD?retryWrites=true&w=majority&appName=Cluster0",{
useNewUrlParser: true,
useUnifiedTopology: true
})
 .then(() => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => console.log("Server is Running..."))
 })
 .catch((err) => console.error("Error connecting to MongoDB:", err));

