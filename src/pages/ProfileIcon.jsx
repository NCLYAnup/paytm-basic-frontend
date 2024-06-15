import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from "../components/Button"

export function ProfileIcon() {

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: ''
    })
    const [isEditable, setIsEditable] = useState(false);
    const [message, setMessage] =useState("");
    

    useEffect(()=>{
        axios.get("https://paytm-basic-backend-one.vercel.app/api/v1/user/profile" ,
        {
           headers: {
               Authorization: "Bearer " + localStorage.getItem("token")
           }
       }).then(response => {
               setUser(response.data.user)
               
       }) 
    }, []);


   const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
};

const toggleEdit = () => {
    setIsEditable(!isEditable);
};

const navigate = useNavigate();
   return (
    <div className="max-w-4xl mx-auto my-10 p-5 border rounded-lg shadow-lg bg-white">
            <form>
                <h2 className="text-2xl font-semibold mb-5">Update Profile</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                    {isEditable ? (
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleChange}
                        />
                    ) : (
                        <p className="py-2">{user.firstName}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                    {isEditable ? (
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                        />
                    ) : (
                        <p className="py-2">{user.lastName}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    {isEditable ? (
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                        />
                    ) : (
                        <p className="py-2">{user.username}</p>
                    )}
                </div>
                <button
                    type="button"
                    onClick={toggleEdit}
                    className={`mt-4 ${isEditable ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'} font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                >
                    {!isEditable && <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />}
                    {isEditable ? <button onClick={()=>{
        axios.put("https://paytm-basic-backend-one.vercel.app/api/v1/user/updateprofile" , {
            user
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
                setMessage(response.data.message)
                setTimeout(() => setMessage(''),3000)
        }).catch((error)=> {
            setMessage(error.response.data.message)
            setTimeout(() => setMessage(''),3000)
    });
    

    }}>Update Profile</button> : 'Edit'}
                </button>
                {message && (

                <div className="mb-4 mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{message}</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.697l-2.651 2.652a1.2 1.2 0 1 1-1.697-1.697l2.651-2.652-2.651-2.651a1.2 1.2 0 1 1 1.697-1.697l2.651 2.651 2.651-2.651a1.2 1.2 0 1 1 1.697 1.697L11.697 10l2.651 2.651a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
       
                    </div>
                )}
            </form>
            <div className="w-24 mt-4">
            <Button onClick={()=>{navigate("/dashboard")}} label={"Back"} />
            </div>
        </div>
      
   )
}