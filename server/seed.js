const mongoose = require('mongoose');
const Pet = require('./Model/PetModel');  // ✅ Corrected path
require('dotenv').config();

const samplePets = [
  {
    name: "Buddy",
    age: "3",
    area: "Downtown",
    justification: "Friendly golden retriever looking for a loving home. Great with kids!",
    email: "contact@pawfinds.com",
    phone: "123-456-7890",
    type: "Dog",
    filename: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500",
    status: "Approved"  // ✅ Changed from "available"
  },
  {
    name: "Whiskers",
    age: "2",
    area: "Uptown",
    justification: "Playful tabby cat needs a forever home. Very affectionate!",
    email: "info@pawfinds.com",
    phone: "098-765-4321",
    type: "Cat",
    filename: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500",
    status: "Approved"  // ✅ Changed from "available"
  },
  {
    name: "Max",
    age: "5",
    area: "Suburbs",
    justification: "Well-trained German Shepherd, excellent guard dog and family pet.",
    email: "adopt@pawfinds.com",
    phone: "555-123-4567",
    type: "Dog",
    filename: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=500",
    status: "Pending"  // ✅ Capital P
  },
  {
    name: "Luna",
    age: "1",
    area: "City Center",
    justification: "Adorable kitten with beautiful blue eyes. Very playful and loving.",
    email: "hello@pawfinds.com",
    phone: "555-987-6543",
    type: "Cat",
    filename: "https://images.unsplash.com/photo-1573865526739-10c1deaeec60?w=500",
    status: "Approved"  // ✅ Changed from "available"
  },
  {
    name: "Charlie",
    age: "4",
    area: "Westside",
    justification: "Sweet beagle mix, loves walks and cuddling. Good with other pets.",
    email: "care@pawfinds.com",
    phone: "555-246-8135",
    type: "Dog",
    filename: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500",
    status: "Approved"  // ✅ Changed from "available"
  }
];
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Optional: Clear existing data
    await Pet.deleteMany({});
    console.log('🗑️  Cleared existing pets');

    // Insert sample data
    const pets = await Pet.insertMany(samplePets);
    console.log(`✅ Added ${pets.length} sample pets successfully!`);

    // Close connection
    mongoose.connection.close();
    console.log('👋 Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();