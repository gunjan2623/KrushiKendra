import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { AiFillCar } from "react-icons/ai";
import { MdAnalytics, MdOutlineLogout } from "react-icons/md";
import { TbPremiumRights } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { logout } from "../../features/auth/authSlice";
import defaultuser from "../../assests/defaultuser.jpg";

const navitems = [
  { label: "Home", link: "/", no: "1", itemwid: "45px" },
  { label: "Buy", link: "/buy", no: "2", itemwid: "27px" },
  // { label: "Sell", link: "/sell", no: "3", itemwid: "25px" },
  // { label: "About", link: "/about",no:"4", itemwid:"44px"},
];

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const currentPathname = window.location.pathname;

  // Split the pathname into an array using '/' as the separator
  const pathParts = currentPathname.split('/');

  // Get the last part (word) from the array
  const lastWord = "/" + pathParts[pathParts.length - 1];
  const [isSticky, setIsSticky] = useState(false);
  const [NavOpen, setNavOpen] = useState("");
  const [NavClose, setNavClose] = useState("menu");
  const [isTransform, setIsTransform] = useState(false);
  const [navclick, setNavclick] = useState("menu");
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [userIconShow, setUserIconShow] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState();
  const [AddClss, setAddclss] = useState(false);

 

  const dispatch = useDispatch();


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos >= 0) {
        setIsTransform(true);
      }

      if (prevScrollPos > currentScrollPos) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    setIsHovered(true);
    // Delay the removal of the initial effect (you can adjust the delay time)
    const timer = setTimeout(() => {
      setIsHovered(false);
    }, 1000); // 1000 milliseconds = 1 second
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const OpenNav = () => {
    NavOpen === "" ? setNavOpen("toggled") : setNavOpen("");
    setNavClose("");
    navclick === "menu" ? setNavclick("slide") : setNavclick("menu");
  };
  // const CloseNav=()=>{
  //   setNavOpen("");
  //    setNavClose("menu");
  //    setNavclick("");
  // }


  const handleUserIcon = () => {
    setUserIconShow(!userIconShow);
  }
  const handleLogout = () => {
    dispatch(logout());
  }
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (

    <div style={{
      backgroundImage: "url('/h1.png')", backgroundAttachment: 'fixed', backgroundPosition: 'center',
      backgroundSize: '100% 100%'
    }}>
      <div
        className={`nav ${isTransform ? "transfer" : ""} ${isSticky ? "sticky" : ""
          }`}
      >
        <div className="lg">
      <h2>AGRO</h2>
          <button className={`hamburger__toggle  ${NavOpen}`} onClick={OpenNav}>
            <span className="hamburger__icon"></span>
          </button>
          {!user ?
            <RouterLink to="/AuthForm">
              <div style={{ margin: "0.5em" }}><BiUserCircle className="navusersignin" size={40} onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} />
              
              </div>
            </RouterLink> : <div className="navuserinfo">
              {userIconShow ? <img className="navusericon" onClick={handleUserIcon} src={defaultuser} alt={user._id} />
                : <><div onClick={handleUserIcon}>
                  <img className="navusericon" src={defaultuser} alt={user._id} />
                  {/* <RxCross1 className="navusercross" size={30}/> */}
                </div>

                  <div className="usermenu">
                    <p><b>{user.UserName}</b></p>
                  <p>  <span>{user.Email}</span></p>
                    <hr />
                    <ul>
                      <li>
                        <RouterLink to="/userprofile">
                          <BiUserCircle className="small-screen" />
                          <p>My profile</p>
                        </RouterLink>
                      </li>
                    
                        
                      <hr />
                     
                     
                      <li> {user.isVendor && 
                                              <RouterLink to="/addprod">
                          <BiUserCircle className="small-screen" />
                          <p>Add Product</p>
                        </RouterLink>}
                      </li>
                      {user.isVendor && <hr/>}
                      <li onClick={handleLogout}><MdOutlineLogout className="small-screen" />Logout</li>

                    </ul></div></>}
            </div>}
        </div>
        <div className={`${navclick} ${NavClose}`}>
          <ul className="navul">
            {navitems.map((item) => (
              <li className="navli" key={item.label}>
                <div className="bb"
                  onMouseEnter={() => {
                    setIsHovered1(item.no);
                    setAddclss(false);
                  }}
                  onMouseLeave={() => setAddclss(true)}
                >
                  <RouterLink className="bb1" style={{ borderBottom: lastWord === item.link ? '3px solid #00005e' : 'none' }} to={item.link}>{item.label}

                  </RouterLink>
                  {(isHovered1 === item.no && lastWord !== item.link) && <span className={`horz ${AddClss ? 'revhorz' : ''}`} style={{ width: item.itemwid }}></span>}

                </div>
              </li>
            ))}
            <li className="navli">
              <div className="bb"
                onMouseEnter={() => {
                  setIsHovered1("5");
                  setAddclss(false);
                }}
                onMouseLeave={() => setAddclss(true)}
              >
           
                {isHovered1 === "5" && <span className={`horz ${AddClss ? 'revhorz' : ''}`} style={{ width: "75px" }}></span>}

              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
