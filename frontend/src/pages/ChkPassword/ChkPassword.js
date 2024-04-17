import React, { useState } from 'react'
import "./ChkPassword.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CarLoader from '../../components/Spinners/CarLoader';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProfileUpdate from '../ProfileUpdate/ProfileUpdate';
import ChngPassword from '../ChngPassword/ChngPassword';


function ChkPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useSelector((state) => state.auth);
    const [password, setPass] = useState("");
    const [message, setMessage] = useState('');
    const [updateDet, setUpdateDet] = useState(false);
    const [forgetPass, setForgetPass] = useState(false);

    const HandlePass = (e) => {
        setIsLoading(true);
        e.preventDefault();
        axios.post('http://localhost:5000/userpass', { password: password }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(response => {
                // console.log(response.data);
                setMessage(response.data.message);
                if (response.data.message === 'Password matches') {
                    setUpdateDet(true);
                    // console.log(updateDet);
                }
                // navigate("/userupdate");
                setIsLoading(false);


            })
            .catch(error => {
                toast.error(error);

                setIsLoading(false);
            });
    }
    if (forgetPass) {
        return <ChngPassword />
    }
    if (updateDet) {
        return <ProfileUpdate />
    }

    return (
        <>
            {isLoading ? <CarLoader /> :
                <div className='passloader'>
                    <div className="chkpassbox">
                        <form onSubmit={HandlePass}>
                            <h1>Enter your password to continue</h1>
                            <input
                                className="signinp"
                                type="password"
                                name="pass"
                                id="pass"
                                placeholder={"Password"}
                                onChange={(event) => setPass(event.target.value)}
                                value={password}
                                required
                            />
                            <p onClick={() => setForgetPass(true)}>Forget Password?</p>
                            <button className="signinbut" onSubmit={HandlePass}>Check</button></form>
                        <span>{message}</span>
                    </div>
                </div>
            }
        </>
    )
}

export default ChkPassword
