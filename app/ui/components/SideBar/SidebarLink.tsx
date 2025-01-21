"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
    icon?: LucideIcon;
    title: string;
    href: string;
    isChild: boolean;
}

const SidebarLink = ({ icon: Icon, title, href, isChild }: SidebarLinkProps) => {
    const pathName = usePathname();
    const isActive = pathName === href || (pathName === "/" && href === "/dashboard");
    return (
        <Link href={href}>
            <div
                className={`p-2 ${isChild ? "pl-4  hover:bg-blue-50" : ""} cursor-pointer flex items-center gap-3 ${
                    isActive ? "text-purple-600" : ""
                } justify-start`}>
                {Icon && <Icon className="w-5 h-5 min-w-6" />}
                <span>{title}</span>
            </div>
        </Link>
    );
};
export default SidebarLink;
