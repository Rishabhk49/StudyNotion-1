import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"
const timeline = [
    {
        Logo:Logo1,
        heading:"Leadership",
        Description:"Fully commited to the success Company"
    },
    {
        Logo:Logo2,
        heading:"Responsibility",
        Description:"Students will always be our top priority"
    },
    {
        Logo:Logo3,
        heading:"Flexibility",
        Description:"The ability to switch is an important skills"
    },
    {
        Logo:Logo4,
        heading:"Solve the problem",
        Description:"Code your way to a solution"
    },
]
const Timelinesection = () => {
  return (
    <div >
        <div className=' flex lg:flex:row gap-20 mb-20 items-center'>
        
            <div className='lg:w-[45%] flex flex-col gap-14 lg:gap-16'>
            {
                timeline.map( (element, index) => {
                return (
                    <div className='flex flex-row lg:gap-8'key={index}>

                    <div className='w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012]  '>
                         <img src={element.Logo} alt=""/>
                    </div>

                    <div>
                    <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                    <p className='text-base'>{element.Description}</p>
                    </div>

                    </div>
                )
        })
        }
        </div>
        
        <div className='relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]'>
    
      <img src={timelineImage}
        alt="timelineImage"
        className='shadow-white object-fit'
      />
      <div className='absolute flex flex-row bg-caribbeangreen-700 text-white uppercase py-10 '>
        <div className=' absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[5%] lg:translate-y-[-10%]
           bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0
            lg:py-10  '>
           <div className='flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14'>
            <p className='text-3xl font-bold w-[75px]'>10</p>
            <p className='text-caribbeangreen-300 text-sm  w-[75px]'>Years of Experience</p>
        </div>
        <div className='flex gap-5 items-center  px-7 lg:px-14'>
            <p className='text-3xl font-bold w-[75px]'>250</p>
            <p className='text-caribbeangreen-300 text-sm w-[75px]'>Types of courses</p>
        </div>
        </div>
      </div>
        </div>


    </div>
    </div>
    )
}

export default Timelinesection