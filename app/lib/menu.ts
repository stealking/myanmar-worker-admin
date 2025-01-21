import { Calendar, ClipboardList, HandHelping, LayoutDashboard, Shell, User, User2, Users } from "lucide-react";

export const Menus = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Admin and member management",
        icon: Users,
        subMenu: [
            {
                name: "Admin",
                href: "/admin",
                icon: User,
            },
            {
                name: "Member",
                href: "/member",
                icon: User2,
            },
        ],
    },
    {
        name: "Board",
        icon: ClipboardList,
        subMenu: [
            {
                name: "Notice",
                href: "/notice",
                icon: Shell,
            },
            {
                name: "FAQ",
                href: "/faq",
                icon: HandHelping,
            },
        ],
    },
    {
        name: "Visit schedule management",
        icon: Calendar,
    },
];
