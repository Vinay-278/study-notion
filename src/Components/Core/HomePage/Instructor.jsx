import React from "react";
import Instructorimg from "../../../assets/Images/Instructor.png";
import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";

const Instructor = () => {
  return (
    <div className="mt-16">
      <div className="flex gap-20 items-center ">
        <div className="w-[50%]">
          <img src={Instructorimg} alt="" className="shadow-white" />
        </div>
        <div className="w-[50%] flex flex-col gap-10">
          <div className="text-4xl font-semibold w-[50%]">
            Become an
            <HighlightText text={" Instructor"} />
          </div>
          <div
            className="font-medium text-[17px] 
           text-[#838894]"
          >
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </div>
          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex gap-2 items-center">
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
