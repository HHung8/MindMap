import Link from "next/link";
const Nav = () => {
  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>Mindmap Flow</div>
        <div className="flex gap-10">
          <Link href="/Home">Trang chủ</Link>
          <Link href="/About">Giới thiệu</Link>
          <Link href="/Feature">Tính năng</Link>
          <Link href="/Course">Bảng giá</Link>
          <Link href="/Contact">Liên hệ</Link>
          <Link href="/Login">MindMap</Link>
          <Link href="/api/auth/login">Login</Link>
          <Link href="/api/auth/logout">Logout</Link>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
