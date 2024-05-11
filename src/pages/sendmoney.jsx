import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    
    const navigate = useNavigate();

    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    const showError = (message) => {
      setErrorMessage(message);
      setIsErrorVisible(true);
    };
  
    const closeError = () => {
      setIsErrorVisible(false);
    };
     

    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" 
                        htmlFor="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    </div>
                    {errorMessage && <ErrorMessage isVisible={isErrorVisible} closeHandler={closeError} message={errorMessage} />}
                    <button onClick={() => {
                      axios.post("https://paytm-basic-backend-one.vercel.app/api/v1/account/transfer", {
                            to: id,
                            amount
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        }).then(response=>{
                            if (response.status === 200) {
                                localStorage.setItem('transactionAmount', amount)
                                navigate("/success")
                            }
                        }).catch(error=>{
                            if (error.response.status === 400) {
                                showError(error.response.data.message);
                            }
                        })
                      
                    }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-600 text-white">
                        Initiate Transfer
                    </button>
                    <button onClick={() => {navigate("/dashboard")}} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-red-600 text-white">
                      Cancel Transaction
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>
}