import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaCalendar, FaFileAlt, FaEnvelope, FaComment, } from 'react-icons/fa';
import { HiMiniTrophy } from 'react-icons/hi2';
import { MdGroups2 } from 'react-icons/md';
import { GiVerticalBanner } from "react-icons/gi";
import Cookies from 'js-cookie';
import BellIcon from '@heroicons/react/solid/BellIcon';
import PaperAirplaneIcon from '@heroicons/react/solid/PaperAirplaneIcon';
import UserCircleIcon from '@heroicons/react/solid/UserCircleIcon';
import ArrowLeftIcon from '@heroicons/react/solid/ArrowLeftIcon';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  const [isActivitiesOpen, setActivitiesOpen] = useState(false);
  const [token, setToken] = useState<string | undefined>(Cookies.get('userToken'));

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen]);

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const handleMenuClick = () => {
    setSidebarOpen(false);
  };

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        />
        {sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="block lg:hidden absolute top-5 left-5 z-50 text-black bg-transparent border-0"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        )}
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-black dark:text-white ">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <NavLink
                to="/dashboard"
                onClick={handleMenuClick}
                className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('dashboard') && ''}`}
              >
                <FaHome className="text-lg text-red-500" />
                Dashboard
              </NavLink>

              <li>
                <NavLink
                  to="/dashboard/calendar"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark  dark:hover:bg-meta-4 ${pathname.includes('calendar') && ''
                    }`}
                >
                  <FaCalendar className="text-lg text-green-400" />
                  Calendar
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/profile"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black hover:text-white duration-300 ease-in-out dark:text-white hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'}`}
                >
                  < UserCircleIcon className="h-8 w-8 text-yellow-400" />
                  Profile
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/products"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('documents') &&
                    'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <MdGroups2 className="text-xl text-green-400" />
                  All Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/create_products"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('documents') &&
                    'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <MdGroups2 className="text-xl text-green-400" />
                  Add Products
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/upload"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('settings') &&
                    'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <HiMiniTrophy className="text-lg text-orange-400" />
                  Performance
                </NavLink>
              </li>

              {/* <li>
                <NavLink
                  to="/dashboard/stock"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('stock') && 'bg-graydark dark:bg-meta-4'}`}
                >
                  <ClipboardListIcon className="h-8 w-8 text-red-700" />
                  Stock Status
                </NavLink>
              </li> */}
              {/*
              <li>
                <NavLink
                  to="/dashboard/getoffers"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('getoffers') && 'bg-graydark dark:bg-meta-4'}`}
                >
                  < GiftIcon   className="h-8 w-8 text-pink-600" />
                  Get All Offers
                </NavLink>
              </li> */}

              <li>
                <NavLink
                  to="/dashboard/globalnotification"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('globalnotification') && 'bg-graydark dark:bg-meta-4'}`}
                >
                  < BellIcon className="h-8 w-8 text-orange-400" />
                  Create Notification
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/banners"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('globalnotification') && 'bg-graydark dark:bg-meta-4'}`}
                >
                  < GiVerticalBanner className="h-8 w-8 text-orange-400" />
                  Banners
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/sendnotification"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('sendnotification') && 'bg-graydark dark:bg-meta-4'}`}
                >
                  < PaperAirplaneIcon className="h-8 w-8 text-green-700" />
                  Send Notification
                </NavLink>
              </li>

              <li>
                <div
                  onClick={() => setActivitiesOpen(!isActivitiesOpen)}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${isActivitiesOpen ? 'bg-graydark dark:bg-meta-4' : ''}`}
                >
                  <FaFileAlt className="text-lg text-purple-400" />
                  Activities
                  <span
                    className={`ml-auto ${isActivitiesOpen ? 'rotate-180' : ''
                      }`}
                  >
                    <svg
                      className="w-4 h-4 transform transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </span>
                </div>
                {isActivitiesOpen && (
                  <ul className="pl-4 mt-2 space-y-1">
                    <li>
                      <NavLink
                        to="/dashboard/send-message"
                        onClick={handleMenuClick}
                        className={`group flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('send-message') &&
                          'bg-graydark dark:bg-meta-4'
                          }`}
                      >
                        <FaComment className="text-lg text-blue-500" />
                        Send Message
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/send-email"
                        onClick={handleMenuClick}
                        className={`group flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('send-email') &&
                          'bg-graydark dark:bg-meta-4'
                          }`}
                      >
                        <FaEnvelope className="text-lg text-blue-500" />
                        Send Email
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li></li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
