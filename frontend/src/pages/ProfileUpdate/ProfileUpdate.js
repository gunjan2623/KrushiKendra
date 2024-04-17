import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logout, reset } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function ProfileUpdate() {
  const { user } = useSelector((state) => state.auth);
  const [MobNo, setMobNo] = useState(user.MobNo);
  const [UserName, setUserName] = useState(user.UserName);
  const [Address, setAddress] = useState(user.Address);
  const [upSuc, setUpSuc] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const updatedUserInfo = {
    MobNo: MobNo,
    UserName: UserName,
    Address: Address,
  }



  const HandleUpdate = (e) => {
    e.preventDefault();
    if (MobNo.length !== 10) {
      toast.error("Mobile Number should be 10 Digits long")
      return;
    }
    axios.put(`http://localhost:5000/updateuser`, updatedUserInfo, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
      .then(response => {
        // console.log(response.data);
        toast.success("Updated Successfully");
        setUpSuc(true);
      })
      .catch(error => {
        // console.error(error);
        toast.error(error);
      });
  }

  const handleLogin = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/AuthForm");
  }
  return (
    <div className="passloader">
      <div className="chkpassbox">
        {upSuc ? <form onSubmit={handleLogin}>
          <h1>User Information updated successfully. Login again to see changes! </h1><button className='signinbut' onSubmit={handleLogin}>Login again</button>
        </form> :
          <form onSubmit={HandleUpdate}>
            <label for="MobNo">Mobile Number</label>

            <input
              className="signinp"
              type="number"
              name="MobNo"
              id="MobNo"
              placeholder={user.MobNo}
              onChange={(event) => setMobNo(event.target.value)}
              value={MobNo}

            />
            <label for="username">UserName</label>

            <input
              className="signinp"
              type="text"
              name="username"
              id="username"
              placeholder={user.UserName}
              onChange={(event) => setUserName(event.target.value)}
              value={UserName}
            />
 <label for="Address">Address</label>

<input
  className="signinp"
  type="text"
  name="Address"
  id="Address"
  placeholder={user.Address}
  onChange={(event) => setAddress(event.target.value)}
  value={Address}

/>
            <button className="signinbut" onclick={HandleUpdate}>Update Details</button>
          </form>}
      </div>
    </div>
  )
}

export default ProfileUpdate;
