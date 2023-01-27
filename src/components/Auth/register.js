import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import ProfileDetails from "./profile";

const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState({
    fname: '',
    lname: ''
  });
  const [Input, setInput] = useState({
    email: '',
    username: '',
    password: ''
  });

  //--------------Current Auth status------------
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_URL + "/isauth", { withCredentials: "include" })
      .then((res) => {
        if (res.data.isAuth) {
          navigate("/stories")
        }
      }).catch((err) => {
        console.log(err);
      })
  }, [])

  //--------Register user--------
  const registerRequest = async (e) => {
    e.preventDefault()
    const user = {
      email: Input.email,
      username: Input.username,
      password: Input.password
    }

    await axios.post(process.env.REACT_APP_SERVER_URL + '/register', user, { withCredentials: "include" })
      .then((res) => {
        if (res.data.isAuth) {
        } else {
          console.log(res);

        }
      })
      .catch((error) => {
        console.log(error);
      });

  }
  return (
    <div>
      <div>
        <div className="quickLinks sticky-top bg-white px-2 py-2">
          <div className=" d-flex ms-2 ms-md-3">
            <div className=" mx-auto" style={{ width: "1370px" }}>

              <a href="/" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold"><i class="my-1 pe-1 bi bi-arrow-left" /><i class=" my-1 bi bi-house-door" /></a>
              <a href="/stories" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold me-1"><i class="my-1 pe-1 bi bi-arrow-left" />Stories</a>

              <a href="/people" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold"><i class="my-1 pe-1 bi bi-arrow-left" />People</a>
            </div>

          </div>


        </div>
        <div id="carouselControls" class="carousel slide">
          <div class="carousel-inner">
            <div class="carousel-item active">

              <div className=" m-2 p-2 mx-md-3 px-md-3">
                <div className="mt-4 d-flex justify-content-center">

                  <form className="col-lg-3 col-md-5">

                    <h3 class="fw-normal mb-3 pb-3">Register</h3>

                    
                    <div class="form-outline mb-4">
                      <label class="form-label" for="formUsername">Username</label>
                      <input required type="text" name="username" id="formUsername" class="form-control form-control-lg" value={Input.username} onChange={(event) => {
                        setInput({
                          email: Input.email,
                          username: event.target.value,
                          password: Input.password
                        })
                      }} />
                    </div>
                    <div class="form-outline mb-4">
                      <label class="form-label" for="formEmail">Email address</label>
                      <input required type="email" name="email" id="formEmail" class="form-control form-control-lg" value={Input.email} onChange={(event) => {
                        setInput({
                          email: event.target.value,
                          username: Input.username,
                          password: Input.password
                        })
                      }} />
                    </div>

                    <div class="form-outline mb-4">
                      <label class="form-label" for="formPassword">Password</label>
                      <input required type="password" name="password" id="formPassword" class="form-control form-control-lg" value={Input.password} onChange={(event) => {
                        setInput({
                          email: Input.email,
                          username: Input.username,
                          password: event.target.value
                        })
                      }} />
                    </div>

                    <div class="pt-1 mb-4">
                      <button class="btn btn-danger btn-lg d-block" data-bs-target="#carouselControls"
                        data-bs-slide="next" onClick={registerRequest} type="submit">Register</button>
                    </div>

                    <p className="w-100 d-block">Already have an account? <a href="/login" class="link-danger">Login here</a></p>

                  </form>
                </div>

              </div>
            </div>


            <div class="carousel-item">
            <ProfileDetails />


              
            </div>

          </div>
      
        </div>


      </div>
    </div>
  )

}

export default Register;