"use client";

import React from "react";
import { useHome } from "./hooks";
import { AlertBanner } from "@/components/ui/alert";
import Image from "next/image";
import { JuniorSoccer } from "@/assets";

export function Home() {
  const response = useHome();

  return (
    <div className="container mx-auto p-5 space-y-10">
      <div className="flex items-center border rounded-lg">
        <input
          type="date"
          name="date"
          id="date"
          className="border-r-2 p-2 outline-0 focus:outline-0"
          onChange={response.handleDateChange}
          value={response.date}
        />
        <input
          type="search"
          name="search"
          id="search"
          placeholder="search by team name, country, competition"
          className="border-none flex-1 focus:border-0 p-2 outline-0 focus:outline-0"
          onChange={response.handleSearchChange}
          value={response.search}
        />
      </div>

      <div>
        {response.closeAlert && (
          <AlertBanner
            message={response.error}
            onClose={response.handleClose}
          />
        )}
      </div>

      <div className="p-5">
        {response.data.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
            ref={response.containerRef}
          >
            {response.data.map((item, idx) => (
              <div
                key={idx}
                className="dark:bg-black/80 bg-red-500/10 p-5 space-y-10 rounded-xl"
              >
                <div className="flex justify-between items-center flex-nowrap">
                  <div className="text-center">
                    <Image
                      src={item.homeLogo}
                      alt={item.homeTeam}
                      width={50}
                      height={50}
                      quality={100}
                      className="w-10 h-10 mx-auto"
                    />
                    <h4 className="text-base md:text-sm font-medium dark:text-white/70 text-black">
                      {item.homeTeam}
                    </h4>
                    <p className="dark:text-white/30 text-gray-600 text-sm md:text-xs">
                      Home
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="dark:text-white/30 text-gray-600 text-sm md:text-xs">
                      VS
                    </p>
                  </div>

                  <div className="text-center">
                    <Image
                      src={item.awayLogo}
                      alt={item.awayTeam}
                      width={50}
                      height={50}
                      quality={100}
                      className="w-10 h-10 mx-auto"
                    />
                    <h4 className="text-base md:text-sm font-medium dark:text-white/70 text-black">
                      {item.awayTeam}
                    </h4>
                    <p className="dark:text-white/30 text-gray-600 text-sm md:text-xs">
                      Away
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm md:text-xs dark:text-white/30 text-gray-600">
                    Home win chance: {item.home_win}%
                  </p>
                  <div className="h-[0.5px] w-full bg-gray-400" />
                  <p className="flex justify-end text-sm md:text-xs dark:text-white/30 text-gray-600">
                    {item.competition}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-5 justify-center w-full h-[80dvh] items-center">
            <Image
              src={JuniorSoccer}
              alt="No Prediction"
              width={500}
              height={500}
            />
            <p className="text-center w-full md:w-1/2">
              No predictions found just yet! We&apos;re either between matches
              or still crunching the numbers. Try another date or check back
              soon!
            </p>
          </div>
        )}
      </div>

      {response.loading && (
        <div role="status" className="flex justify-center items-center">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
}
