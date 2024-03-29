import Link from "next/link";
const Nav = () => {
  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>
          <Link href="/">Mindmap Flow</Link>
        </div>
        <div className="flex gap-10">
          <Link href="/Home">Home page</Link>
          <Link href="/About">Introduce</Link>
          <Link href="/Feature">Feature</Link>
          <Link href="/Course">Price list</Link>
          <Link href="/Contact">Contact</Link>
          <Link href="/MindMap">MindMap</Link>
          <Link href="/api/auth/login">Login</Link>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
