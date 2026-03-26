const mongoose = require("mongoose");

// 🔗 YOUR MONGODB CONNECTION
mongoose.connect("mongodb+srv://himanshurkv:2%2F6%2F8%40Aashu@cluster.5ajsyoj.mongodb.net/brl-shop")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 🧱 PRODUCT MODEL (same as your app)
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  category: String
});

const Product = mongoose.model("Product", productSchema);

// 📦 PRODUCTS DATA
const products = [
  {
    name: "Heavy Duty Cargo Straps",
    price: 1499,
    category: "Load Security",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
    description: "Industrial-grade cargo straps designed for secure transport loads."
  },
  {
    name: "Reflective Safety Jacket",
    price: 899,
    category: "Safety Gear",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    description: "High-visibility reflective jacket for logistics and warehouse safety."
  },
  {
    name: "Warehouse Safety Helmet",
    price: 1299,
    category: "Safety Gear",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
    description: "Durable helmet built for industrial and logistics environments."
  },
  {
    name: "Industrial Work Gloves",
    price: 699,
    category: "Safety Gear",
    image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1",
    description: "Protective gloves for handling heavy materials and equipment."
  },
  {
    name: "Heavy Tarp Cover",
    price: 2499,
    category: "Transport Protection",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
    description: "Weather-resistant tarp for cargo protection."
  },
  {
    name: "Logistics Storage Crate",
    price: 1899,
    category: "Storage",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c",
    description: "Strong crate for warehouse and logistics storage."
  },
  {
    name: "Pallet Transport Dolly",
    price: 4599,
    category: "Material Handling",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492",
    description: "Efficient dolly for moving heavy pallets."
  },
  {
    name: "Steel Loading Ramp",
    price: 7999,
    category: "Material Handling",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da",
    description: "Heavy-duty ramp for loading operations."
  },
  {
    name: "Road Safety Cones Set",
    price: 1199,
    category: "Road Safety",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122",
    description: "Bright cones for traffic and safety control."
  },
  {
    name: "Cargo Net System",
    price: 2199,
    category: "Load Security",
    image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef",
    description: "Flexible cargo net for securing loads."
  },
  {
    name: "Industrial Tool Case",
    price: 2799,
    category: "Equipment",
    image: "https://images.unsplash.com/photo-1581147036324-c1c1d0d1f8b1",
    description: "Durable case for tools and equipment."
  },
  {
    name: "Hydraulic Floor Jack",
    price: 6499,
    category: "Equipment",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e",
    description: "Heavy-duty jack for lifting and maintenance."
  }
];

// 🚀 SEED FUNCTION
const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("🔥 Database Seeded Successfully");
  mongoose.connection.close();
};

seedDB();