import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import IconBtn from "../../../common/IconBtn";
import { buyCourse } from "../../../../Service/Operation/studentFeaturesAPI";
import toast from "react-hot-toast";

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = () => {
    if (!cart || cart.length === 0) {
        toast.error("No courses in the cart.");
        return;
    }
    const courses = cart.map((course) => course._id);
    if (!courses || courses.length === 0) {
        toast.error("Invalid course data.");
        return;
    }
    buyCourse(token, courses, user, navigate, dispatch, total);
};

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Cart Items:</p>

      {/* Loop through the cart items and display each course's name and price */}
      {cart.length > 0 ? (
        cart.map((course) => (
          <div key={course._id} className="mb-4 flex justify-between">
            <span className="text-sm text-richblack-200">{course.title}</span>
            <span className="text-sm text-yellow-100">
              ₹ {course.price === 0 ? "Free" : course.price}
            </span>
          </div>
        ))
      ) : (
        <p className="text-sm text-richblack-200">No courses in the cart.</p>
      )}

      {/* Total Price */}
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>

      {/* Buy Now Button */}
      {/* <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      /> */}
      <button
    onClick={handleBuyCourse} // Use camelCase for React event handlers
    className="bg-yellow-50 font-bold flex items-center justify-center w-full space-x-2 py-1 px-2 rounded-lg hover:shadow-lg"
>
    <span>Buy Now</span>
</button>
    </div>
  );
}
