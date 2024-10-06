import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authapi"

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
} = profileEndpoints

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    console.log(
      "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
      response
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}



export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    // Call the API to get instructor data
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });

    // Log the API response for debugging
    console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response);

    // Check if the response is successful and has the data
    if (response?.data?.success) {
      // Access the instructor and courses from the response's data object
      result = {
        instructor: response.data.data.instructor,
        courses: response.data.data.courses,
      };
    } else {
      toast.error("Failed to fetch instructor data");
    }
  } catch (error) {
    console.error("GET_INSTRUCTOR_DATA_API API ERROR............", error);
    toast.error("Could Not Get Instructor Data");
  } finally {
    // Dismiss the loading toast once the process is complete
    toast.dismiss(toastId);
  }

  // Return the result, either with data or null in case of failure
  return result;
}
