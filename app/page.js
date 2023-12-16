"use client";
import Link from "next/link";
import Home from "./Home/page";
import { useUser } from "@auth0/nextjs-auth0/client";

const page = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user) {
    return (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2 className="text-blue-700"> Hi {user.name}</h2>
        <div className="flex">
          <Link
            href="/api/auth/logout"
            className="bg-red-600 text-white px-6 p-2 m-4 rounded-md"
          >
            Logout
          </Link>
          <br />
          <Link
            href="/MindMap"
            className="bg-blue-900 text-white px-6 p-2 m-4 rounded-md"
          >
            Mind Map
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Home />
    </div>
  );
};

export default page;
