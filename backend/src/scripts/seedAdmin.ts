import { User } from "../models";
import dotenv from "dotenv";

dotenv.config()

const seedAdmin = async () => {
  try {
       const adminExists = await User.findOne({ where: { email: process.env.ADMIN_EMAIL } });
       if (adminExists) {
           console.log("Admin user already exists.");
           return;
       }
        const adminUser = await User.create({
            email: process.env.ADMIN_EMAIL as string,
            password: process.env.ADMIN_PASSWORD as string,
            name: process.env.ADMIN_NAME as string || "Admin",
            role: 'admin'
        });
        console.log("Admin user created successfully:", adminUser.toJSON());

    } catch (error) {
        console.error("Error creating admin user:", error);
    }
}

// Run the seed function if this script is executed directly
if (require.main === module) {
    import('../models').then(async ({ sequelize }) => {
        try {
            await sequelize.authenticate();
            console.log('Database connected successfully.');
            await sequelize.sync({ alter: true }); // Use { force: true } for development only
            console.log('Database synchronized.');
            await seedAdmin();
            process.exit(0);
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            process.exit(1);
        }
    });
}

export default seedAdmin;
