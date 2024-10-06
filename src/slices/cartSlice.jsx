// import { createSlice } from "@reduxjs/toolkit"
// import { toast } from "react-hot-toast"

// const initialState = {
//   cart: localStorage.getItem("cart")
//     ? JSON.parse(localStorage.getItem("cart"))
//     : [],
//   total: localStorage.getItem("total")
//     ? JSON.parse(localStorage.getItem("total"))
//     : 0,
//   totalItems: localStorage.getItem("totalItems")
//     ? JSON.parse(localStorage.getItem("totalItems"))
//     : 0,
// }

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const course = action.payload
//       const index = state.cart.findIndex((item) => item._id === course._id)

//       if (index >= 0) {
//         // If the course is already in the cart, do not modify the quantity
//         toast.error("Course already in cart")
//         return
//       }
//       // If the course is not in the cart, add it to the cart
//       state.cart.push(course)
//       // Update the total quantity and price
//       state.totalItems++
//       state.total += course.price
//       // Update to localstorage
//       localStorage.setItem("cart", JSON.stringify(state.cart))
//       localStorage.setItem("total", JSON.stringify(state.total))
//       localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
//       // show toast
//       toast.success("Course added to cart")
//     },
//     removeFromCart: (state, action) => {
//       const courseId = action.payload
//       const index = state.cart.findIndex((item) => item._id === courseId)

//       if (index >= 0) {
//         // If the course is found in the cart, remove it
//         state.totalItems--
//         state.total -= state.cart[index].price
//         state.cart.splice(index, 1)
//         // Update to localstorage
//         localStorage.setItem("cart", JSON.stringify(state.cart))
//         localStorage.setItem("total", JSON.stringify(state.total))
//         localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
//         // show toast
//         toast.success("Course removed from cart")
//       }
//     },
//     resetCart: (state) => {
//       state.cart = []
//       state.total = 0
//       state.totalItems = 0
//       // Update to localstorage
//       localStorage.removeItem("cart")
//       localStorage.removeItem("total")
//       localStorage.removeItem("totalItems")
//     },
//   },
// })

// export const { addToCart, removeFromCart, resetCart } = cartSlice.actions

// export default cartSlice.reducer
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        // If the course is already in the cart, do not modify the quantity
        toast.error("Course already in cart");
        return;
      }

      // If the course is not in the cart, add it to the cart
      state.cart.push(course);

      // Update the total quantity
      state.totalItems++;

      // Update the total price only if the course price is greater than 0
      if (course.price > 0) {
        state.total += course.price;
      }

      // Update to localstorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

      // Show toast
      toast.success(`Course added to cart. Total: ${course.price === 0 ? 'Free' : `₹${course.price}`}`);
    },
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);

      if (index >= 0) {
        // If the course is found in the cart, remove it
        const course = state.cart[index];

        // Update the total quantity
        state.totalItems--;

        // Update the total price only if the course price is greater than 0
        if (course.price > 0) {
          state.total -= course.price;
        }

        // Remove the course from the cart
        state.cart.splice(index, 1);

        // Update to localstorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

        // Show toast
        toast.success(`Course removed from cart. Price: ${course.price === 0 ? 'Free' : `₹${course.price}`}`);
      }
    },
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;

      // Update to localstorage
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");

      // Show toast
      toast.success("Cart reset");
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
