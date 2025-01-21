import Header from "@/app/ui/components/Header";
import DatePickerGroup from "../components/DatePickerGroup";

export default function AdminTable() {
    return (
        <div className="w-full">
            <Header name="Admin Management" className="mb-4" />
            {/* Filters */}
            <div className="flex flex-wrap gap-6 mb-6 border-gray-300 border p-4 rounded-xl">
                <div className="flex">
                    <DatePickerGroup />
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <label className="font-medium">Role:</label>
                        <select className="border border-gray-300 rounded px-3 py-2">
                            <option>All</option>
                            <option>Admin</option>
                            <option>System Admin</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="font-medium">Status:</span>
                        <label className="flex items-center gap-1">
                            <input type="radio" name="status" defaultChecked />
                            All
                        </label>
                        <label className="flex items-center gap-1">
                            <input type="radio" name="status" />
                            Active
                        </label>
                        <label className="flex items-center gap-1">
                            <input type="radio" name="status" />
                            Inactive
                        </label>
                    </div>
                    <button className="ml-auto bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
                        Search
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-4 py-2 border">No.</th>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Phone Number</th>
                            <th className="px-4 py-2 border">Role</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Registration Date</th>
                            <th className="px-4 py-2 border">Last Modified Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Replace this section with dynamic data */}
                        {Array.from({ length: 10 }, (_, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{30 - i}</td>
                                <td className="px-4 py-2 border">Name {i + 1}</td>
                                <td className="px-4 py-2 border">email{i}@example.com</td>
                                <td className="px-4 py-2 border">010-1234-567{i}</td>
                                <td className="px-4 py-2 border">{i % 2 === 0 ? "System Admin" : "Supper Admin"}</td>
                                <td className="px-4 py-2 border">{i % 2 === 0 ? "Active" : "Inactive"}</td>
                                <td className="px-4 py-2 border">2024-12-30</td>
                                <td className="px-4 py-2 border">2024-12-31</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                <button className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">&laquo;</button>
                <div className="flex items-center gap-2">
                    {[1, 2, 3].map((page) => (
                        <button
                            key={page}
                            className={`px-4 py-2 text-sm rounded ${
                                page === 1 ? "bg-purple-600 text-white" : "text-gray-700 hover:bg-gray-100"
                            }`}>
                            {page}
                        </button>
                    ))}
                </div>
                <button className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">&raquo;</button>
            </div>
        </div>
    );
}
