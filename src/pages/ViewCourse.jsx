import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import ReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import { getFullDetailsOfCourse } from '../Service/Operation/courseDetailsAPI';

const ViewCourse = () => {
    const [reviewModal, setReviewModal] = useState(false);
    const { courseId } = useParams();
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const setCourseSpecifics = async () => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));
            let lecture = 0;
            courseData?.courseDetails?.courseContent?.forEach((section) => {
                lecture += section?.subSection?.length;
            });
            dispatch(setTotalNoOfLectures(lecture));
        };
        setCourseSpecifics();
    }, [courseId, token, dispatch]);

    return (
        <div className="flex w-screen h-screen bg-cover bg-center"> {/* Set full height and background */ }
            <div className="flex w-full h-full">
                {/* Sidebar (1/4 width of the screen) */}
                <div className="w-1/4 h-full ml-4"> 
                    <VideoDetailsSidebar setReviewModal={setReviewModal} className="mt-7" />
                </div>


                {/* Main content (3/4 width of the screen) */}
                <div className="w-3/4 h-full mt-8">
                    <Outlet />
                </div>
            </div>
            
            {reviewModal && <ReviewModal setReviewModal={setReviewModal} />}
        </div>
    );
};

export default ViewCourse;
