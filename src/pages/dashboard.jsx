import axios from "axios"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useState, useEffect } from "react"
import Loader from "../components/Loader"

export const Dashboard =   () => {
    const [balance, setBalance]=useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://paytm-basic-backend-one.vercel.app/api/v1/account/balance",
         {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
                setBalance(response.data.balance)
                setLoading(false);

    }), []})

    if (loading) {
        return <Loader />; // Show the loader while loading
      }
      
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={Math.floor(balance)} />
            <Users />
        </div>
    </div>
}