import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={(e) => {
          setFirstName(e.target.value);
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={(e) => {
          setLastName(e.target.value);
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={(e) => {
          setUsername(e.target.value);
        }} placeholder="john.doe@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        {message && (
          <div  className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">{message}</div>
        )}
        <div className="pt-4">
          <Button onClick={() => {
              axios.post("https://paytm-basic-backend-one.vercel.app/api/v1/user/signup", {
              username,
              firstName,
              lastName,
              password
            }).then(response =>{
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }).catch((error)=>{
              setMessage(error.response.data.message);
            });
          }} label={"Sign up"} />
        </div>

        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />

      </div>
    </div>
  </div>
}