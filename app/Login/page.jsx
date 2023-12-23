"use client"
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const Login = () => {
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
      <h1 className="flex text-center justify-center m-5 text-gray-600 font-semibold text-lg"> Vui Lòng Đăng Nhập Để Vào MindMap </h1>
    </div>
  )
}

export default Login