const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");



//capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
    const { course_id } = req.body;
    const userId = req.user.id;

    // Validate course ID
    if (!course_id) {
        return res.json({
            success: false,
            message: 'Please provide a valid course ID',
        });
    }

    try {
        // Fetch course details
        const course = await Course.findById(course_id);
        if (!course) {
            return res.json({
                success: false,
                message: 'Could not find the course',
            });
        }

        // Check if the user is already enrolled
        const uid = new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
            return res.status(200).json({
                success: false,
                message: 'Student is already enrolled',
            });
        }

        // If the course price is 0, skip the payment and enroll the student directly
        if (course.price === 0) {
            // Enroll the student in the course
            course.studentsEnrolled.push(uid);
            await course.save();

            // Add the course to the user's enrolled courses
            const user = await User.findById(userId);
            user.courses.push(course_id);
            await user.save();

            // Send enrollment confirmation email
            await mailSender(
                user.email,
                "Congratulations from StudyNotion",
                courseEnrollmentEmail(user.firstName, course.courseName)
            );

            return res.status(200).json({
                success: true,
                message: 'Enrolled in free course successfully',
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
            });
        }

        // If course is paid, proceed with payment creation using Razorpay
        const amount = course.price;
        const currency = "INR";
        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId: course_id,
                userId,
            },
        };

        const paymentResponse = await instance.orders.create(options);
        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.enrollInFreeCourses = async (req, res) => {
    const { course_id } = req.body;
    const userId = req.user.id;

    // Validate course ID
    if (!course_id) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid course ID",
        });
    }

    try {
        // Find the course
        const course = await Course.findById(course_id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // Check if the user is already enrolled
        if (course.studentsEnrolled.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: "You are already enrolled in this course",
            });
        }

        // Enroll the user in the course
        course.studentsEnrolled.push(userId);
        await course.save();

        // Add course to user's list of enrolled courses
        const user = await User.findById(userId);
        user.courses.push(course_id);
        await user.save();

        // Send a confirmation email
        await mailSender(
            user.email,
            "Course Enrollment Successful",
            courseEnrollmentEmail(user.firstName, course.courseName)
        );

        return res.status(200).json({
            success: true,
            message: "Successfully enrolled in the free course",
        });
    } catch (error) {
        console.error("Error enrolling in free course:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
// exports.capturePayment = async (req, res) => {
//     //get courseId and UserID
//     const {course_id} = req.body;
//     const userId = req.user.id;
//     //validation
//     //valid courseID
//     if(!course_id) {
//         return res.json({
//             success:false,
//             message:'Please provide valid course ID',
//         })
//     };
//     //valid courseDetail
//     let course;
//     try{
//         course = await Course.findById(course_id);
//         if(!course) {
//             return res.json({
//                 success:false,
//                 message:'Could not find the course',
//             });
//         }

//         //user already pay for the same course
//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)) {
//             return res.status(200).json({
//                 success:false,
//                 message:'Student is already enrolled',
//             });
//         }
//     }
//     catch(error) {
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         });
//     }
    
//     //order create
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount: amount * 100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes:{
//             courseId: course_id,
//             userId,
//         }
//     };

//     try{
//         //initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);
//         //return response
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         });
//     }
//     catch(error) {
//         console.log(error);
//         res.json({
//             success:false,
//             message:"Could not initiate order",
//         });
//     }
    

// };

//verify Signature of Razorpay and Server

exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678";

    const signature = req.headers["x-razorpay-signature"];

    const shasum =  crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest) {
        console.log("Payment is Authorised");

        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try{
                //fulfil the action

                //find the course and enroll the student in it
                const enrolledCourse = await Course.findOneAndUpdate(
                                                {_id: courseId},
                                                {$push:{studentsEnrolled: userId}},
                                                {new:true},
                );

                if(!enrolledCourse) {
                    return res.status(500).json({
                        success:false,
                        message:'Course not Found',
                    });
                }

                console.log(enrolledCourse);

                //find the student andadd the course to their list enrolled courses me 
                const enrolledStudent = await User.findOneAndUpdate(
                                                {_id:userId},
                                                {$push:{courses:courseId}},
                                                {new:true},
                );

                console.log(enrolledStudent);

                //mail send krdo confirmation wala 
                const emailResponse = await mailSender(
                                        enrolledStudent.email,
                                        "Congratulations from CodeHelp",
                                        "Congratulations, you are onboarded into new CodeHelp Course",
                );

                console.log(emailResponse);
                return res.status(200).json({
                    success:true,
                    message:"Signature Verified and COurse Added",
                });


        }       
        catch(error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    }
    else {
        return res.status(400).json({
            success:false,
            message:'Invalid request',
        });
    }


};