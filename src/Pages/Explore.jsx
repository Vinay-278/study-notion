import React, { useState } from 'react'
import { HomePageExplore } from '../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard'


const tabName= [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

const Explore = () => {

  const [currentTab, setCurrentTab] =useState(tabName[0]);
  const [courses, setcourses] =useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] =useState(HomePageExplore[0].courses[0].heading);

  const setMyCards = (value) =>{
      setCurrentTab(value);
      const result= HomePageExplore.filter((courses)=>courses.tag==value);
      setcourses(result[0].courses);
      setCurrentCard(result[0].courses[0].heading);
  }


  return (
    <div>
      <div className="text-4xl font-semibold text-center">
        Unlock the
        <HighlightText text={" Power of Code"} />
      </div>
      <div className="text-center text-[#838894] text-md mt-3">
        Learn to build anything you can imagine
      </div>
      <div className="flex rounded-full bg-[#161D29] mb-5 mt-5 px-1 py-1">
        {tabName.map((ele, key) => (
          <div
            className={`text-[16px] items-center ${
              currentTab == ele
                ? "bg-[#000814] text-[#F1F2FF] font-medium"
                : "text-[#999DAA]"
            } rounded-full transition-all duration-200 cursor-pointer hover:bg-[#000814] hover:text-[#F1F2FF] px-7 py-3 `}
            onClick={() => setMyCards(ele)}
          >
            {ele}
          </div>
        ))}
      </div>
      <div className=" hidden lg:h-[150px] lg:block"></div>
      <div className="absolute flex gap-10 justify-center mb-7 px-3 left-[50%] translate-x-[-50%] translate-y-[-50%]">
        {courses.map((ele, idx) => (
          <CourseCard
            cardData={ele}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
            key={idx}
          />
        ))}
      </div>
      {/* Course card ka group */}
    </div>
  );
}

export default Explore
