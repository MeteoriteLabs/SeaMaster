'use client'

import { SidebarNav } from "../../components/sidebar_nav";
import { useState } from "react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // State to manage the visibility of the sidebar and the reports submenu
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isReportsOpen, setIsReportsOpen] = useState(false);

    // // Toggle the sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // // // Toggle the reports submenu
    const toggleReports = () => {
        setIsReportsOpen(!isReportsOpen);
    };

    return (
        <>
            {/* <div className="min-h-screen md:w-3/12 border-r-2 border-dotted"> */}
            {/* px-2  border-white border-solid */}
            <section>
                <div className="flex md:min-h-screen">
                    {/* Sidebar */}
                    <aside
                        className={`${isSidebarOpen ? "w-full md:w-80" : "w-20"} flex flex-col justify-between border-r-2 border-white-400 transition-width duration-100`}
                    >
                        <div>
                            {/* Logo */}
                            {isSidebarOpen ? (
                                <img
                                    className="mx-auto mt-10"
                                    src="logo.svg"
                                    alt="logo"
                                />
                            ) : (
                                <img
                                    className="w-10 mx-auto mt-10"
                                    src="logo_small.svg"
                                    alt="logo"
                                />
                            )}

                            <SidebarNav></SidebarNav>
                        </div>

                        <div className="flex items-center px-3 py-2 mt-10 text-sm text-black">
                            <button className="flex items-center" onClick={toggleSidebar}>
                                <img src="sidebar_toggle.svg" className={`transform transition-transform duration-300 ${isSidebarOpen ? "rotate-0" : "rotate-180"}`} alt="toggle menu"></img>
                                {/* <span className={`${isSidebarOpen ? "block ml-3" : "hidden"}`}>
                                    Hide Sidebar
                                </span> */}
                            </button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main
                        className={`relative transition-margin duration-100 ease-in-out md:flex-1 md:block p-10 md:p-16 ${isSidebarOpen ? "hidden" : "block w-full"}`}
                    >
                        {children}
                        {/* <div className="border border-dashed border-gray-400 rounded-md flex items-center justify-center text-gray-400 h-full">
                        <p>Product List</p>
                    </div> */}
                    </main>
                </div>
            </section>
        </>
    )
}
