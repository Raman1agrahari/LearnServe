import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../store/auth";
import { toast } from 'react-toastify';

const URL = `${import.meta.env.VITE_API}/api/auth/login`;

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const {storeTokenInLs} = useAuth();

  const handleInput = (e) => {
    console.log(e);
    
    const { name, value } = e.target;
     setUser((prev) => 
       ({ ...prev,
       [name]: value })
      );
  };

  const login = async () => {
  const res = await fetch(`${import.meta.env.VITE_API}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  console.log(data);
};

  // handle form on submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(user);
    try{
      const response = await fetch(URL, {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(user),
      })
      
      console.log("login form",response);

      const res_data = await response.json();
         

      if(response.ok){
        alert("Login succcessfully");
        localStorage.setItem(res_data.token);
        storeTokenInLs(res_data.token);
       
        setUser({email:"",password:""});
        navigate("/");
      }else{
         alert(res_data.extraDetails ? res_data.extraDetails: res_data.message);
         };
    }catch(error){
        console.log(error);
    }
  };

 

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/login.png"
                  alt="good education"
                  width="200"
                  height="400"
                />
              </div>
              
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
      
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                 
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
