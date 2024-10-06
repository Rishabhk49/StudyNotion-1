const Profile = require("../models/Profile");
const User = require("../models/User");
const CourseProgress = require('../models/CourseProgress'); 

const { uploadImageToCloudinary } = require("../utils/imageUploader");
// Method for updating a profile
exports.updateProfile = async (req, res) => {
	try {
	  const {
		firstName = "",
		lastName = "",
		dateOfBirth = "",
		about = "",
		contactNumber = "",
		gender = "",
	  } = req.body
	  const id = req.user.id
  
	  // Find the profile by id
	  const userDetails = await User.findById(id)
	  const profile = await Profile.findById(userDetails.additionalDetails)
  
	  const user = await User.findByIdAndUpdate(id, {
		firstName,
		lastName,
	  })
	  await user.save()
  
	  // Update the profile fields
	  profile.dateOfBirth = dateOfBirth
	  profile.about = about
	  profile.contactNumber = contactNumber
	  profile.gender = gender
  
	  // Save the updated profile
	  await profile.save()
  
	  // Find the updated user details
	  const updatedUserDetails = await User.findById(id)
		.populate("additionalDetails")
		.exec()
  
	  return res.json({
		success: true,
		message: "Profile updated successfully",
		updatedUserDetails,
	  })
	} catch (error) {
	  console.log(error)
	  return res.status(500).json({
		success: false,
		error: error.message,
	  })
	}
  }
  

exports.deleteAccount = async (req, res) => {
	try {
		// TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);
		console.log("Printing ID: ", req.user.id);
		const id = req.user.id;
		
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({ _id: user.additionalDetails });
		// TODO: Unenroll User From All the Enrolled Courses
		// Now Delete User
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	}
};

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
// exports.getEnrolledCourses = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const userDetails = await User.findOne({ _id: userId })
//       .populate({
//         path: "courses",  // Populate courses the user is enrolled in
//         populate: {
//           path: "courseContent", // Populate courseContent (Sections)
//           populate: {
//             path: "subSection",  // Populate sub-sections within the sections
			
//           },
//         },
//       })
//       .exec();
	  

//     if (!userDetails) {
//       return res.status(400).json({
//         success: false,
//         message: `Could not find user with id: ${userDetails}`,
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: userDetails.courses,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find user and populate courses
    const userDetails = await User.findOne({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent", // Populate course sections
          populate: {
            path: "subSection", // Populate sub-sections within the sections
          },
        },
      })
      .exec();

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userId}`,
      });
    }

    // Calculate course progress for each enrolled course
    const courses = await Promise.all(userDetails.courses.map(async (course) => {
      const courseProgress = await CourseProgress.findOne({
        courseID: course._id,
        userId: userId,
      });

      let completedLectures = 0;
      let totalLectures = 0;

      course.courseContent?.forEach((section) => {
        totalLectures += section.subSection.length || 0;
      });

      if (courseProgress) {
        completedLectures = courseProgress.completedVideos.length;
      }

      // Calculate progress percentage
      let progressPercentage = totalLectures > 0 ? (completedLectures / totalLectures) * 100 : 0;
      progressPercentage = Math.round(progressPercentage * 100) / 100; // Round to two decimal places

      return {
        ...course.toObject(), // Convert Mongoose object to plain JS object
        progressPercentage, // Add progress percentage to each course
      };
    }));

    return res.status(200).json({
      success: true,
      data: courses, // Return courses with progress
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.instructorDashboard = async (req, res) => {
	try {
	  // Ensure the user is authenticated and has an ID
	  if (!req.user || !req.user.id) {
		return res.status(401).json({
		  success: false,
		  message: "Unauthorized: Instructor ID not found",
		});
	  }
  
	  const instructorId = req.user.id;
  
	  // Find the instructor with additional details and courses
	  const instructor = await User.findById(instructorId)
		.populate('additionalDetails') // Populate Profile details
		.populate('courses') // Populate associated courses
		.exec();
  
	  // If no instructor found, return an error
	  if (!instructor) {
		return res.status(404).json({
		  success: false,
		  message: "Instructor not found",
		});
	  }
  
	  // Extract the courses and calculate total students and revenue
	  const courseDetails = instructor.courses.map((course) => {
		const totalStudents = course?.studentsEnrolled?.length || 0;
		const totalRevenue = (course?.price || 0) * totalStudents;
  
		return {
		  _id: course._id,
		  courseName: course.courseName,
		  courseDescription: course.courseDescription,
		  totalStudents,
		  totalRevenue,
		  createdAt: course.createdAt,
		};
	  });
  
	  // Return the instructor's dashboard data
	  return res.status(200).json({
		success: true,
		message: "Instructor dashboard data fetched successfully",
		data: {
		  instructor: {
			id: instructor._id,
			firstName: instructor.firstName,
			lastName: instructor.lastName,
			email: instructor.email,
			profile: instructor.additionalDetails, // Include profile details here
		  },
		  courses: courseDetails,
		},
	  });
	} catch (error) {
	  console.error("Error fetching instructor dashboard:", error);
	  return res.status(500).json({
		success: false,
		message: "Failed to retrieve instructor dashboard data",
		error: error.message,
	  });
	}
  };
  