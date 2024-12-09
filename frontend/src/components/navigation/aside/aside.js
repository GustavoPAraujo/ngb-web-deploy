

import Link from 'next/link';
import { FaHashtag, FaHouse } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";

export default function Aside() {
    return (
        <aside className="hidden sm-500:block fixed left-0 top-0 h-full
                            sm-500:w-24 sm:w-32 md:w-36 md-900:w-40 lg:w-64 xl:w-72 2xl:w-80
                            border-r border-slate-400 flex-col
                            py-8 space-y-3">

            <div id="nav" className="flex flex-col items-center space-y-8 lg:items-start">

                <Link href='/'>
                    <img
                        src="/logo.png"
                        alt="logo"
                        className="w-14 h-14 mb-2 cursor-pointer lg:ml-4 xl:ml-10 2xl:ml-16"
                    />
                </Link>

                <Link href="/" className="text-2xl font-semibold hover:text-gray-300
                                            flex items-center space-x-2 
                                            lg:pl-8 xl:pl-14 2xl:pl-20">

                    <FaHouse className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl" />
                    <p className="text-left sm-500:hidden lg:block ">Home</p>
                </Link>

                <Link href="/explore" className="text-2xl font-semibold hover:text-gray-300
                                                    flex items-center space-x-2 
                                                    lg:pl-8 xl:pl-14 2xl:pl-20">

                    <FaHashtag className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl" />
                    <p className="text-left sm-500:hidden lg:block ">Explore</p>
                </Link>

                <Link href="/profile" className="text-2xl font-semibold hover:text-gray-300 
                                                    flex items-center space-x-2 
                                                    lg:pl-8 xl:pl-14 2xl:pl-20  ">

                    <IoPersonOutline className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl" />
                    <p className="text-left sm-500:hidden lg:block ">Profile</p>
                </Link>

            </div>
        </aside>
    );
}
