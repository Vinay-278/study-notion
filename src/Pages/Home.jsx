import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import Banner from "../assets/Images/banner1.mp4";
import CodeBlocks from "../Components/CodeBlocks";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center justify-between gap-8 text-white">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-[#161D29] font-bold transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-[#000814]">
              <p>Become an Instructor </p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={" Coding Skills"} />
        </div>
        <div className="mt-4 w-[90%] text-center text-lg font-bold text-[#838894]">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>
        <div className=" mx-3 my-7 shadow-[10px_-5px_40px_-5px_aqua]">
          <video src={Banner} loop muted autoPlay></video>
        </div>
        {/* codeSection1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="w-full text-4xl font-semibold lg:w-[50%]">
                Unlock your
                <HighlightText text={" coding potential "} />
                with our online courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-[aqua]"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroudGradient={<div className="codeblock1 absolute"></div>}
          />
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-full text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text={" coding in seconds "} />
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-[aqua]"}
            codeblock={`import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nfrom sklearn.linear_model import LogisticRegression\n\nX = np.array([1,2,3,4,5])\nY = np.array([1,2,2,2,1])\n\nmodel = LogisticRegression()\nmodel.fit(X,Y)`}
            backgroudGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>
      </div>

      {/* section 2 */}

      {/* section 3 */}

      {/* Footer */}
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
