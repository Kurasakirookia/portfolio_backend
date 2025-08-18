require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDb = require("../config/connectDb");
const Admin = require("../models/admin");

(async () => {
  try {
    await connectDb();
    const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env");
      process.exit(1);
    }

    const existing = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });
    if (existing) {
      console.log("✅ Admin already exists:", existing.email);
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    const admin = await Admin.create({
      email: ADMIN_EMAIL.toLowerCase(),
      passwordHash,
      name: "Admin",
    });

    console.log("✅ Admin created:", admin.email);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
