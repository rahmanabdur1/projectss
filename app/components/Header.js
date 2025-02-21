"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { useParams } from 'next/navigation';

import { useData } from "../service/Provider";
import { debounce, throttle } from 'lodash';

const Logo = React.memo(({ logo }) => (
  <div className="logo_wrapper w-5/6 lg:w-1/6">
    <Link href="/">
      <Image
        src={`${process.env.NEXT_PUBLIC_POST_URL}/api/uploads/${logo}`}
        width={150}
        height={45}
        alt="Logo Image"
        loading="lazy"
      />
    </Link>
  </div>
));
Logo.displayName = 'Logo'; 

const MenuItems = React.memo(({ menuItems }) => (
  <ul
    className={`uppercase text-sm flex items-center gap-9 font-bold justify-end ${menuItems ? "text-white" : "text-[#777]"}`}
  >
    {menuItems?.map((elem) => (
      <li key={elem.me_id}>
        <Link className="hover:text-[#ffd966] duration-100" href={elem.menu_link}>
          {elem.menu_name}
        </Link>
      </li>
    ))}
  </ul>
));
MenuItems.displayName = 'MenuItems';


const SocialLinks = React.memo(() => (
  <ul className="flex w-full gap-4 lg:gap-4 mt-4 items-center justify-center">
    <li className="text-lg bg-black text-white p-1 rounded">
      <Link href={`#contacto`}><IoMdMail /></Link>
    </li>
    <li className="text-lg bg-black text-white p-1 rounded">
      <Link href={`https://instagram.puramas.co/`} target="_blank"><FaInstagram /></Link>
    </li>
    <li className="text-lg bg-black text-white p-1 rounded">
      <Link href={`https://youtube.puramas.co/`} target="_blank"><FaYoutube /></Link>
    </li>
    <li className="text-lg bg-black text-white p-1 rounded">
      <Link href={`https://facebook.puramas.co/`} target="_blank"><FaFacebookF /></Link>
    </li>
  </ul>
));
SocialLinks.displayName = 'SocialLinks'; 

const Header = () => {
  const { slug } = useParams();
  const data = useData();  

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  const checkWindowSize = useCallback(
    debounce(() => {
      setIsMobile(window.innerWidth < 991);
    }, 200),
    []
  );


  useEffect(() => {
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);

    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, [checkWindowSize]);


  const handleScroll = useCallback(
    throttle(() => {
      setIsScrolled(window.scrollY > 50);
      setMenuOpen(false);
    }, 200),
    []
  );


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (!data) {
    return <div>Loading...</div>; 
  }

  return (
    <header
      id="header"
      className={`absolute w-full ${isScrolled ? "scrolled-header" : ""} ${
        slug ? "shadow-custom" : ""
      }`}
    >
      <nav className="container m-auto relative">
        <div className="flex items-center justify-between py-6">
          <Logo logo={data?.logo[0]?.site_logo} />
          {isMobile && (
            <button
              className={`text-2xl ${slug && !isScrolled ? "text-black" : "text-white"} lg:hidden`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          )}
          <div className="menu_wrapper hidden lg:block w-5/6">
            <MenuItems menuItems={data?.menuItems || []} />
          </div>
        </div>
        {menuOpen && (
          <div className="absolute top-16 right-3">
            <ul
              className={`uppercase text-sm flex flex-col bg-[#ededed] 
                text-[#000] font-normal p-5 justify-end gap-4 w-[180px]`}
            >
              {data?.menuItems?.map((elem) => (
                <li key={elem.me_id}>
                  <Link href={elem.menu_link}>{elem.menu_name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
