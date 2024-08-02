"use client";

import Image from "next/image";
import { memo, useEffect, useState } from "react";

import { navElements } from "@/constants";
import { ActiveElement, NavbarProps } from "@/types/type";

import { Button } from "./ui/button";
import ShapesMenu from "./ShapesMenu";
import ActiveUsers from "./users/ActiveUsers";
import { NewThread } from "./comments/NewThread";

const Navbar = ({
  activeElement,
  imageInputRef,
  handleImageUpload,
  handleActiveElement,
}: NavbarProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    setIsMobile(mobile);
  }, []);

  const isActive = (value: string | Array<ActiveElement>) =>
    (activeElement && activeElement.value === value) ||
    (Array.isArray(value) &&
      value.some((val) => val?.value === activeElement?.value));

  if (isMobile) {
    return (
      <div className='flex h-screen w-full items-center justify-center bg-primary-black px-4 text-white'>
        <h1 className='text-center text-lg sm:text-xl md:text-2xl'>
          Sorry. This website is not available to view on mobile devices.
        </h1>
      </div>
    );
  }

  return (
    <nav className='flex select-none items-center justify-between gap-4 bg-primary-black px-5 py-2 text-white'>
      <div className='flex items-center'>
        <Image
          src='/assets/logo-ui-studio.png'
          alt='UI STUDIO'
          width={205}
          height={20}
        />
      </div>

      <ul className='flex flex-row flex-wrap items-center justify-center gap-2'>
        {navElements.map((item: ActiveElement | any) => (
          <li
            key={item.name}
            onClick={() => {
              if (Array.isArray(item.value)) return;
              handleActiveElement(item);
            }}
            className={`group flex items-center justify-center px-2.5 py-2
            ${isActive(item.value) ? "bg-primary-green" : "hover:bg-primary-grey-200"}
            `}
          >
            {Array.isArray(item.value) ? (
              <ShapesMenu
                item={item}
                activeElement={activeElement}
                imageInputRef={imageInputRef}
                handleActiveElement={handleActiveElement}
                handleImageUpload={handleImageUpload}
              />
            ) : item?.value === "comments" ? (
              <NewThread>
                <Button className='relative h-5 w-5 object-contain'>
                  <Image
                    src={item.icon}
                    alt={item.name}
                    fill
                    className={isActive(item.value) ? "invert" : ""}
                  />
                </Button>
              </NewThread>
            ) : (
              <Button className='relative h-5 w-5 object-contain'>
                <Image
                  src={item.icon}
                  alt={item.name}
                  fill
                  className={isActive(item.value) ? "invert" : ""}
                />
              </Button>
            )}
          </li>
        ))}
      </ul>

      <div className='hidden sm:block'>
        <ActiveUsers />
      </div>
    </nav>
  );
};

export default memo(
  Navbar,
  (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement
);
