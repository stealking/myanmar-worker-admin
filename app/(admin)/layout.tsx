import SideNav from "@/app/ui/components/SideBar";
import NavBar from "@/app/ui/components/Navbar";

export default async function AdminPage({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex bg-gray-50 text-gray-900 w-full h-screen">
            <SideNav />
            <main className={`flex flex-col flex-1 `}>
                <div className="w-full px-4 py-4 bg-white">
                    <NavBar />
                </div>
                <div className="flex flex-1 overflow-y-auto bg-white mt-1 p-6">{children}</div>
            </main>
        </div>
    );
}
