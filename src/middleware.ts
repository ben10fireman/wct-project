import { NextResponse } from "next/server";
import { getAuth } from "firebase/auth";
import { db } from "@/app/services/firebase"; // Adjust the path
import { doc, getDoc } from "firebase/firestore";

export async function middleware(req: any) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Fetch user role from Firestore
  const userDoc = await getDoc(doc(db, "users", user.uid));
  const userData = userDoc.data();

  if (userData?.role !== "staff") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Protect staff-specific routes
export const config = {
  matcher: ["/staff/:path*"],
};
