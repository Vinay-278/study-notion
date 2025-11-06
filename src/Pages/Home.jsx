import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router'
import HighlightText from './HighlightText';

const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center justify-between text-white">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-[#161D29] font-bold transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-[#000814]">
              <p>Become an Instructor </p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className='text-center text-4xl font-semibold mt-7'>
          Empower Your Future with 
          <HighlightText text={" Coding Skills"}/>
        </div>
      </div>

      {/* section 2 */}

      {/* section 3 */}

      {/* Footer */}
    </div>
  );
}

export default Home
