import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../images/ddlogo.png";
import Link from "next/link";
import GoogleLoginButton from "./GoogleLoginButton";

export default function Header() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("googleUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function handleLogin(response) {
    // Decode JWT to get user info
    const base64Url = response.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    const userObj = JSON.parse(jsonPayload);
    setUser(userObj);
    localStorage.setItem("googleUser", JSON.stringify(userObj));
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("googleUser");
    if (window.google && window.google.accounts.id) {
      window.google.accounts.id.disableAutoSelect();
    }
  }

  return (
    <header className="sticky top-0 z-[9999] bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" legacyBehavior>
              <a className="flex items-center space-x-2">
                <Image src={Logo} alt="Logo" width={120} height={40} priority />
              </a>
            </Link>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex space-x-8 text-base font-medium">
              <li>
                <Link href="/dashboard" legacyBehavior>
                  <a className="text-gray-700 hover:text-violet-700 transition">Dashboard</a>
                </Link>
              </li>
              <li>
                <Link href="/problems" legacyBehavior>
                  <a className="text-gray-700 hover:text-violet-700 transition">Problems</a>
                </Link>
              </li>
              <li>
                <Link href="/discuss" legacyBehavior>
                  <a className="text-gray-700 hover:text-violet-700 transition">Discuss</a>
                </Link>
              </li>
              <li>
                <Link href="/contest" legacyBehavior>
                  <a className="text-gray-700 hover:text-violet-700 transition">Contest</a>
                </Link>
              </li>
              <li>
                <Link href="/blog" legacyBehavior>
                  <a className="text-gray-700 hover:text-violet-700 transition">Blog</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Login/User */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                {user.picture && (
                  <Image src={user.picture} alt={user.name} width={32} height={32} className="rounded-full" />
                )}
                <span className="font-medium text-gray-800">{user.name}</span>
                <span className="ml-2 px-3 py-1 rounded bg-green-100 text-green-800 font-semibold text-xs">Be a pro coder</span>
                <button
                  onClick={handleLogout}
                  className="ml-2 px-3 py-1 rounded bg-violet-600 text-white hover:bg-violet-700 transition text-sm font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <GoogleLoginButton onSuccess={handleLogin} />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
