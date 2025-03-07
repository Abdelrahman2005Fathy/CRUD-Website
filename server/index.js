const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv'); 
dotenv.config(); 

const app = express();

// تمكين CORS للطلبات من النطاق المحلي وVercel
app.use(cors({
   origin: ['*'], // السماح بالطلبات من هذه النطاقات
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // السماح بالطرق المختلفة
  allowedHeaders: ['Content-Type', 'Authorization'], // السماح بالرؤوس المطلوبة
  credentials: true, // في حالة وجود ملفات تعريف الارتباط (cookies)
}));

app.use(express.json());
const PORT = process.env.PORT || 8080;

// Schema
const schemaData = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
}, { timestamps: true });

const userModel = mongoose.model("user", schemaData);

// Routes
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({
    success: true,
    data: data,
  });
});

app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new userModel(req.body);
  await data.save();

  res.send({
    message: "Data saved successfully!",
    success: true,
  });
});

app.put("/update/:id", async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const updateData = req.body;

  try {
    const data = await userModel.updateOne({ _id: id }, updateData);
    res.send({
      message: "User updated successfully!",
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).send({ message: "Error updating user", success: false });
  }
});

app.delete("/delete/:id", async (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  const data = await userModel.deleteOne({ _id: id });
  res.send({
    message: "User deleted successfully!",
    success: true,
    data: data,
  });
});

// MongoDB connection
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
})
.catch((err) => console.error("Error connecting to MongoDB:", err));
