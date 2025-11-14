import React from 'react'
import { HiUser } from 'react-icons/hi';
import { ImTree } from 'react-icons/im';

const CourseCard = ({cardData,currentCard,setCurrentCard}) => {
  return (
    <div
      className="w-[340px] bg-[#161D29] text-[#DBDDEA] h-[270px] box-border cursor-pointer transfrom trasition duration-300 ease-in-out hover:scale-105 hover:bg-white hover:shadow-[12px_12px_0_0] hover:shadow-yellow-300 hover:text-[#161D29] "
      onClick={() => setCurrentCard(cardData)}
    >
      <div className="border-b-[2px] border-[#6E727F] border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div className="font-semibold text-[20px]">{cardData.heading}</div>
        <div className="text-[#6E727F]">{cardData.description}</div>
      </div>
      <div className="flex justify-between text-blue-300 hover:text-[#838894] px-6 py-3 font-medium">
        {/* Evenly */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUser />
          {cardData.level}
        </div>
        {/* Flow chart */}
        <div className="flex gap-2 text-[16px] items-center">
          <ImTree />
          <div>{cardData.lessionNumber}</div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard
