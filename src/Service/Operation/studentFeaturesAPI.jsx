import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector"
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";


const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API,ENROLL_FREECOURSES_API} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


// export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
//     const toastId = toast.loading("Loading...");
//     try{
//         //load the script
//         const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

//         if(!res) {
//             toast.error("RazorPay SDK failed to load");
//             return;
//         }

//         //initiate the order
//         const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
//                                 {courses},
//                                 {
//                                     Authorization: `Bearer ${token}`,
//                                 })

//         if(!orderResponse.data.success) {
//             throw new Error(orderResponse.data.message);
//         }
//         console.log("PRINTING orderResponse", orderResponse);
//         //options
//         const options = {
//             key: process.env.RAZORPAY_KEY,
//             currency: orderResponse.data.message.currency,
//             amount: `${orderResponse.data.message.amount}`,
//             order_id:orderResponse.data.message.id,
//             name:"StudyNotion",
//             description: "Thank You for Purchasing the Course",
//             image:rzpLogo,
//             prefill: {
//                 name:`${userDetails.firstName}`,
//                 email:userDetails.email
//             },
//             handler: function(response) {
//                 //send successful wala mail
//                 sendPaymentSuccessEmail(response, orderResponse.data.message.amount,token );
//                 //verifyPayment
//                 verifyPayment({...response, courses}, token, navigate, dispatch);
//             }
//         }
//         //miss hogya tha 
//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//         paymentObject.on("payment.failed", function(response) {
//             toast.error("oops, payment failed");
//             console.log(response.error);
//         })

//     }
//     catch(error) {
//         console.log("PAYMENT API ERROR.....", error);
//         toast.error("Could not make Payment");
//     }
//     toast.dismiss(toastId);
// // }
// export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
//     const toastId = toast.loading("Loading...");
//     try {
//         // Initiate the order creation API
//         const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
//             { courses },
//             {
//                 Authorization: `Bearer ${token}`,
//             }
//         );

//         if (!orderResponse.data.success) {
//             throw new Error(orderResponse.data.message);
//         }

//         // Check if the course is free
//         if (orderResponse.data.message.amount === 0) {
//             // Skip payment and enroll the student directly
//             toast.success("Enrolled in free course successfully!");
//             navigate("/dashboard/enrolled-courses");
//             dispatch(resetCart());
//             return;
//         }

//         // If course is paid, proceed with Razorpay payment
//         const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

//         if (!res) {
//             toast.error("RazorPay SDK failed to load");
//             return;
//         }

//         const options = {
//             key: process.env.RAZORPAY_KEY,
//             currency: orderResponse.data.message.currency,
//             amount: `${orderResponse.data.message.amount}`,
//             order_id: orderResponse.data.message.id,
//             name: "StudyNotion",
//             description: "Thank You for Purchasing the Course",
//             image: rzpLogo,
//             prefill: {
//                 name: `${userDetails.firstName}`,
//                 email: userDetails.email,
//             },
//             handler: function (response) {
//                 sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);
//                 verifyPayment({ ...response, courses }, token, navigate, dispatch);
//             },
//         };

//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//         paymentObject.on("payment.failed", function (response) {
//             toast.error("Oops, payment failed");
//             console.log(response.error);
//         });

//     } catch (error) {
//         console.log("PAYMENT API ERROR.....", error);
//         toast.error("Could not make Payment");
//     }
//     toast.dismiss(toastId);
// }

// async function sendPaymentSuccessEmail(response, amount, token) {
//     try{
//         await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
//             orderId: response.razorpay_order_id,
//             paymentId: response.razorpay_payment_id,
//             amount,
//         },{
//             Authorization: `Bearer ${token}`
//         })
//     }
//     catch(error) {
//         console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
//     }
// }


export async function buyCourse(token, courses, userDetails, navigate, dispatch, total) {
    const toastId = toast.loading("Loading...");

    console.log("Courses to buy:", courses);
    console.log("User details:", userDetails);
    console.log("Token:", token);

    // Convert courses to the expected format if needed
    if (courses && typeof courses[0] === 'string') {
        courses = courses.map(courseId => ({ _id: courseId }));
    }

    // Validate courses array
    if (!courses || courses.length === 0 || !courses[0]._id) {
        toast.error("Invalid course data. Please select a course.");
        console.error("Courses array is invalid or empty.");
        toast.dismiss(toastId);
        return;
    }

    try {
        if (total === 0) {
            try {
                console.log("API Endpoint:", ENROLL_FREECOURSES_API);
                console.log("Token:", token);
                console.log("Course ID:", courses[0]._id); // Log course ID

                const response = await apiConnector(
                    "POST", 
                    ENROLL_FREECOURSES_API,
                    { course_id: courses[0]._id },  // Pass the course ID correctly
                    { Authorization: `Bearer ${token}` }
                );

                if (!response.data.success) {
                    throw new Error(response.data.message);
                }

                // Update UI and notify the user
                dispatch(resetCart());
                toast.success("Enrolled in free course successfully!");
                navigate("/dashboard/enrolled-courses");

                await sendPaymentSuccessEmail(
                    { razorpay_order_id: "FREE_COURSE" }, 
                    0, 
                    token
                );

                return;
            } catch (error) {
                console.error("Error enrolling in free course:", error);
                toast.error("Could not enroll in free course");
                return;
            }
        }

        // If the course is paid, initiate the payment process with Razorpay
        // const orderResponse = await apiConnector(
        //     "POST",
        //     COURSE_PAYMENT_API,
        //     { courses: courses.map(course => course._id) },  // Map course IDs
        //     { Authorization: `Bearer ${token}` }
        // );

        // if (!orderResponse.data.success) {
        //     throw new Error(orderResponse.data.message);
        // }

        // const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        // if (!res) {
        //     toast.error("RazorPay SDK failed to load");
        //     return;
        // }

        // const options = {
        //     key: process.env.RAZORPAY_KEY,
        //     currency: orderResponse.data.message.currency,
        //     amount: `${orderResponse.data.message.amount}`,
        //     order_id: orderResponse.data.message.id,
        //     name: "StudyNotion",
        //     description: "Thank You for Purchasing the Course",
        //     image: rzpLogo,
        //     prefill: {
        //         name: `${userDetails.firstName}`,
        //         email: userDetails.email,
        //     },
        //     handler: function (response) {
        //         sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);
        //         verifyPayment({ ...response, courses }, token, navigate, dispatch);
        //     },
        // };

        // const paymentObject = new window.Razorpay(options);
        // paymentObject.open();
        // paymentObject.on("payment.failed", function (response) {
        //     toast.error("Oops, payment failed");
        //     console.log(response.error);
        // });

    } catch (error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}

// Helper function to enroll in free courses
// async function enrollInFreeCourses(token, courses, userDetails, dispatch) {
//     try {
//         const response = await apiConnector("POST", COURSE_ENROLLMENT_API, 
//             { courses },
//             {
//                 Authorization: `Bearer ${token}`,
//             }
//         );

//         if (!response.data.success) {
//             throw new Error("Failed to enroll in free course");
//         }

//         // You can dispatch other actions here if necessary, like updating enrolled courses
//     } catch (error) {
//         console.error("Error enrolling in free course:", error);
//         toast.error("Could not enroll in free course");
//     }
// }

// Function to send the payment success email (even for free courses)
async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id || "N/A",
            amount,
        },{
            Authorization: `Bearer ${token}`,
        });
    } catch (error) {
        console.log("Error sending payment success email:", error);
    }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response  = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}