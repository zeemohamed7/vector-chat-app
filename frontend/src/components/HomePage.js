import React, {useState, useEffect} from "react";
import vectorLogo from "../images/vector-logo.png";
// Log in and sign up here
export default function HomePage() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleSwitch = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div class="container-xl">
      <div class="homepage-form wrapper">
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
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
            />
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
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
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
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
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
          <button class="btn blob-btn">
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
