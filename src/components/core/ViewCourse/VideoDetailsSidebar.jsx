import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { BsChevronDown } from "react-icons/bs";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  // State to handle active section and active video (subsection)
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { sectionId, subSectionId } = useParams(); 

  const {
    courseSectionData,
    courseEntireData,
   // totalNoOflectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const totalNoOflectures = courseSectionData.reduce((total, section) => {
    return total + section.subSection.length;
  }, 0);

  useEffect(() => {
    if (!courseSectionData.length) return;
    
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndx = courseSectionData?.[currentSectionIndx]?.subSection.findIndex(
      (data) => data._id === subSectionId
    );
    const activeSubSectionId =
      courseSectionData[currentSectionIndx]?.subSection?.[currentSubSectionIndx]?._id;
    
    // Set current active section and subsection
    setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
    setVideoBarActive(activeSubSectionId);
  }, [courseSectionData, location.pathname, sectionId, subSectionId]);

  return (
    <>
      <div>
        {/* Back button and Add Review button */}
        <div className="flex justify-between items-center mb-4 mt-6">
          <div
            onClick={() => {
              navigate(`/dashboard/enrolled-courses`);
            }}
            className="cursor-pointer"
          >
            <IoIosArrowBack size={30} className="text-white" />
          </div>
          <button
            customClasses="ml-auto"
            onClick={() => setReviewModal(true)}
            className="bg-yellow-50 font-bold flex items-center space-x-2 py-1 px-2 rounded-lg hover:shadow-lg">
            Add Review
          </button>
        </div>

        {/* Course Information */}
        <div className="flex flex-col">
          <p className="font-bold text-lg text-white">{courseEntireData?.courseName}</p>
          <p className="text-sm font-semibold text-richblack-500">
            {completedLectures?.length} / {totalNoOflectures} Lectures Completed
          </p>
        </div>

        {/* Sections and Subsections */}
        <div className="h-[calc(100vh - 5rem)] overflow-y-auto mt-4">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >
              {/* Section */}
              <div className="flex justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">{course?.sectionName}</div>
                <div className="flex items-center gap-3">
                  <span
                    className={`${
                      activeStatus === course?._id ? "rotate-0" : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown  className="text-white"/>
                  </span>
                </div>
              </div>

              {/* Subsections */}
              {activeStatus === course?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {course?.subSection.map((topic, index) => (
                    <div
                      className={`flex gap-3 px-5 py-2 ${
                        videoBarActive === topic._id
                          ? "bg-yellow-200 font-semibold text-richblack-800"
                          : "hover:bg-richblack-900"
                      }`}
                      key={index}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        );
                        setVideoBarActive(topic._id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                      />
                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;

