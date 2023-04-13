import { useState } from "react";
import "./Form.css";

export default function Form() {
  
  
    const [firstName,setFirstName]=useState("");
  
    const [lastName,setLastName]=useState("");

    const[email,setEmail]=useState("");
  
    const registerHandler = (event) => {
        event.preventDefault();
        
        let userInfo={
            firstName,
            lastName,
            email,
        }
        fetch('https://faramarz22-39d23-default-rtdb.asia-southeast1.firebasedatabase.app/users.json',{
            method:'POST',
            body:JSON.stringify(userInfo)
        }).then(response=> console.log(response))
    }


    return (



        <div className="form-container">
            <form className="register-form" autoComplete="off" onSubmit={registerHandler}>
                <input
                    value={firstName}
                    id="first-name" className="form-field"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    onChange={(event) => setFirstName(event.target.value)}
                />
                <input
                    value={lastName}
                    id="last-name"
                    className="form-field"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={(event) => setLastName(event.target.value)}
                />

                <input
                    value={email}
                    id="email"
                    className="form-field"
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                />
                <button className="form-field" type="submit">
                    Register
                </button>
            </form>
        </div>

    )
    }