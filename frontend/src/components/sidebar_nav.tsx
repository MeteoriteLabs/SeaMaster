// import React, { Dispatch, SetStateAction } from 'react'

// interface Props {
//     isSidebarOpen: boolean
//     isReportsOpen: boolean
//     setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
//     setIsReportsOpen: Dispatch<SetStateAction<boolean>>
// }

export function SidebarNav() {
    return (
        <>
        {/* <nav className="md:mt-10 mt-5">
                            <ul className="">
                                <li className="relative text-sm text-black hover:bg-gray-100">
                                    <div className="px-3 py-4 flex items-center">
                                        <svg
                                            className={`${isSidebarOpen ? "" : "mx-auto"} w-6 h-6`}
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                                                stroke="black"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M9 22V12H15V22"
                                                stroke="black"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                        <span
                                            className={`${isSidebarOpen ? "block ml-3" : "hidden"}`}
                                        >
                                            Home
                                        </span>
                                    </div>

                                    <div className="absolute bottom-0 right-0 bg-gray-400 h-[1.5px] w-full"></div>
                                </li>
                                <li className="text-sm text-black hover:bg-gray-100 relative">
                                    <div className="px-3 py-4 flex items-center">
                                        <svg
                                            className={`${isSidebarOpen ? "" : "mx-auto"} w-6 h-6`}
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4 13.5V4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21071 5.46957 2 6 2H14.5L20 7.5V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H12.5"
                                                stroke="black"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M14 2V8H20"
                                                stroke="black"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M10.42 12.6073C10.615 12.4123 10.8465 12.2576 11.1013 12.152C11.3561 12.0465 11.6292 11.9922 11.905 11.9922C12.1808 11.9922 12.4539 12.0465 12.7087 12.152C12.9635 12.2576 13.195 12.4123 13.39 12.6073C13.585 12.8023 13.7397 13.0338 13.8452 13.2886C13.9508 13.5434 14.0051 13.8165 14.0051 14.0923C14.0051 14.3681 13.9508 14.6412 13.8452 14.896C13.7397 15.1508 13.585 15.3823 13.39 15.5773L7.95 20.9973L4 21.9973L4.99 18.0473L10.42 12.6073Z"
                                                stroke="black"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                        <span
                                            className={`${isSidebarOpen ? "block ml-3" : "hidden"}`}
                                        >
                                            Financial Data
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 right-0 bg-gray-400 h-[1.5px] w-full"></div>
                                </li>
                                <li className="text-sm text-black hover:bg-gray-100 relative">
                                    <div className="px-3 py-4 flex items-center">
                                        <svg
                                            className={`${isSidebarOpen ? "" : "mx-auto"} w-6 h-6`}
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 2V22"
                                                stroke="black"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
                                                stroke="black"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                        <span
                                            className={`${isSidebarOpen ? "block ml-3" : "hidden"}`}
                                        >
                                            Transaction
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 right-0 bg-gray-400 h-[1.5px] w-full"></div>
                                </li>
                                <li onClick={toggleReports}>
                                    <div className="flex relative flex-col cursor-pointer">
                                        <div
                                            className={`${isSidebarOpen ? "justify-between flex" : ""} text-sm text-black hover:bg-gray-100 px-3 py-4 `}
                                        >
                                            <span className="flex items-center justify-center">
                                                <svg
                                                    className={`${isSidebarOpen ? "" : "mx-auto justify-self-center"} w-6 h-6`}
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M14.5 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7.5L14.5 2Z"
                                                        stroke="black"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                    <path
                                                        d="M14 2V8H20"
                                                        stroke="black"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                    <path
                                                        d="M16 13H8"
                                                        stroke="black"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                    <path
                                                        d="M16 17H8"
                                                        stroke="black"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                    <path
                                                        d="M10 9H8"
                                                        stroke="black"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                                <span
                                                    className={`${isSidebarOpen ? "block ml-3" : "hidden"}`}
                                                >
                                                    Reports
                                                </span>
                                            </span>
                                            <svg
                                                className={`transform transition-transform duration-300 ${isReportsOpen ? "rotate-180" : "rotate-0"} ${isSidebarOpen ? "block" : "hidden"}`}
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M13 6L8 11L3 6"
                                                    stroke="black"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        {isReportsOpen && isSidebarOpen && (
                                            <ul className="ml-12 mt-2 space-y-3">
                                                <li className="text-gray-500 text-sm cursor-pointer">
                                                    Report 1
                                                </li>
                                                <li className="text-gray-500 text-sm cursor-pointer">
                                                    Report 2
                                                </li>
                                                <li className="text-gray-500 text-sm cursor-pointer">
                                                    Report 3
                                                </li>
                                                <li className="text-gray-500 text-sm cursor-pointer">
                                                    Report 4
                                                </li>
                                            </ul>
                                        )}
                                        <div className="absolute bottom-0 right-0 bg-gray-400 h-[1.5px] w-full"></div>
                                    </div>
                                </li>
                                <li className="text-sm text-black hover:bg-gray-100 relative">
                                    <div className="px-3 py-4 flex items-center">
                                        <svg
                                            className={`${isSidebarOpen ? "" : "mx-auto"} w-6 h-6`}
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z"
                                                stroke="black"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M20 21C20 18.8783 19.1571 16.8434 17.6569 15.3431C16.1566 13.8429 14.1217 13 12 13C9.87827 13 7.84344 13.8429 6.34315 15.3431C4.84285 16.8434 4 18.8783 4 21"
                                                stroke="black"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                        <span
                                            className={`${isSidebarOpen ? "block ml-3" : "hidden"}`}
                                        >
                                            Customer Data
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 right-0 bg-gray-400 h-[1.5px] w-full"></div>
                                </li>
                                <li className=" text-sm text-black hover:bg-gray-100 relative">
                                    <div className="px-3 py-4 flex items-center">
                                        <svg
                                            className={`${isSidebarOpen ? "" : "mx-auto"} w-6 h-6`}
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M21.2104 15.8881C20.5742 17.3926 19.5792 18.7183 18.3123 19.7494C17.0454 20.7805 15.5452 21.4856 13.9428 21.8029C12.3405 22.1203 10.6848 22.0403 9.12055 21.5699C7.55627 21.0996 6.13103 20.2532 4.96942 19.1048C3.80782 17.9564 2.94522 16.5409 2.45704 14.9821C1.96886 13.4233 1.86996 11.7686 2.169 10.1628C2.46804 8.55691 3.1559 7.04875 4.17245 5.77015C5.189 4.49156 6.50329 3.48144 8.0004 2.82812"
                                                stroke="black"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V12H22Z"
                                                stroke="black"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                        <span
                                            className={`${isSidebarOpen ? "block ml-3" : "hidden"}`}
                                        >
                                            Product Data
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 right-0 bg-gray-400 h-[1.5px] w-full"></div>
                                </li>
                                <li className=" text-sm text-black hover:bg-gray-100 relative">
                                    <div className="px-3 py-4 flex items-center">
                                        <svg
                                            className={`${isSidebarOpen ? "" : "mx-auto"} w-6 h-6`}
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M19 20L10 4"
                                                stroke="black"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M5 20L14 4"
                                                stroke="black"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M3 20H21"
                                                stroke="black"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M12 15L9 20"
                                                stroke="black"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M12 15L15 20"
                                                stroke="black"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                        <span
                                            className={`${isSidebarOpen ? "block ml-3" : "hidden"}`}
                                        >
                                            Terminal View
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 right-0 bg-gray-400 h-[1.5px] w-full"></div>
                                </li>
                            </ul>
                        </nav> */}
        </>
    );
}
