import React from 'react'

const content = [
  {
    text: "Our Vision",
    para: "With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.",
  },
  {
    text: "Our Mission",
    para: "Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.",
  },
];

const Quote = () => {
  return (
    <div className="w-screen flex justify-center gap-x-15 py-20">
      <div className="w-11/12 flex gap-x-10 justify-evenly">
        {content.map((val, key) => (
          <div className="w-[40%] flex flex-col gap-y-5">
            <div
              className={`${
                key == 0
                  ? "leading-relaxed font-semibold bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text text-4xl"
                  : "leading-relaxed font-semibold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl"
              }`}
            >
              {val.text}
            </div>
            <div className="font-bold text-[#838894] leading-relaxed">
              {val.para}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quote
