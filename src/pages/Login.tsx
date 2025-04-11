import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { getuser, useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { messageResponse } from "../types/api-types";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "../redux/reducer/userReducer";

const Login = () => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      
      const response = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: "admin",
        dob: date,
        _id: user.uid,
      });

      if ("data" in response) {
        toast.success((response.data as messageResponse).message);
        const data = await getuser(user.uid);
        dispatch(userExist(data?.user!))
        navigate('/'); // Redirect to root after successful login
      } else {
        const error = response.error as FetchBaseQueryError;
        const message = (error.data as messageResponse).message;
        toast.error(message)
        dispatch(userNotExist())
      }
    } catch (error) {
      toast.error("Failed to sign in");
    }
  };

  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>
        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label>Date of birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <p>Already Signed In ?</p>
          <button onClick={loginHandler}>
            <FcGoogle />
            <span>sing in with google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;

