import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../Service/Operation/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch=useDispatch
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        {/* <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn> */}
        <button 
  onClick={() => navigate("/dashboard/add-course")}
  className="bg-yellow-50 font-bold flex items-center space-x-2 p-2 rounded-lg hover:shadow-lg"
>
  
  <span>Add Course</span>
  <VscAdd />
</button>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}