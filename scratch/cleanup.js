const mongoose = require('mongoose');

async function run() {
  const uri = "mongodb://localhost:27017/luxury-restaurant";
  await mongoose.connect(uri);

  try {
    const db = mongoose.connection.db;
    
    console.log("Dropping reservations collection...");
    await db.collection("reservations").drop().catch(() => console.log("No reservations collection found"));
    
    console.log("Dropping slots collection...");
    await db.collection("slots").drop().catch(() => console.log("No slots collection found"));

    console.log("Removing non-bakery menu items...");
    const result = await db.collection("menus").deleteMany({
      category: { $in: ["Starters", "Main Course", "Desserts", "Signature", "Mains"] }
    });
    console.log(`Deleted ${result.deletedCount} old menu items.`);
    
  } finally {
    await mongoose.disconnect();
  }
}
run().catch(console.dir);
