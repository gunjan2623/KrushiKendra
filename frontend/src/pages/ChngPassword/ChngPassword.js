import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function ChngPassword() {
  const [send, setSend] = useState(false);
  const [Otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confNewPass, setConfNewPass] = useState("");
  const [Email, setEmail] = useState("");
  const { user } = useSelector((state) => state.auth);


  const handleOtpChk = async (e) => {
    e.preventDefault();
    if (newPass !== confNewPass) {
      toast.error("Passwords do not match");
      return;
    }
   
    try {
      const res = await axios.post('http://localhost:5000/respass', { email: Email, otpCode: Otp,isVendor: user.isVender, newPassword: newPass });
      if (res.data.statusText === 'Success') {
        toast.success("Password Changed!")
      }
      else if (res.data.statusText === "OtpError") {
        toast.error("Invalid OTP Code!");
      } else {
        toast.error("Error Occured!");
      }
    } catch (error) {
      toast.error(error);
    }

  }


  const handlechngPass = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/email-send', { Email ,isVendor: user.isVender});
      toast.success("Please check your Email Id!")
      setSend(true);
    }
    catch (error) {
      toast.error(error);
    };
  }

  return (
    <div>
      <div className="passloader">
        <div className="chkpassbox">
          {send ? <form onSubmit={handleOtpChk}>

            <h1>Enter OTP</h1>
            <input
              className="signinp"
              type="password"
              name="otp"
              id="otp"
              placeholder={"Enter OTP"}
              onChange={(event) => {
                const inputValue = event.target.value;
                const trimmedValue = inputValue.slice(0, 4);
                setOtp(trimmedValue);
              }}
              value={Otp}
              required
            />
            <p>OTP valid for 5 minutes!</p>
            <input
              className="signinp"
              type="password"
              name="Password"
              id="Password"
              placeholder={"Enter New Password"}
              onChange={(event) => setNewPass(event.target.value)}
              value={newPass}
              required
            />


            <input
              className="signinp"
              type="password"
              name="ConfPassword"
              id="ConfPassword"
              placeholder={"Confirm Password"}
              onChange={(event) => setConfNewPass(event.target.value)}
              value={confNewPass}
              required
            />
            <button className="signinbut" onSubmit={handleOtpChk}>Reset Password</button></form> :
            <form onSubmit={handlechngPass}>
              <h1> Reset Password</h1>
              <input
                className="signinp"
                type="email"
                name="email"
                id="email"
                placeholder={"Enter Email"}
                onChange={(event) => setEmail(event.target.value)}
                value={Email}
                required
              />
              <p>Otp will be send to your EmailId .</p>
              <p>Click on continue to proceed...</p>
              <button className="signinbut" onSubmit={handlechngPass}>Continue..</button>
            </form>}
        </div>
      </div>
    </div>
  );
}

export default ChngPassword;
