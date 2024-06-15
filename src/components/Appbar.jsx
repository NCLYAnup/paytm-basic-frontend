import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser]=useState([])

    useEffect(()=>{
        axios.get("https://paytm-basic-backend-one.vercel.app/api/v1/user/profile" ,
        {
           headers: {
               Authorization: "Bearer " + localStorage.getItem("token")
           }
       }).then(response => {
               setCurrentUser(response.data.user)
       }) 
    }, []);
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <button className="justify-end bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 mx-2 my-2 mr-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out ml-auto" onClick={()=>{navigate("/")}}>Logout</button>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            {currentUser.firstName && currentUser.firstName.length > 0 ? (
                <button className="flex flex-col justify-center h-full text-xl" onClick={()=>{
                    navigate("/profile")
                }} >{currentUser.firstName[0]}</button>
                ) : (
                    <div className="flex justify-center items-center h-full w-full">?</div>
                  )}
            </div>
        </div>
    </div>
}