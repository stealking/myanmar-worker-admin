import { Menu, Search } from "lucide-react";
import SignInButton from "@/app/ui/components/SignInButton";

export default function NavBar() {
    return (
        <div className="flex justify-between items-center ">
            {/* LEFT SIDE */}
            <div className="flex justify-between items-center gap-5">
                <button className="rounded-full px-3 py-3 bg-gray-100 hover:bg-blue-100">
                    <Menu className="w-4 h-4" />
                </button>

                <div className="relative">
                    <input
                        type="search"
                        className="pl-10 pr-4 py-2 w-52 md:w-64 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Search..."
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="text-gray-500" size={20} />
                    </div>
                </div>
            </div>
            {/* RIGHT SIDE */}
            <div className="flex items-center gap-5">
                <SignInButton />
            </div>
        </div>
    );
}
