import { NextResponse } from "next/server";
import { getAuth } from "firebase/auth";
import { db } from "@/app/services/firebase"; // Adjust the path
import { doc, getDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const auth = getAuth();
  const user = auth.currentUser;

  // If no user is logged in, redirect to login page
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Fetch user role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();

    // If user role is not "staff", redirect to login page
    if (userData?.role !== "staff") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Allow access to the requested route
    return NextResponse.next();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Protect staff-specific routes
export const config = {
  matcher: ["/staff/:path*"],
};