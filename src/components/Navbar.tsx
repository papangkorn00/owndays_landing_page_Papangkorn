import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header className="w-full bg-[#f5f5f7]/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#e0e0e0]">
      <div className="container mx-auto px-4 md:px-6 h-[52px] flex items-center justify-between">
        <div className="flex-shrink-0 flex items-center">
          <Link to="/">
            <img src="/owndays_logo.svg" alt="OWNDAYS Logo" className="h-[20px] w-auto mix-blend-multiply cursor-pointer" />
          </Link>
        </div>
        <nav className="flex items-center">
          <Link
            to="/dashboard"
            className="text-[14px] font-semibold tracking-[-0.224px] text-ink hover:text-[#666666] transition-colors cursor-pointer"
          >
            The Analyst View
          </Link>
        </nav>
      </div>
    </header>
  );
}
