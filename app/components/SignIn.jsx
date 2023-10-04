import React, { useEffect, useState } from "react";
import {
  auth,
  logout,
  signInWithGoogle,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  sendPasswordReset,
} from "../../shared/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie"; // Make sure to install js-cookie
import { FcGoogle } from "react-icons/fc";

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Remember Me checkbox state
  const [user, loading, error] = useAuthState(auth);
  const [isSignUp, setIsSignUp] = useState(false); // Whether the user is signing up or logging in

  useEffect(() => {
    // Check if the user is remembered and automatically log them in
    const rememberedUser = Cookies.get("rememberedUser");
    if (rememberedUser === "true" && !user) {
      // Perform automatic login here
      // You can use the logInWithEmailAndPassword function here
      // Make sure to handle errors appropriately
      const rememberedEmail = Cookies.get("rememberedEmail");
      if (rememberedEmail) {
        setEmail(rememberedEmail);
        handleLogin();
      }
    }
  }, [user]);

  const handleRegister = async () => {
    if (!name) alert("Please enter name");
    try {
      await registerWithEmailAndPassword(name, email, password);
      if (rememberMe) {
        Cookies.set("rememberedUser", "true", { expires: 365 }); // Remember the user for 1 year
        Cookies.set("rememberedEmail", email, { expires: 365 });
      } else {
        Cookies.remove("rememberedUser");
        Cookies.remove("rememberedEmail");
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      await logInWithEmailAndPassword(email, password);
      if (rememberMe) {
        Cookies.set("rememberedUser", "true", { expires: 365 }); // Remember the user for 1 year
        Cookies.set("rememberedEmail", email, { expires: 365 });
      } else {
        Cookies.remove("rememberedUser");
        Cookies.remove("rememberedEmail");
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return user ? (
    <div className="">
      <button
        className="text-green-200 text-lg font-mono bg-red-700 p-2  rounded-lg"
        onClick={logout}
      >
        LogOut
      </button>
    </div>
  ) : (
    <div className="bg-white p-8 rounded-lg shadow-md max-[295px]:w-60 max-[380px]:w-72 w-96">
      <h1 className="text-2xl font-semibold text-center mb-6">
        {isSignUp ? "Sign Up" : "Log In"}
      </h1>
      <form>
        {isSignUp && (
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <span className="ml-2 text-gray-700">Remember me</span>
          </label>
        </div>
        {isSignUp ? (
          <button
            onClick={handleRegister}
            type="button"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md font-bold flex items-center justify-center mt-2"
          >
            Sign Up
          </button>
        ) : (
          <button
            onClick={handleLogin}
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          >
            Log In
          </button>
        )}
        <button
          type="button"
          onClick={signInWithGoogle}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-bold flex items-center justify-center mt-2"
        >
          <span className="text-xl mr-2">
            <FcGoogle />
          </span>
          Log In with Google
        </button>
      </form>
      <div className="text-center mt-4">
        <button
          onClick={() => sendPasswordReset(email)}
          className="text-blue-500 hover:underline"
        >
          Forgot Password?
        </button>
      </div>
      <div className="text-center mt-4">
        <button onClick={toggleForm} className="text-blue-500 hover:underline">
          {isSignUp
            ? "Already have an account? Log In"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
