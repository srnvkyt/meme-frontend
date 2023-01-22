import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    //-----------Current Auth status-----------
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

    //--------Confirm User and Login
    const loginRequest = async (e) => {
        e.preventDefault();
        await axios.post(process.env.REACT_APP_SERVER_URL + '/login', user, { withCredentials: "include" })
            .then((res) => {
                // console.log(user.data);
                if (res.data.isAuth) {
                    navigate("/dashboard");
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
                <div className=" mx-lg-5 px-lg-5  m-2 p-2 mx-md-3 px-md-3">
                    <div className="mt-4 d-flex justify-content-center">



                        <form className="">

                            <h3 class="fw-normal mb-3 pb-3">Log in</h3>

                            <div class="form-outline mb-4">
                                <label class="form-label" for="formUsername">Username</label>
                                <input autoFocus required type="email" name="username" id="formUsername" class="form-control form-control-lg" onChange={(e) => { setUser({ username: e.target.value, password: user.password }) }} value={user.username} />
                            </div>

                            <div class="form-outline mb-4">
                                <label class="form-label" for="formPassword">Password</label>
                                <input required type="password" name="password" id="formPassword" class="form-control form-control-lg" onChange={(e) => { setUser({ username: user.username, password: e.target.value }) }} value={user.password} />
                            </div>

                            <div class="pt-1 mb-4">
                                <button class="btn btn-danger btn-lg" onClick={loginRequest} type="submit">Login</button>
                            </div>

                            <p class="small mb-5 pb-lg-2"><a class="text-muted" href="#!">Forgot password?</a></p>
                            <p>Don't have an account? <a href="/register" class="link-danger">Register here</a></p>

                        </form>
                    </div>

                </div>

            </div>
        </div>




    )

}

export default Login;