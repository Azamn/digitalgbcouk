"use client";
import { Button } from "@/components/ui/button";
import useClearSessionOnNewTab from "@/hooks/use-clear-cookie";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="mx-auto mt-5 min-h-screen w-[90%] py-10">
      <div className="grid md:grid-cols-2">
        <AdvertisementSection />
        <div className="flex flex-col items-center justify-center p-8">
          <Image src={"/hero.svg"} height={500} width={500} alt="Hero" />
        </div>
      </div>
    </div>
  );
};

export default Hero;

function AdvertisementSection() {
  useClearSessionOnNewTab();

  const handleConnectClick = () => {
    window.open(
      "https://api.whatsapp.com/send/?phone=%2B447555574840&text=Hello+I+am+connecting+you+regarding+digital+marketing+services&type=phone_number&app_absent=0",
      "_blank",
    );
  };

  return (
    <section className="flex flex-col place-items-start pt-12">
      {/* Heading */}
      <h1 className="max-w-4xl text-left text-4xl font-bold leading-9 md:text-6xl">
        Boost Your Online <br /> Presence with Expert <br /> Advertisement
      </h1>

      {/* Subheading */}
      <p className="mt-6 max-w-2xl text-left text-base md:text-xl">
        Transform your digital footprint with our specialized Instagram
        marketing and captivating content services. Elevate your brand's
        visibility and drive growth effortlessly.
      </p>

      {/* Logos */}
      <div className="mt-10 flex flex-wrap items-center justify-start gap-x-2">
        {/* Replace these with your brand logos */}
        <Image
          src="/1.png"
          alt="Blacklist logo"
          width={80}
          height={80}
          className="rounded-full object-contain"
        />
        <Image
          src="/2.png"
          alt="Chai Thai logo"
          width={80}
          height={80}
          className="rounded-full object-contain"
        />
        <Image
          src="/3.png"
          alt="Honeymoon logo"
          width={80}
          height={80}
          className="rounded-full object-contain"
        />
        <Image
          src="/4.png"
          alt="Namaste Lounge logo"
          width={80}
          height={80}
          className="object-contain"
        />
        <Image
          src="/5.png"
          alt="Madras Flavours logo"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      <div className="flex w-full">
        <Button
          onClick={handleConnectClick}
          className="ml-3 mt-4 w-1/4 text-secondary"
        >
          Connect
        </Button>
      </div>
    </section>
  );
}
