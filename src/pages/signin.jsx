import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

 
      const Loader = ({ message }) => {
        return (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-2xl text-white bg-grey-500 py-2 px-4 rounded">
              {message}
            </div>
          </div>
        );
      };

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="anup.choudhury@gmail.com" label={"Email"} /> 
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
         {message && (
          <div  className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">{message}</div>
        )}
        <div className="pt-4">
          <Button onClick={() => {
                  setLoading(true);
            axios.post("https://paytm-basic-backend-one.vercel.app/api/v1/user/signin", {
              username,
              password
            }).then(response =>{
              setLoading(false);
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }).catch((error)=>{
              setLoading(false);
              setMessage(error.response.data.message);
           })
            }} 
          label={"Sign In"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        <div>
        
        {loading && <Loader message="Signing In..." />}
        </div>
      </div>
      
    </div>
  </div>
}