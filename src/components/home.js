import React, {useState, useEffect} from 'react'
import Image from 'react-bootstrap/Image'
import { useNavigate } from 'react-router-dom';

function Home() {

  let userD = JSON.parse(localStorage.getItem('userDetails'));
  // console.log(user)
  let navigate = useNavigate()
  let [user, setUser] = useState([userD])

  console.log(user)

  useEffect(()=>{
    fetch('https://newserver-wy4a.onrender.com')
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      let newData = data.filter((e) => e.email === userD.email)
      console.log(newData);
      setUser(newData);
    })
  },[userD])
  
  console.log(user)

  sessionStorage.setItem("userDetails", JSON.stringify(user))

  // const uD = JSON.parse(sessionStorage.getItem('userinformation'))
  // console.log(detailuser)
  // let uD = Object.values(detailuser || {})
  // console.log(uD)
  // console.log(uD[0])

  function handleSignOut() {
    localStorage.clear();
    sessionStorage.removeItem('userinformation');
    console.log("Data removed")
    navigate(`/signin`)
  }

  function editProfile() {
    navigate(`/profile`)
  }


  return <>
    <div className="container"> 
      <div className='d-flex flex-row align-item-center justify-content-center m-5'>
        <div className="card border-0 shadow rounded-3 mt-5 d-flex flex-column align-items-center justify-content-center" style={{'width':'70vw'}}>
          <h2 className='mt-3 mx-2'>Welcome {user[0].name}</h2>
          <Image src={user[0].picture} roundedCircle width="100"></Image>
          <hr className='border border-info border-1 w-75' />
          <h4 className='mx-2'style={{'fontSize':'1.75vw'}}>{user[0].email}</h4>
          <h5 className='mx-2'>{user[0].phone}</h5>
          <h6 className='mx-2'>{user[0].address}</h6>
          <div className="d-flex justify-content-center w-100">
            <button className="btn btn-info text-uppercase fw-bold m-3 " type="submit" onClick={() => editProfile()}>
              Edit Profile
            </button>
            <button className="btn btn-info text-uppercase fw-bold m-3 " type="submit" onClick={() => handleSignOut()}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Home
