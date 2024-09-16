import React, { useState, useEffect } from "react";
import { FaStar, FaUser, FaHistory, FaWallet} from "react-icons/fa";
import { IoIosArrowBack, IoIosSettings} from "react-icons/io";
import { FaUserGroup, FaVideo } from "react-icons/fa6";  
import { MdNavigateNext } from "react-icons/md";
import { FiAlignLeft } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { HiOutlinePencil } from "react-icons/hi";
import './styles/main-app.css'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';


const tutorImages = {
  "66e3bc60dd28237f7502c452": require("./assets/AdityaPatel.jpg"),
  "66e3bc60dd28237f7502c451": require('./assets/LindaOConnor.jpg'),
  "66e3bc60dd28237f7502c453": require('./assets/MariaVasqez.jpg'),
};


const url = 'https://easy-as-backend.onrender.com';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

const Home = () => {
  const navigate = useNavigate();
  return (
    <div> 
      <div className="logo-user-container">
        <h2>Easy As</h2>
        <Profile className="user-container" location={'/settings'} is_home="true" />
      </div>
      <div className="carousel-container">
        <p className="text-carousel">We think you'll love...</p>
          <Tutors />
      </div>
    </div>
  )
}

const Tutors = () => {
  const [curr, setCurr] = useState(0); 
  const [tutors, setTutors] = useState([]);
  const [showBookingContext, setShowBookingContext] = useState(false);
  const navigate = useNavigate();

  const fetchTutors = async() => {
    const res = await fetch(`${url}/tutors`);
    setTutors(await res.json());
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const handleNext = () => {
    setCurr((prevCurr) => (prevCurr >= tutors.length - 1 ? 0 : prevCurr + 1));
  };

  const handlePrev = () => {
    setCurr((prevCurr) => (prevCurr === 0 ? tutors.length - 1 : prevCurr - 1));
  };
  const createBooking = (current, index) => {
    fetch(`${url}/booking`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(
        {
          tutor: {
            name: current.name.first + " " + current.name.last
          },
          session: {
            date: current.sessions[0].date,
            time: current.sessions[0].times[index].time,
            price: current.sessions[0].times[index].price,
            is_group: current.sessions[0].times[index].is_group,
            is_online: current.sessions[0].times[index].is_online,
          },
          student : {
            name: "Nihal Dharmaraj"
          }
        })
    })
    setShowBookingContext(true);
  }
  return (
    <>
    <div className="carousel">
      <div className="prev button" onClick={handleNext}></div>
        <div
          className="card"
          style={{
            backgroundImage: tutors.length > 0 && tutorImages[tutors[curr]._id]
              ? `url(${tutorImages[tutors[curr]._id]})`
              : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
            <div className="inf-container">
            <p className="name">{tutors.length > 0 ? `${tutors[curr].name.first} ${tutors[curr].name.last}` : "No tutors available"}</p>
            <p className="is_verified">{tutors.length > 0 ? tutors[curr].status : ""}</p>
            <div className="rate_qual">
              <p>
                <FaStar />
                {tutors.length > 0 ? tutors[curr].rating : "0"}
              </p>
              <p>
                {tutors.length > 0 ? tutors[curr].quals[0] : "Unavailable"}
              </p>
            </div>
          </div>
        </div>
      <div className="next button" onClick={handlePrev}></div>
    </div>
    <div className="more-inf-container">
        <div className="bio">
          <p className="subtitle">Learn more</p>
          <div className="bio-card">
            <p className="intro">Hi I'm <span>{tutors.length > 0 ? tutors[curr].name.first : "Name"}</span>,</p>
            <p className="bio-main">
              {tutors.length > 0 ? tutors[curr].bio : "Something went wrong. Please try again later"}
            </p>
          </div>
        </div>
        <div className="sessions">
          <p className="subtitle">Book a slot</p>
          <div className="session-card">
            <div className="date">
              <p className="day">{tutors.length > 0 ? tutors[curr].sessions[0].day : ""}</p>
              <p className="date-exact">{tutors.length > 0 ? tutors[curr].sessions[0].date : ""}</p>
            </div>
            <div className="times">
                {tutors.length > 0 ? tutors[curr].sessions[0].times.map((t, index) => (
                  <div key={index} className="session-container">
                    <div className="when">
                      <p className="time">{t.time >= 12 ? t.time === 12 ? `${t.time}PM` : `${t.time - 12}PM` : `${t.time}AM`}</p>
                      <p className="details">{t.is_group ? (<> <FaUserGroup/ > <span>3/5</span></>): ""} ${t.price}/hr {t.is_online ? <FaVideo /> : ""} {t["face-to-face"] ? <FaUser /> : ""}</p>
                    </div>
                    <button className="book-session" onClick={() => createBooking(tutors[curr], index)}>Book</button>
                  </div>
                )) : ""}
            </div>
          </div>
        </div>
      </div>
      <div className={`booking-context ${showBookingContext ? 'visible': ''}`}>
        <button onClick={() => setShowBookingContext(false)}>X</button>
        <h2>Booking Successful!</h2>
        <button className="view-book book-session" onClick={() => navigate('/bookings')}>View Bookings</button>
      </div>
    </>
  )
}

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [nickname, setNickname] = useState('');
  const [showNickName, setShowNickname] = useState(false);
  const [changedName, setChangedName] = useState(false);
  const [updateID, setId] = useState('');
  const navigate = useNavigate();

  const fetchBookings = async () => {
    const response = await fetch(`${url}/get-bookings`);
    setBookings(await response.json());
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const deleteItem = (id) => {
    fetch(`${url}/bookings/${id}`, {
      method: 'DELETE',
    });
    fetchBookings();
  };

  const fetchUpdateReq = (id) => {
    setId(id);
    setShowNickname(true);
  };

  const update = async () => {
    try {
      const response = await fetch(`${url}/update-book/${updateID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: nickname }),
      });

      if (response.ok) {
        setNickname('');
        setShowNickname(false);
        await fetchBookings();
      } else {
        const errorData = await response.json();
        console.error('Update failed:', errorData);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleCancel = () => {
    setNickname('');
    setChangedName(false); // Reset changedName state on cancel
    setShowNickname(false);
  };

  return (
    <>
      <div className={`bookings-container ${showNickName ? 'scale-out' : ''}`}>
        <div className="home booking-go-back" onClick={() => navigate('/settings')}>
          <IoIosArrowBack className="back" />
          <p>Settings</p>
        </div>
        <h1 className="book-header">Your Bookings</h1>
        <div className="booking-container">
          {bookings.length > 0 ? bookings.map((b) => (
            <div className="booking" key={b._id}>
              <div className="book-text">
                {b.tutor.name.length > 19 ? (
                  <marquee className="book-name" behavior="" direction="">{b.tutor.name}</marquee>
                ): (
                  <p className="book-name">{b.tutor.name}</p>
                )}
                <div className="book-when">
                  <p className="book-time">
                    {b.session.time >= 12
                      ? b.session.time === 12
                        ? `${b.session.time}PM`
                        : `${b.session.time - 12}PM`
                      : `${b.session.time}AM`}
                  </p>
                  <p className="book-date">{b.session.date}</p>
                </div>
              </div>
              <div className="action-buttons">
                <div className="update-button cancel-button" onClick={() => fetchUpdateReq(b._id)}>
                  <HiOutlinePencil size={30} />
                </div>
                <div className="cancel-button" onClick={() => deleteItem(b._id)}>
                  <IoIosClose size={30} />
                </div>
              </div>
            </div>
          )) : (
            <div className="no-booking">
              <div className="no-book-logo">
                <FiAlignLeft size={100} />
              </div>
              <div className="no-book-text">
                <p className="no-book-par">No bookings available</p>
                <div className="active-send-no-book">
                  <p>click</p>
                  <p className="home no-book-home" onClick={() => navigate('/')}>here</p>
                  <p>to start booking</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={`update-wrapper ${showNickName ? 'visible' : ''}`}>
        <div className="update-container">
          <div className="container">
            <div className="cancel">
              <p onClick={handleCancel}>Cancel</p>
            </div>
            <h2 className="update-title">Give this booking a nickname</h2>
            <input
              type="text"
              className="nickname-booking"
              value={nickname}
              onChange={(e) => {
                const value = e.target.value;
                setChangedName(value.trim() !== ''); // Check if there's any value
                setNickname(value);
              }}
              placeholder="Nickname"
            />
          </div>
          <div className={`update-complete ${changedName ? 'enable' : ''}`} onClick={() => changedName && update()}>
            Update
          </div>
        </div>
      </div>
    </>
  );
};


const Profile = (props) => {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();
  const fetchUserProfile = async ()=> {
    const res = await fetch(`${url}/settings`);
    setProfile(await res.json());
  };
  useEffect(() => {
    fetchUserProfile();    
  }, []);

  if(props.forceReload) {
    return (
      <div className={`${props.is_home ? "user-container" : "settings-user"}`} onClick={() => navigate(props.location)}><span>{props.f}{props.l}</span></div>
    )
  }
  return (
    <div className={`${props.is_home ? "user-container" : "settings-user"}`} onClick={() => navigate(props.location)}>{profile ? profile.user ? (<span>{profile.user.first[0]}{profile.user.last[0]}</span>) : "" : ""}</div>
  )
}
const Settings =  () => {
  const [profile, setProfile] = useState([]);
  const [showSetting, setShowSetting] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [updateName, setUpdateName] = useState("Null");
  const [updateLName, setUpdateLName] = useState("Null");
  const [name, setName] = useState(false);
  const navigate = useNavigate();
  const fetchUserProfile = async ()=> {
    const res = await fetch(`${url}/settings`);
    setProfile(await res.json());
  };
  
  useEffect(() => {
    fetchUserProfile();    
  }, []);

  const NameSetting = () => {
    setUpdateName(profile ? profile.user ? profile.user.first : "Null" : "Null");
    setUpdateLName(profile ? profile.user ? profile.user.last : "Null" : "Null");
    setShowHome(false);
    setName(true);
    setShowSetting(true);
  }
  const finishNameSetting = () => {
    setShowHome(true);
    setName(false);
    setShowSetting(false);
  }
  const finishAndUpdate = async (first, last, id) => {
    await UpdateName(first, last, id);
    fetchUserProfile();
    finishNameSetting();
    console.log((profile.user.first + profile.user.last).length)
  }    
  const UpdateName = async (first, last, id) => {
    await fetch(`${url}/user/${id}`, {
      method: 'PUT',
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        user: {
          first: first,
          last: last
        }
      })
    })
  }
  return(
    <>
    <div className={`profile-container ${showSetting ? "setting-active" : ""}`}>
      <div className="settings-header">
        <div className="back-container">
          <p className={`home ${showHome ? "" : "dont-show-home"}`} onClick={()=> navigate('/')}>done</p>
        </div>
        <h2 className="settings-title">Settings</h2>
      </div>
      <div className="all-settings">
      <div className="name-container card" onClick={()=> NameSetting()}>
        <Profile forceReload={true} f={profile ? profile.user ? profile.user.first[0] : "" : ""} l={profile ? profile.user ? profile.user.last[0] : "" : ""}/>
        <div className="name-content">
        <p className="settings-name">
          {profile && profile.user ? (
            (profile.user.first + profile.user.last).length < 15 ? 
              `${profile.user.first} ${profile.user.last}` : 
              profile.user.first
          ) : "Loading profile..."}
        </p>
        <p className="settings-details">Name & Contact Details</p>
        </div>
        <MdNavigateNext className="next-button" size={30}/>
      </div>
      <div className="setting-group">
        <div className="name-container card booking-setting" onClick={()=> navigate('/bookings')}>
          <div className="b-set-logo">
            <div className="b-logo">
              <FaHistory/>
            </div>
            <p className="booking-label">Bookings</p>
          </div>
          <MdNavigateNext className="next-button" size={30}/>
        </div>
        <div className="name-container card booking-setting" onClick={()=> navigate('')}>
          <div className="b-set-logo">
            <div className="b-logo w-logo">
              <FaWallet />
            </div>
            <p className="booking-label">Payment Methods</p>
          </div>
          <MdNavigateNext className="next-button" size={30}/>
        </div>
        <div className="name-container card booking-setting" onClick={()=> navigate('')}>
          <div className="b-set-logo">
            <div className="b-logo w-logo">
              <IoIosSettings className="cog" size={27}/>
            </div>
            <p className="booking-label">General</p>
          </div>
          <MdNavigateNext className="next-button" size={30}/>
        </div>
      </div>
    </div>
    </div>
    <div className={`name-context-wrapper ${name ? "wrapper-shown" : ""}`}>
      <div className="setting-name-context">
        <div className="fin-container">
          <div className="go-back-setting">
            <IoIosArrowBack className="home" onClick={() => finishNameSetting()}/>
            <p className="home" onClick={()=> finishNameSetting()}>Back</p>
          </div>
          <p className="name-header">Account Details</p>
          <p className={`${profile?.user && (updateName === profile.user.first && updateLName === profile.user.last) ? "disabled" : ""} home`} onClick={() => {
              if (profile) {
                finishAndUpdate(updateName, updateLName, profile._id);
              }
            }}
          >
            Done
          </p>

        </div>
        <div className="name-in-setting">
          <div className="container-change">
            <div className="first-name name-indic">
              <p className="indicator">FIRST</p>
              <input className="name-label" type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)}/>
            </div>
            <div className="last-name name-indic">
              <p className="indicator">LAST</p>
              <input className="name-label" type="text" value={updateLName} onChange={(e) => setUpdateLName(e.target.value)}/>
            </div>
          </div>
          <p className="warning">*For demonstration, only first and last name can be updated.</p>
          <div className="container-change">
            <div className="first-name name-indic">
              <p className="indicator">PHONE</p>
              <input className="name-label" type="text" value={`+64 ${profile ?  profile.user ? profile.user.number : "" : ""}`}/>
            </div>
            <div className="last-name name-indic">
              <p className="indicator">EMAIL</p>
              <input className="name-label" type="text" value={profile ?  profile.user ? profile.user.email : "" : ""}/>
            </div>
            <div className="user-name name-indic">
              <p className="indicator">Display</p>
              <input className="name-label" type="text" value={profile ?  profile.user ? profile.user.username : "" : ""}/>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};