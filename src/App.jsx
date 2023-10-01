import { useState, useRef } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, value) => {
    // Update the OTP value
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input
    if (index < refs.length - 1 && value !== "") {
      refs[index + 1].current.focus();
    }
  };

  const handleBackspace = (index) => {
    // If backspace is pressed on an empty input, move focus to the previous input
    if (index > 0 && otp[index] === "") {
      refs[index - 1].current.focus();
    }

    // Update the OTP value
    const newOtp = [...otp];
    newOtp[index] = "";
    setOtp(newOtp);
  };

  const handleVerify = () => {
    const otpWithoutCommas = otp.join("");
    if (otp.length === 4) {
      toast.success(`Your OTP code is ${otpWithoutCommas}`);
      let newOtp = [...otp];
      newOtp = ["", "", "", ""];
      setOtp(newOtp);
    }
  };

  return (
    <>
      <Toaster></Toaster>
      <section class="bg-gray-900 text-white">
        <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div class="mx-auto max-w-3xl text-center">
            <h1 class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              React OTP
            </h1>

            <div className="mt-4 flex justify-center space-x-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  maxLength="1"
                  className="w-16 rounded-md border border-gray-500  p-4 text-center text-black focus:border-blue-300 focus:outline-none focus:ring"
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace") {
                      e.preventDefault();
                      handleBackspace(index);
                    }
                  }}
                  ref={refs[index]}
                />
              ))}
            </div>

            <div class="mt-8 flex flex-wrap justify-center gap-4">
              <button
                class="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                onClick={handleVerify}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
