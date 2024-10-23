import React, { useEffect, useState } from 'react';
import { FaUser, FaStar, FaTasks, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CardDataStats from '../../components/CardDataStats';
import MapOne from '../../components/Maps/MapOne';
import { motion } from 'framer-motion';
import { TrendingUpIcon , ChartBarIcon,UserGroupIcon,GiftIcon ,StarIcon,ClipboardListIcon } from '@heroicons/react/solid';
import Cookies from 'js-cookie';
import axios from 'axios';

// Define types for user data and stock data
interface UserData {
  firstname: string;
  [key: string]: any; // To allow other potential user properties
}

interface StockData {
  mostSellingProductsCount?: number;
  users?: number;
  topRatedProducts?: number;
  popularProducts?: number;
}

const ECommerce: React.FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(Cookies.get('userToken'));
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userdata, setUserdata] = useState<UserData>({ firstname: '' }); // Initialize firstname to avoid undefined errors
  const [stock, setStock] = useState<StockData>({}); // Initialize as an empty object

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.defaults.baseURL = apiUrl;
    }

    const fetchUserDetail = async () => {
      try {
        const response = await axios.get('user/admin/getuser');
        setUserdata(response.data.getaUser);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (token) {
      fetchUserDetail();
    }
  }, [token, apiUrl]);

  const fetchStats = async () => {
    try {
      const response = await axios.get('user/admin/getdata');
      setStock(response.data.counts);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  // Fetch stock stats when component mounts
  useEffect(() => {
    fetchStats();
  }, []);

  // Navigation handlers
  const handleAttendance = () => navigate('/dashboard/sellingproduct');
  const handleReview = () => navigate('/dashboard/mostpopular');
  const handleTask = () => navigate('/dashboard/user');
  const handleTaskDetail = () => navigate('/dashboard/topproduct');
  const handleStock = () => navigate('/dashboard/stock');
  const handleOffer = () => navigate('/dashboard/getoffers');

  return (
    <>
      <motion.div
        className="bg-gray-800 shadow-2xl rounded-lg p-8 mb-6 flex items-center space-x-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center space-x-4">
          <motion.div
            className="w-20 h-20 flex-shrink-0 rounded-full bg-white p-2 flex items-center justify-center shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 300 }}
          >
            <FaUser className="w-12 h-12 text-blue-500 hover:text-blue-600 transition-colors duration-300" />
          </motion.div>
          <div>
            <h1 className="text-4xl font-bold text-black dark:text-white">
              Welcome,{' '}
              <span className="text-blue-300 uppercase">
                {userdata.firstname || 'Guest'}
              </span>
            </h1>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <div onClick={handleAttendance} className="cursor-pointer">
          <CardDataStats
            title="Most Selling Product"
            total={stock.mostSellingProductsCount ?? 0}
            rate="55"
            levelUp
          >
            <ChartBarIcon  className=" w-9 text-blue-500 dark:text-white text-3xl transition-transform transform hover:scale-110" />
          </CardDataStats>
        </div>


        <div onClick={handleTaskDetail} className="cursor-pointer">
          <CardDataStats
            title="Top Products"
            total={stock.topRatedProducts ?? 0}
            rate=""
            levelDown
          >
            <TrendingUpIcon className="text-green-500 dark:text-white text-3xl transition-transform transform hover:scale-110" />
          </CardDataStats>
        </div>

        <div onClick={handleReview} className="cursor-pointer">
          <CardDataStats
            title="Popular Product"
            total={stock.popularProducts ?? 0}
            rate="4.5%"
            levelUp
          >
            <StarIcon className=" w-13 text-yellow-400 dark:text-white text-3xl transition-transform transform hover:scale-110" />
          </CardDataStats>
        </div>

        
        <div onClick={handleStock} className="cursor-pointer">
          <CardDataStats
            title="Stock Status"
            total={stock.topRatedProducts ?? 0}
            rate=""
            levelDown
          >
            <ClipboardListIcon className="text-purple-500 w-10 dark:text-white text-3xl transition-transform transform hover:scale-110" />
          </CardDataStats>
        </div>
       
        <div onClick={handleStock} className="cursor-pointer">
          <CardDataStats
            title=" Get All Offers"
            total={stock.topRatedProducts ?? 0}
            rate=""
            levelDown
          >
            <GiftIcon  className=" text-pink-600 w-10 dark:text-white text-3xl transition-transform transform hover:scale-110" />
          </CardDataStats>
        </div>

        <div onClick={handleTask} className="cursor-pointer">
          <CardDataStats
            title="See all Users"
            total={stock.users ?? 0}
            rate="0%"
            levelUp
          >
            <FaUsers className=" w-9 text-orange-500 dark:text-white text-3xl transition-transform transform hover:scale-110" />
          </CardDataStats>
        </div>



      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          {/* Additional content can go here */}
        </div>
      </div>
    </>
  );
};

export default ECommerce;
