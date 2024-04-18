import { useState, useEffect, React } from "react";
import { logout, reset } from "../../features/auth/authSlice";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ChkPassword from "../ChkPassword/ChkPassword";
import { BiArrowBack } from "react-icons/bi";
import ChngPassword from "../ChngPassword/ChngPassword";

function Profile() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [chkPass, setChkPass] = useState(false);
  const [chngPass, setChngPass] = useState(false);


  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };



  useEffect(() => {
    if (!user) {
      navigate("/AuthForm");
    }
  }, [user, navigate]);

  return (
    <>
      {chkPass ? <>
        <div className="chkback">
          <BiArrowBack size={33} onClick={() => { setChkPass(false); }} /></div>
        <ChkPassword /></>
        : <></>}
      {chngPass ? <>  <div className="chkback">
        <BiArrowBack size={33} onClick={() => { setChngPass(false); }} /></div>
        <ChngPassword />
      </> : <></>}
      <div className="top-div">
      <h1 className="custom-h1">User Profile</h1>
      {user ?
        <div className="usercont">
          

          <div className="usercont1">

            <div className="usercont11">

            </div>

            <div className="usercont11">

              <div className="userfield">Name of user<div> {user.UserName}</div> </div>
              <div className="userfield">Email Id <div>{user.Email}</div></div>
              <div className="userfield">Mobile Number <div>{user.MobNo}</div></div>
              <div className="userfield">Address <div>{user.Address}</div></div>

            </div>
            <div className="usercont11">
              <button className="rec-button" style={{marginBottom:'10px'}} onClick={() => setChkPass(true)}>Update Profile</button>
              <button  className="rec-button" style={{marginBottom:'10px'}} onClick={onLogout}>Logout</button>
              <button  className="rec-button" style={{marginBottom:'10px'}} onClick={() => setChngPass(true)}>Change Password</button>
            </div>
            <span>Login again to see changes if made!</span>
          </div>
        </div> : <>No User found ! Please login to continue!</>}</div></>
  );
}

export default Profile;
