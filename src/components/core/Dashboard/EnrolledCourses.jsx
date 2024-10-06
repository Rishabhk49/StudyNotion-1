// import { useEffect, useState } from "react";
// import ProgressBar from "@ramonak/react-progress-bar";

// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import { getUserEnrolledCourses } from "../../../Service/Operation/profileAPI";

// export default function EnrolledCourses() {
//   const { token } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   const [enrolledCourses, setEnrolledCourses] = useState(null);
//   const getEnrolledCourses = async () => {
//     try {
//       const res = await getUserEnrolledCourses(token);
//       console.log("Response from API:", res); // Log response from API

//       setEnrolledCourses(res);
//     } catch (error) {
//       console.log("Could not fetch enrolled courses.");
//     }
//   };
//   useEffect(() => {
//     getEnrolledCourses();
//   }, []);

//   return (
//     <>
//       <div className="text-3xl text-richblack-50">Enrolled Courses</div>
//       {!enrolledCourses ? (
//         <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//           <div className="spinner"></div>
//         </div>
//       ) : !enrolledCourses.length ? (
//         <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
//           You have not enrolled in any course yet.
//           {/* TODO: Modify this Empty State */}
//         </p>
//       ) : (
//         <div className="my-8 text-richblack-5">
//           {/* Headings */}
//           <div className="flex rounded-t-lg bg-richblack-500 ">
//             <p className="w-[45%] px-5 py-3">Course Name</p>
//             <p className="w-1/4 px-2 py-3">Duration</p>
//             <p className="flex-1 px-2 py-3">Progress</p>
//           </div>
//           {/* Course Names */}

//           {enrolledCourses.map((course, i, arr) => (
            
//             <div
//               className={`flex items-center border border-richblack-700 ${
//                 i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
//               }`}
//               key={i}
//             >
//               <div
//                 className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
//                 onClick={() => {
//                   // Log the course data to inspect the structure
//                   console.log("Course Data:", course);

//                   // Check if courseContent, sections, and sub-sections are available
//                   if (
//                     course?._id &&
//                     course?.courseContent?.length > 0 &&
//                     course?.courseContent[0]?._id &&
//                     course?.courseContent[0]?.subSection?.length > 0 &&
//                     course?.courseContent[0]?.subSection[0]?._id
//                   ) {
//                     // If all required data is available, navigate to the correct route
//                     navigate(
//                       `/view-course/${course._id}/section/${course.courseContent[0]._id}/sub-section/${course.courseContent[0].subSection[0]._id}`
//                     );
//                   } else {
//                     // Log missing parts for debugging
//                     if (!course?._id) console.log("Missing course ID");
//                     if (
//                       !course?.courseContent ||
//                       course.courseContent.length === 0
//                     ) {
//                       console.log(
//                         "Missing course content or course content is empty"
//                       );
//                     } else if (!course?.courseContent[0]?._id) {
//                       console.log("Missing section ID in course content");
//                     } else if (
//                       !course?.courseContent[0]?.subSection ||
//                       course.courseContent[0].subSection.length === 0
//                     ) {
//                       console.log(
//                         "Missing sub-section data or sub-section is empty"
//                       );
//                     } else if (!course?.courseContent[0]?.subSection[0]?._id) {
//                       console.log("Missing sub-section ID");
//                     }

//                     // Log a general message for missing content
//                     console.log(
//                       "Course content or sub-section data is missing."
//                     );
//                   }
//                 }}
//               >
//                 <img
//                   src={course.thumbnail}
//                   alt="course_img"
//                   className="h-14 w-14 rounded-lg object-cover"
//                 />
//                 <div className="flex max-w-xs flex-col gap-2">
//                   <p className="font-semibold">{course.courseName}</p>
//                   <p className="text-xs text-richblack-300">
//                     {course.courseDescription.length > 50
//                       ? `${course.courseDescription.slice(0, 50)}...`
//                       : course.courseDescription}
//                   </p>
//                 </div>
//               </div>
//               <div className="w-1/4 px-2 py-3">2h 30min</div>
//               <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
//                 <p>Progress: {course.progressPercentage || 0}%</p>
//                 <ProgressBar
//                   completed={course.progressPercentage || 0}
//                   height="8px"
//                   isLabelVisible={false}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }
// // import { useEffect, useState } from "react";
// // import ProgressBar from "@ramonak/react-progress-bar";
// // import { useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { getUserEnrolledCourses } from "../../../Service/Operation/profileAPI";

// // export default function EnrolledCourses() {
// //   const { token } = useSelector((state) => state.auth);
// //   const navigate = useNavigate();

// //   const [enrolledCourses, setEnrolledCourses] = useState(null);

// //   const getEnrolledCourses = async () => {
// //     try {
// //       const res = await getUserEnrolledCourses(token);
// //       console.log("Response from API:", res); // Log response from API
// //       setEnrolledCourses(res);
// //     } catch (error) {
// //       console.log("Could not fetch enrolled courses.");
// //     }
// //   };

// //   useEffect(() => {
// //     getEnrolledCourses();
// //   }, []);

// //   return (
// //     <>
// //       <div className="text-3xl text-richblack-50">Enrolled Courses</div>
// //       {!enrolledCourses ? (
// //         <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
// //           <div className="spinner"></div>
// //         </div>
// //       ) : !enrolledCourses.length ? (
// //         <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
// //           You have not enrolled in any course yet.
// //           {/* TODO: Modify this Empty State */}
// //         </p>
// //       ) : (
// //         <div className="my-8 text-richblack-5">
// //           {/* Headings */}
// //           <div className="flex rounded-t-lg bg-richblack-500 ">
// //             <p className="w-[45%] px-5 py-3">Course Name</p>
// //             <p className="w-1/4 px-2 py-3">Duration</p>
// //             <p className="flex-1 px-2 py-3">Progress</p>
// //           </div>
// //           {/* Course Names */}
// //           {enrolledCourses.map((course, i, arr) => {
// //             // Debugging logs to check course content and subsections
// //             console.log("Course Name:", course.courseName);
// //             console.log("Course Content:", course.courseContent);
// //             console.log("Section ID:", course.courseContent?.[0]?._id);
// //             console.log("Sub-section ID:", course.courseContent?.[0]?.subSection?.[0]?._id);

// //             return (
// //               <div
// //                 className={`flex items-center border border-richblack-700 ${
// //                   i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
// //                 }`}
// //                 key={i}
// //               >
// //                 <div
// //                   className={`flex w-[45%] items-center gap-4 px-5 py-3 ${
// //                     course.courseContent?.length &&
// //                     course.courseContent[0]?.subSection?.length
// //                       ? "cursor-pointer"
// //                       : "cursor-not-allowed"
// //                   }`}
// //                   onClick={() => {
// //                     const sectionId = course.courseContent?.[0]?._id;
// //                     const subSectionId =
// //                       course.courseContent?.[0]?.subSection?.[0]?._id;

// //                     // Ensure both sectionId and subSectionId exist
// //                     if (sectionId && subSectionId) {
// //                       navigate(
// //                         `/view-course/${course?._id}/section/${sectionId}/sub-section/${subSectionId}`
// //                       );
// //                     } else {
// //                       console.error(
// //                         "Section or Sub-section is missing for this course."
// //                       );
// //                     }
// //                   }}
// //                 >
// //                   <img
// //                     src={course.thumbnail}
// //                     alt="course_img"
// //                     className="h-14 w-14 rounded-lg object-cover"
// //                   />
// //                   <div className="flex max-w-xs flex-col gap-2">
// //                     <p className="font-semibold">{course.courseName}</p>
// //                     <p className="text-xs text-richblack-300">
// //                       {course.courseDescription.length > 50
// //                         ? `${course.courseDescription.slice(0, 50)}...`
// //                         : course.courseDescription}
// //                     </p>
// //                   </div>
// //                 </div>
// //                 <div className="w-1/4 px-2 py-3">2h 30min</div>
// //                 <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
// //                   <p>Progress: {course.progressPercentage || 0}%</p>
// //                   <ProgressBar
// //                     completed={course.progressPercentage || 0}
// //                     height="8px"
// //                     isLabelVisible={false}
// //                   />
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       )}
// //     </>
// //   );
// // }
import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserEnrolledCourses } from "../../../Service/Operation/profileAPI";

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      console.log("Response from API:", res); // Log response from API
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>

          {enrolledCourses.map((course, i, arr) => {
            console.log("Course Name:", course.courseName);
            console.log("Course Description:", course.courseDescription);
            console.log("Course Thumbnail:", course.thumbnail);

            // Check if courseName or courseDescription are not strings
            const courseName = typeof course.courseName === "string" ? course.courseName : "Unknown Course";
            const courseDescription = typeof course.courseDescription === "string"
              ? (course.courseDescription.length > 50
                  ? `${course.courseDescription.slice(0, 50)}...`
                  : course.courseDescription)
              : "Description not available";

            // Ensure thumbnail is a valid string, otherwise use a default image
            const thumbnail = typeof course.thumbnail === "string" ? course.thumbnail : "/default-thumbnail.png";

            return (
              <div
                className={`flex items-center border border-richblack-700 ${
                  i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                }`}
                key={i}
              >
                <div
                  className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                  onClick={() => {
                    if (
                      course?._id &&
                      course?.courseContent?.length > 0 &&
                      course?.courseContent[0]?._id &&
                      course?.courseContent[0]?.subSection?.length > 0 &&
                      course?.courseContent[0]?.subSection[0]?._id
                    ) {
                      navigate(
                        `/view-course/${course._id}/section/${course.courseContent[0]._id}/sub-section/${course.courseContent[0].subSection[0]._id}`
                      );
                    } else {
                      console.log("Missing course or content structure");
                    }
                  }}
                >
                  <img
                    src={thumbnail}
                    alt="course_img"
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div className="flex max-w-xs flex-col gap-2">
                    <p className="font-semibold">{courseName}</p>
                    <p className="text-xs text-richblack-300">{courseDescription}</p>
                  </div>
                </div>
                <div className="w-1/4 px-2 py-3">2h 30min</div>
                <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                  <p>Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
