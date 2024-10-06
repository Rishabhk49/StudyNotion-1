import React from 'react'
import { FaArrowRight } from "react-icons/fa"
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/Homepage/HighlightText'
import CTAButton from  "../components/core/Homepage/button"
import banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/Homepage/Codeblocks"
import Footer from '../components/common/footer'
import LearninglanguageSection from '../components/core/Homepage/LearninglanguageSection'
import Timelinesection from '../components/core/Homepage/Timelinesection'
import InstructorSection from '../components/core/Homepage/InstructorSection'
import ExploreMore from '../components/core/Homepage/ExploreMore'

const Home = () => {
  return (
    <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>
      {/* Section  */}
      <div>
        <Link to={"/signup"}>
          <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)'>
            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition duration-200 group-hover:bg-richblack-900'>
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className='text-center text-4xl font-semibold mt-7'>
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>
        <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4'>
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instru.
        </div>

        <div className='flex flex-row gap-7 mt-8 justify-center items-center'>
          <CTAButton active={true} linkto={"/signup"}>
            Learn more
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a demo
          </CTAButton>
        </div>
        <div className='shadow-blue-200 mx-3 my-12'>
          <video muted loop autoPlay>
            <source src={banner} type='video/mp4' />
          </video>
        </div>
        {/* code-section 1*/}
        <div >
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className='text-4xl font-semibold'>
                Unlock Your <HighlightText text={"coding potential"} />
               {' '} with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
            }
            ctabtn1={{
              btnText: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>\n</html>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>
      
      {/* code-section 2 */}
      <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className='text-4xl font-semibold'>
                Start <HighlightText text={"coding in seconds"} />
                 {' '}with our online courses
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn ",
              linkto: "/login",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1><nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>\n</html>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>
        <ExploreMore/>
      </div>
     
      {/* Section 2 */}
      <div className='w-[100vw] bg-pure-greys-5 text-richblack-700'>
        <div className='homepage_bg h-[320px]'>
        <div className='  mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8'>
       <div className="lg:h-[150px]"></div>
        <div className='flex flex-row gap-7 text-white lg:mt-8'>
        <CTAButton active={true} linkto={"/signup"}>
        <div className='flex flex-row gap-2 items-center'>
          Explore Full Catalog
          <FaArrowRight/>
        </div>
            </CTAButton>

            <CTAButton active={false} linkto={"/signup"}>
        <div>
          Learn More
        </div>
           </CTAButton>

        </div>

        </div>

      </div>
      <div className='  mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-7'>
      <div className='flex flex-row gap-5 mt-[95px] mb-10'>
      <div className='text-4xl font-semibold w-[45%]'>
      Get the Skills you need for about<HighlightText text={" Job that is in demand"} />
      </div>
      <div className='flex flex-col gap-6  w-[40%] items-start'>
      <div className='text-[16px]'>
      The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
      </div>
      <div className=''>
      <CTAButton active={true} linkto={"/signup"}>
        <div>
          Learn More
        </div>
           </CTAButton>
      </div>

      </div>

      </div>

      
      <Timelinesection/>
      <LearninglanguageSection/>
      </div>
      </div>
      {/*Section-3*/}
      <div className='relative mx-auto my-20 flex flex-col w-11/12 max-w-maxContent 
      bg-richblack-900 items-center justify-between  text-white gap-8'>
      <InstructorSection />

      {/* Reviws from Other Learner */}
      <h1 className='text-center text-4xl font-semibold mt-8'>
      Reviews From Other Learner
      </h1>


      </div>
      
     
      

      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
