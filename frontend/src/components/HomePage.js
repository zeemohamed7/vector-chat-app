import React, { useState, useEffect } from "react";
import vectorLogo from "../images/vector-logo.png";
import { Toast } from 'bootstrap';

// Log in and sign up here
export default function HomePage() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')



  const closedEye = "https://img.icons8.com/ios/50/closed-eye.png";
  const openEye = "https://img.icons8.com/ios/50/visible--v1.png";

  const handleSwitch = () => {
    setIsLoginForm(!isLoginForm);
  };

// Select the toast container element
const toastContainer = document.getElementById('toastContainer');

// Function to create and show a toast
function showToast(message, type) {
  // Create the toast element
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.classList.add(`bg-${type}`);
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');

  // Create the toast body
  const toastBody = document.createElement('div');
  toastBody.classList.add('toast-body');
  toastBody.textContent = message;

  // Append the body to the toast
  toast.appendChild(toastBody);

  // Append the toast to the container
  toastContainer.appendChild(toast);

  // Initialize the Bootstrap toast
  const bootstrapToast = new Toast(toast)

  // Show the toast
  bootstrapToast.show();

  // Remove the toast after it is hidden
  toast.addEventListener('hidden.bs.toast', function () {
    toast.remove();
  });
}


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const postDetails = (pics) => {
    setLoading(true)
    if (pics === undefined) {
      showToast('Oops! Something went wrong.', 'danger');

        return
    }
    
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      // Adding to cloudinary
      const formData = new FormData();
      formData.append('file', pics);
      formData.append('upload_preset', 'vector-chat-app');
      formData.append('cloud_name', 'zeem');
    
      // Make a request to the Cloudinary upload API
      fetch('https://api.cloudinary.com/v1_1/zeem/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setPicture(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
          showToast('Image uploaded successfully!', 'success');
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
      
  } else {
    console.log('not an image bro')
    setLoading(false)
    showToast('Oops! Something went wrong.', 'danger');
    return
  }}

  const submitHandler = () => {}

  useEffect(() => {
  }, []);


  return (
    <div class="container-xl">
      <div class="homepage-form wrapper">


      {/* TOASTTTT */}

      <div id="toastContainer" class="toast-container position-fixed bottom-0 end-0 p-3"></div>

        {/* Login form */}
        <form
          id="login-side"
          style={{
            transform: isLoginForm ? "translateX(0)" : "translateX(-100vw)",
          }}
        >
          <h2 class="signup-title">Login</h2>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
              // required="true"
            />
          </div>
          <div class="mb-3 password-input-container">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <div class="password-eye input-wrapper">
            <input
              type={isPasswordVisible ? "password" : "text"}
              class="form-control password-input"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
       <button className="eye-btn" onClick={togglePasswordVisibility}>
        <img
          width="25"
          src={isPasswordVisible ? openEye : closedEye}
          alt={isPasswordVisible ? 'Open Eye' : 'Closed Eye'}
        />
      </button>
          </div>
          </div>

          <button class="btn blob-btn">
            Login
            <span class="blob-btn__inner">
              <span class="blob-btn__blobs">
                <span class="blob-btn__blob"></span>
                <span class="blob-btn__blob"></span>
                <span class="blob-btn__blob"></span>
                <span class="blob-btn__blob"></span>
              </span>
            </span>
          </button>
          <br />

          

          <svg class="svg-btn" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  result="blur"
                  stdDeviation="10"
                ></feGaussianBlur>
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                  result="goo"
                ></feColorMatrix>
                <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
              </filter>
            </defs>
          </svg>
          <button class="google-signin-button">
            <img
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              class="icon"
            />
            Sign in with Google
          </button>
          <p className="switch-animation">
            Don't have an account?{" "}
            <a href="#" className="signin-redirect" onClick={handleSwitch}>
              {" "}
              Sign Up
            </a>
          </p>
        </form>












        {/* Sign up form */}
        <form
          id="signup-side"
          style={{
            transform: isLoginForm ? "translateX(-100vw)" : "translateX(0)",
          }}
        >
          <h2 class="signup-title">Sign Up</h2>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setName(e.target.value)}

            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3 password-input-container">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <div class="password-eye input-wrapper">
            <input
              type={isPasswordVisible ? "password" : "text"}
              class="form-control password-input"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
       <button className="eye-btn" onClick={togglePasswordVisibility}>
        <img
          width="25"
          src={isPasswordVisible ? openEye : closedEye}
          alt={isPasswordVisible ? 'Open Eye' : 'Closed Eye'}
        />
      </button>
          </div>
          </div>
          <div class="mb-3 password-input-container">
            <label for="exampleInputPassword1" class="form-label">
              Confirm Password
            </label>
            <div class="password-eye input-wrapper">
            <input
              type={isPasswordVisible ? "password" : "text"}
              class="form-control password-input"
              id="exampleInputPassword1"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />{" "}

          </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Upload profile picture
            </label>
            <input
              type="file"
              class="form-control"
              id="exampleInputPassword1"
              accept="image/"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              I agree to the <u>terms & policy</u>
            </label>
          </div>
          <button class="btn blob-btn" onClick={submitHandler} isLoading = {loading}>
            Sign Up
            <span class="blob-btn__inner">
              <span class="blob-btn__blobs">
                <span class="blob-btn__blob"></span>
                <span class="blob-btn__blob"></span>
                <span class="blob-btn__blob"></span>
                <span class="blob-btn__blob"></span>
              </span>
            </span>
          </button>
          <br />

          <svg class="svg-btn" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  result="blur"
                  stdDeviation="10"
                ></feGaussianBlur>
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                  result="goo"
                ></feColorMatrix>
                <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
              </filter>
            </defs>
          </svg>
          <button class="google-signin-button">
            <img
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              class="icon"
            />
            Sign in with Google
          </button>
          <p className="switch-animation">
            Have an account?{" "}
            <a href="#" className="signin-redirect" onClick={handleSwitch}>
              {" "}
              Sign In
            </a>
          </p>
        </form>
      </div>
      <div class="vector-container">
        <img class="vector-logo" src={vectorLogo} />
      </div>
    </div>
  );
}
