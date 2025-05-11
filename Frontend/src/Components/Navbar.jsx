import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='w-full flex justify-between items-center font-semibold'>
        {/* Navigation Arrows */}
        <div className='flex items-center gap-2'>
          <img 
            className='w-8 bg-black rounded-2xl cursor-pointer' 
            src={assets.arrow_left} 
            alt='Go back' 
            onClick={() => navigate(-1)} // Go back one step
          />
          <img 
            className='w-8 bg-black rounded-2xl cursor-pointer' 
            src={assets.arrow_right} 
            alt='Go forward' 
            onClick={() => navigate(1)} // Go forward one step
          />
        </div>

        {/* Premium and Install Options */}
        <div className='flex items-center gap-4'>
          <p 
            className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer'
            onClick={() => navigate('/premium')} // Navigate to Premium page
          >
            Explore Premium
          </p>
          <p 
            className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer'
            onClick={() => navigate('/install')} // Navigate to Install App page
          >
            Install App
          </p>
          <p 
            className='bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center cursor-pointer'
            onClick={() => navigate('/profile')} // Navigate to Profile page
          >
            D
          </p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className='flex items-center gap-2 mt-4'>
        <p 
          className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'
          onClick={() => navigate('/all')}
        >
          All
        </p>
        <p 
          className='bg-black px-4 py-1 rounded-2xl cursor-pointer'
          onClick={() => navigate('/music')}
        >
          Music
        </p>
        <p 
          className='bg-black px-4 py-1 rounded-2xl cursor-pointer'
          onClick={() => navigate('/podcasts')}
        >
          Podcasts
        </p>
      </div>
    </>
  );
};

export default Navbar;
