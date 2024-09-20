import Link from "next/link";
import { useAuth } from "./AuthContext"; // Adjust path as needed

function Header() {
  const { username, logout } = useAuth(); // Access auth context

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <nav className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            Budget App
          </Link>
          
          {/* Conditionally render the Approval menu only if the user is logged in */}
          {username && (
            <Link href="/approval" className="text-sm">
              Approval
            </Link>
          )}
        </nav>

        <div className="text-sm">
          {username ? (
            <>
              {/* Display the username and logout link */}
              {username} |{" "}
              <button
                onClick={logout}
                className="text-blue-600 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            // Show Login link if not logged in
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;