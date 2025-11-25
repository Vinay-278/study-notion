import React from 'react'
import ContactFromSection from '../Components/ContactPage/ContactForm'
import LearningGrid from '../Components/Core/AboutPage/LearningGrid'
import Quote from '../Components/Core/AboutPage/Quote'
import Stats from '../Components/Core/AboutPage/Stats'
import HighlightText from '../Components/Core/HomePage/HighlightText'
import ReviewSlider from '../Components/Common/ReviewSlider'
import Footer from '../Components/Common/Footer'
import AboutImg1 from '../assets/Images/aboutus1.webp'
import AboutImg2 from '../assets/Images/aboutus2.webp'
import AboutImg3 from '../assets/Images/aboutus3.webp'
import AboutImg4 from '../assets/Images/FoundingStory.png'


const About = () => {
  return (
    <div>
      <div className="w-screen h-screen flex justify-center ">
        {/* Section 1 */}
        {/* Section 2 */}
        <div className="w-11/12 flex justify-between px-20 py-16">
          <div className="w-[47%] flex flex-col gap-y-9">
            <div className=" leading-relaxed font-bold bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text text-4xl">
              Our Founding Story
            </div>
            <p className="font-bold text-[#838894] leading-relaxed">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p className="font-bold text-[#838894] leading-relaxed">
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>
          <div className="w-[38%] py-28">
            <img
              src={AboutImg4}
              alt=""
              className="shadow-[0_0_20px_0] shadow-[#FC6767]"
            />
          </div>
        </div>
      </div>
      <Quote />
      <Stats />
      <LearningGrid />
      <ContactFromSection />
      <ReviewSlider />
      <Footer />
    </div>
  );
}

export default About
