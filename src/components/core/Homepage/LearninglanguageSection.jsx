import React from 'react'
import HightlightText from './HighlightText'
import Know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Compare_with_others from "../../../assets/Images/Compare_with_others.png"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import CTAbutton from "../Homepage/button"


const LearninglanguageSection = () => {
  return (
    <div>
        <div className="text-4xl font-semibold text-center my-10">
            Your swiss knife for
            <HightlightText text={"learning any language"} />
            <div className='text-center text-base mt-3 text-richblack-700 font-medium lg:w-[75%] mx-auto'>
            Using spin making learning multiple languages easy. with 20+ languages 
            realistic voice-over, progress tracking, custom schedule and more.
            </div>
        </div>
        <div className='flex  flex-col lg:flex-row items-center justify-center'>
            <img 
            src={Know_your_progress}
            alt=""
           className="object-maintain lg:-mr-32"
           />
            <img 
            src={Compare_with_others}
            alt=""
           className="object-maintain lg:-mr-32"
           />
            <img 
            src={Plan_your_lessons}
            alt=""
           className="object-maintain lg:-mr-32"
           />

        </div>
        <div className='w-fit mx-auto lg:mb-20 mb-8 mt-5'>
            <CTAbutton active={true} linkto={"/signup"}>
                Learn More
            </CTAbutton>
        </div>
    </div>
  )
}

export default LearninglanguageSection