import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seedAdmin() {
  try {
    console.log("***** ADMIN SEEDNING STARTED *****");
    const adminData = {
      name: "Admin saheb 2",
      email: "admin2@admin.com",
      role: UserRole.ADMIN,
      password: "admin1234",
    };

    console.log("**** Checking Admin Exists or Not ****");
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists!!!");
    }

    const signUpAdmin = await fetch(
      "http://localhost:5000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: process.env.APP_URL!,
        },
        body: JSON.stringify(adminData),
      }
    );

    if (signUpAdmin.ok) {
      console.log("**** Admin Created ****");
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
      console.log("**** Email verification status updated ****");
    }

    console.log("*************** SUCCESS *************");
  } catch (err) {
    console.error(err);
  }
}

seedAdmin();
