"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menus } from "../../../lib/menu";
import SidebarLink from "./SidebarLink";

export default function SideNav() {
    const [clicked, setClicked] = useState<number | null>(null);
    const isSidebarCollapsed = false;
    const pathName = usePathname();

    useEffect(() => {
        // Find the submenu that contains the current pathname
        Menus.forEach(({ subMenu }, i) => {
            if (subMenu?.some(({ href }) => href === pathName)) {
                setClicked(i); // Set the corresponding menu as clicked
            }
        });
    }, [Menus, pathName]);

    const toggleSidebar = () => {};

    const sidebarClass = `flex flex-col bg-white h-full transition-all duration-300 overflow-hidden h-full shadow-md z-40 p-4 pr-2 ${
        isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
    }`;

    const subMenuDrawer = {
        enter: {
            height: "auto",
            overflow: "hidden",
        },
        exit: {
            height: 0,
            overflow: "hidden",
        },
    };

    return (
        <div className={sidebarClass}>
            {/* TOP LOGO */}
            <div className={`flex gap-3 justify-between md:justify-normal items-center py-5 `}>
                <Image src="globe.svg" alt="Logo" width={24} height={24} className="rounded-full h-full bg-white" />
                <h1 className={`font-extrabold text-2xl`}>TANSY91</h1>
            </div>

            <ul>
                {Menus.map(({ name, subMenu, href, icon }, i) => {
                    const isClicked = clicked === i;
                    const hasSubMenu = subMenu?.length;
                    const hrefLink = href || "#";
                    return (
                        <li key={name} className={`font-medium ${hasSubMenu ? "" : "hover:bg-blue-50"}`}>
                            {hasSubMenu && (
                                <div className="flex flex-col">
                                    <span
                                        className="flex justify-between cursor-pointer "
                                        onClick={() => setClicked(isClicked ? null : i)}>
                                        <SidebarLink
                                            isChild={false}
                                            key={name}
                                            icon={icon}
                                            title={name}
                                            href={hrefLink}
                                        />
                                        {hasSubMenu && (
                                            <ChevronDown className={`ml-auto min-w-6 ${isClicked && "rotate-180"} `} />
                                        )}
                                    </span>
                                    <motion.ul
                                        initial="exit"
                                        animate={isClicked ? "enter" : "exit"}
                                        variants={subMenuDrawer}>
                                        {subMenu.map(({ name, icon: Icon, href }) => (
                                            <li key={name}>
                                                <SidebarLink
                                                    isChild={true}
                                                    key={name}
                                                    icon={Icon}
                                                    title={name}
                                                    href={href || "#"}
                                                />
                                            </li>
                                        ))}
                                    </motion.ul>
                                </div>
                            )}

                            {!hasSubMenu && (
                                <SidebarLink isChild={false} key={name} icon={icon} title={name} href={hrefLink} />
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
