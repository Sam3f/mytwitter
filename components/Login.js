import React from "react";

import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import { MoonIcon } from "@heroicons/react/solid";

function Login({ providers }) {
  return (
    <div className="text-white flex flex-col items-center space-y-20 pt-48">
      <MoonIcon
        className="text-white"
        width={200}
        height={200}
        objectFit="contain"
      />
      <div>
        {/* convert the object to an array you can map too. 
            We are mapping to each of the providers */}
        {Object.values(providers).map((provider) => (
          //https://devdojo.com/tailwindcss/buttons#_
          <div key={provider.name}>
            <button
              className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500"
              //A callback url means that after a successfull login where do you want the user to go
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700 "></span>
              <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
              <span class="relative text-white">
                Sign in with {provider.name}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;
