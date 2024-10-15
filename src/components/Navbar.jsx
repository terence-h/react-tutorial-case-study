import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const links = [
    {
        name: "Products",
        route: "/"
    },
    {
        name: "Cart",
        route: "/cart"
    }
]

export default function Navbar() {
    const { loggedIn, toggleLoggedIn } = useContext(UserContext);

    return (
        <nav className="sticky top-0 mb-5 bg-stone-800 text-white z-50">
            <div className="relative flex justify-center items-center">
                {/* Centered Link Items */}
                <div className="flex flex-row gap-x-5">
                    {links.map((link, index) => (
                        <Link key={index} to={link.route}
                            className="rounded-xl my-2 p-3 hover:bg-stone-600 transition-all duration-300">
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Login Button Aligned to the Right */}
                <button
                    onClick={toggleLoggedIn}
                    className="absolute right-5 my-2 p-3 rounded-xl hover:bg-stone-600 transition-all duration-300">
                    {loggedIn ? "Logout" : "Login"}
                </button>
            </div>
        </nav>
    );
}