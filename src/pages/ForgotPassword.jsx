import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { getPasswordResetToken } from '../Service/Operation/authapi';

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    };

    return (
        <div className='text-white h-screen flex items-center justify-center bg-gray-900 px-4'>
            {loading ? (
                <div>Loading....</div>
            ) : (
                <div className='bg-gray-800 p-8 rounded-lg max-w-md w-full'>
                    <h1 className='text-2xl font-semibold mb-4'>
                        {!emailSent ? "Reset Your Password" : "Check your Email"}
                    </h1>
                    <p className=' mb-6'>
                        {!emailSent ? (
                            <>
                                Have no fear. We'll email you instructions to reset
                                <br />
                                your password. If you don't have access to your email,
                                <br />
                                we can try account recovery.
                            </>
                        ) : (
                            `We have sent the reset email to ${email}`
                        )}
                    </p>
                    <form onSubmit={handleOnSubmit} className='mb-6'>
                        {!emailSent && (
                            <label className='block mb-4'>
                                <p className='mb-2'>Email Address<sup className="text-pink-200">*</sup></p>
                                <input
                                    required
                                    type='email'
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter Your Email Address'
                                    className='w-full p-2 rounded bg-gray-700 border border-gray-600 text-black'
                                />
                            </label>
                        )}
                        <button
                            type='submit'
                            className='w-full bg-yellow-50 text-gray-900 font-semibold p-2 rounded flex items-center justify-center hover:bg-yellow-600 transition duration-200'
                        >
                            {!emailSent ? "Reset Password" : "Resend Email"}
                        </button>
                    </form>
                    <div className='text-center'>
                        <Link to="/login">
                        <p className='flex items-center gap-x-2 text-richblack-5'>
                        <BiArrowBack />
                            Back to Login
                            </p>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
