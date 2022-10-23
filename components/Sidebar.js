import React from 'react'
import Image from 'next/image'
import { HomeIcon } from "@heroicons/react/solid";
import { MoonIcon } from '@heroicons/react/solid'
import SidebarLink from "./SidebarLink";
import {
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from 'next-auth/react';



function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className='hidden sm:flex flex-col items-center xl:items-start xl:w[340px] p-2 fixed h-full'>
    
    <div className='space-y-2.5 mt-4 mb-2.5 xl:ml-24'> 
        <SidebarLink Icon={MoonIcon} className='text-white' active/>
    </div>  
    {/* Icon on the left */}
    <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} active />
      </div>
      <button className="hidden xl:inline ml-auto bg-black text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-gray">
        Moontweet
      </button>
      <div
        className="text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation xl:ml-auto xl:-mr-5"
        onClick={signOut}
      >
        {/* this controls the image of the user */}
        <Image
          src={session.user.image}
          width={50}
          height={50}
          alt=""
          className="h-10 w-10 rounded-full xl:mr-3"
        />
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">{session.user.name}</h4>
          <p className="text-[#6e767d]">@{session.user.tag}</p>
        </div>
        <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
      </div>
    </div>
  );
}

export default Sidebar;