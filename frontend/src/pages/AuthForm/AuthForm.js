import React, { useState, useEffect } from "react";
import "./AuthForm.css";
import { BiArrowBack, BiUserCircle } from "react-icons/bi";
import { BsFillPersonFill, BsFillTelephoneFill } from "react-icons/bs";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { FaRegAddressCard } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { register, reset, login } from '../../features/auth/authSlice'
import CarLoader from "../../components/Spinners/CarLoader";
import ChngPassword from "../ChngPassword/ChngPassword";


function AuthForm() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [changeSide, setChangeSide] = useState(false);
  const [content, setContent] = useState(false);
 const [isVendor, setVendor] = useState(false);

  const [UserName, setUserName] = useState("");
  const [Address, setAddress] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfrirmPassword] = useState("");
  const [mobNo, setMobNo] = useState(0);
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState("weak");
  const [agreeToTerms, setAgreeToTerms] = useState(false); // new state variable
  const [forgetPass, setForgetPass] = useState(false); // new state variable


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {

    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Welcome " + user.UserName + "!");
      navigate(-1);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const ChangeSide = () => {
    setIsAnimating(!isAnimating);
    setChangeSide(false);
    setContent(!content);
  };

  const ChangeSideleft = () => {
    setChangeSide(!changeSide);
    setIsAnimating(false);
    setContent(!content);
  };

  const handlePasswordStrength = (event) => {
    const password = event.target.value;
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const mediumRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"
    );
    if (strongRegex.test(password)) {
      setPasswordStrength("strong");
    } else if (mediumRegex.test(password)) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("weak");
    }
  };

  const handleConfirmPassword = (event) => {
    const confirmPassword = event.target.value;
    setValidConfirmPassword(confirmPassword === Password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Password !== confirmPassword) {
      toast.error('Passwords do not match')
    }
    else {
      if (passwordStrength !== "strong") {
        toast.error("Password should be strong");
        return;
      }
      if (!agreeToTerms) {
        toast.error("Please agree to terms and conditions");
        return;
      }
      if (mobNo.length !== 10) {
        toast.error("Mobile number should be 10 digits long");
        return;
      }
      
      const formData = {
        UserName: UserName,
        Email: Email,
        MobNo: mobNo,
        Password: Password,
        Address: Address,
        isVendor: isVendor,
      };
      dispatch(register(formData));


    }
  };
  const handleLogin = (e) => {
    e.preventDefault()

    const userData = {
      Email,
      Password,
      isVendor
    }

    dispatch(login(userData))
  }

  return (
    <>
      {isLoading && <CarLoader />}
      {forgetPass && <>
        <div className="chkback">
          <BiArrowBack size={33} onClick={() => {
            setForgetPass
              (false);
          }} />
        </div>
        <ChngPassword /></>}
      <div className="authauthcont"></div>
      <div className="authcontainer">
        <div
          className={`leftsignin  ${isAnimating ? "animateLeft" : ""} ${changeSide ? "animateRight" : ""
            }`}
        >
          {content ? (
            <>
              <div className="signup">
                <span className="signupcont1">Already User?</span>
                <span className="signupcont2">Login Now!</span>
                <button className="signinbut" onClick={ChangeSideleft}>
                  Sign In!
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="signup">
                <span className="signupcont1">
                  Are you new to our website ?
                </span>
                <span className="signupcont2">
                  Register yourself today to explore more features!
                </span>
                <button className="signinbut" onClick={ChangeSide}>
                  Sign Up!
                </button>
              </div>
            </>
          )}
        </div>
        <div
          className={`rightsignin  ${isAnimating ? "" : "animateRightcont"} ${changeSide ? "" : "animateLeftcont"
            }`}
        >
          {!content ? (
            <div className="signindetails">
              <p className="signinhead">{isVendor?'Vendor ':'Farmer '}Sign In!</p>
              <form onSubmit={handleLogin}>
                <div className="detailcont">
                  <BiUserCircle className="usersignicon" size={24} />
                  <input
                    className="signinp"
                    type="text"
                    name="email"
                    id="email"
                    placeholder={"Email"}
                    onChange={(event) => setEmail(event.target.value)}
                    value={Email}
                    required
                  />
                </div>
                <div className="detailcont">
                  <RiLockPasswordFill className="usersignicon" size={24} />
                  <input
                    className="signinp"
                    type="password"
                    name="signpass"
                    id="signpass"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={Password}
                    required
                  />
                </div>
                <div className="detailcont1">
                  <p onClick={() => { setForgetPass(true) }}>Forget Password?</p>
                 {isVendor? <p onClick={() => { setVendor(false) }}>Are you Farmer?</p>:<p onClick={() => { setVendor(true) }}>Are you vendor?</p>}
                  <button type="submit" className="signinbut">
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="signupmain">
                <h1 className="signinhead upper"> {isVendor ?'Vendor ':'Farmer '}Sign Up</h1>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "flex" }}>
                    <div style={{ "marginBottom": "20px" }}>
                      <div style={{ display: "flex" }}>
                        < div
                          style={{ width: '100%' }}>
                          <div className="detailcont">
                            <BsFillPersonFill className="usersignicon" size={24} />
                            <input
                              className="signinp"
                              placeholder="Full Name"
                              type="text"
                              name="name"
                              id="name"
                              value={UserName}
                              onChange={(event) => setUserName(event.target.value)}
                              required
                            />
                         
                          </div>
                          <div className="detailcont">
                            <MdEmail className="usersignicon" size={24} />
                            <input
                              className="signinp"
                              placeholder="Enter your email"
                              type="email"
                              name="email"
                              id="email"
                              value={Email}
                              onChange={(event) => setEmail(event.target.value)}
                              required
                            />

                          </div>
                          <div className="detailcont">
                            <FaRegAddressCard  className="usersignicon" size={24} />
                            <input
                              className="signinp"
                              placeholder="Address"
                              type="text"
                              name="Address"
                              id="Address"
                              value={Address}
                              onChange={(event) => setAddress(event.target.value)}
                              required
                            />
                         
                          </div>
                          </div>
                        
                      </div>


                      <div className="detailcont">
                        <BsFillTelephoneFill
                          className="usersignicon"
                          size={24}
                        />
                        <input
                          className="signinp"
                          type="number"
                          name="mobno"
                          id="mobno"
                          value={mobNo ? mobNo : ''}
                          placeholder={"Mobile Number"}
                          required
                          onChange={(event) => setMobNo(event.target.value)}
                        />
                      </div>
                      <div className="detailcont">
                        <RiLockPasswordFill
                          className="usersignicon"
                          size={24}
                        />
                        <input
                          className="signinp"
                          placeholder="Enter your password"
                          type="password"
                          // type={showPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          value={Password}
                          onChange={(event) => {
                            setPassword(event.target.value);
                            handlePasswordStrength(event);
                          }}
                          //   handleFormChange(event);
                          //   handlePasswordStrength(event);
                          // }}
                          required
                        />


                      </div>
                      {passwordStrength === "weak" && (
                        <p className="password-strength weak">
                          Password Strength: Weak
                        </p>
                      )}
                      {passwordStrength === "medium" && (
                        <p className="password-strength medium">
                          Password Strength: Medium
                        </p>
                      )}
                      {passwordStrength === "strong" && (
                        <p className="password-strength strong">
                          Password Strength: Strong
                        </p>
                      )}
                      <ul>
                        <li>Must Contain Uppercase letter</li>
                        <li>Must Contain Lowercase letter</li>
                        <li>Must Contain Special character</li>
                        <li>Must Contain Number</li>
                        <li>Must Contain at least 8 characters </li>
                      </ul>

                      <div className="detailcont">
                        <RiLockPasswordLine
                          className="usersignicon"
                          size={24}
                        />
                        <input
                          className="signinp"
                          placeholder="Confirm your password"
                          type="password"
                          // type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          id="confirm-password"
                          value={confirmPassword}
                          onChange={(event) => {
                            setConfrirmPassword(event.target.value);
                            handleConfirmPassword(event);
                          }}
                          required
                        />
                        {!validConfirmPassword && (
                          <p className="password-strength weak">Passwords do not match</p>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        id="agree-to-terms"
                        checked={agreeToTerms}
                        onChange={() => setAgreeToTerms(!agreeToTerms)} // toggle the checkbox state
                        required
                      />
                      <label htmlFor="agree-to-terms">
                        I agree to your terms and conditions
                      </label>
                      {!isVendor &&
                  <p onClick={() => { setVendor(true) }}>Are you vendor?</p>
                  }
                  {isVendor &&
                  <p onClick={() => { setVendor(false) }}>Are you Farmer?</p>}
                      <button
                        type="submit"
                        className="signinbut"

                      >
                        Sign Up
                      </button>
                    </div>
                  </div>

                </form>
              </div>

            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AuthForm;
