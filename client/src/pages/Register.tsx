import { Link, useNavigate } from "react-router-dom"
import { InputBox } from "../components/utils/inputBox"
import { ChangeEvent, FormEvent, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Register = () => {

        const [name,setName] = useState('')
        const [email,setEmail] = useState('')
        const [password,setPassword] = useState('')
        const [error,setError] = useState('')
        const [emailError,setEmailError] = useState(false)
        const [passwordError,setPasswordError] = useState(false)
        const [nameError,setNameError] = useState(false)

        const navigate = useNavigate()

        const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value)
            setNameError(false)
            setError("")
        }

        const handlePassChange = (e:   ChangeEvent<HTMLInputElement> ) => {
            setPassword(e.target.value)
            setPasswordError(false)
            setError("")
          }

        const handleEmailChange = (e: ChangeEvent<HTMLInputElement>  ) => {
            setEmail(e.target.value)
            setEmailError(false)
            setError("")
        }   

        const handleSubmit = async (e: FormEvent ) => {
            e.preventDefault()
            setError("")
            let isValid = true;

                if(name.length < 5 ) {
                    setNameError(true)
                    setError("Name must atleast be 5 characters long")
                    isValid = false
                }

                if(email.length < 5){
                    setEmailError(true)
                    setError("Eamil must atleast be 5 characters long")
                    isValid = false
                } 

                if(password.length < 5){
                    setPasswordError(true)
                    setError("password must atleast be 5 characters long")
                    isValid = false
                }

                if(!isValid){
                    // setError("Please fill all the details corectly")
                    return;
                }

             try {
              const response = await  axios.post(`${BACKEND_URL}/user/register`,{
                    email,name,password
                })
              
                if(response.status === 201) {
                    const {token} = response.data
                    console.log(token)
                    // if(token) {
                    //     navigate("/dashboard")
                    // }
                    
                } else {
                    setError("An error occurred during login. Please try again")
                }

                alert("registration successfull")
             } 

             catch (err:any) {
                if (err.response && err.response.status === 404) {
                    setError("Use is not found");
                }

               else if (err.response && err.response.data.error) {
                    console.log(err.response.data.err)
                    setError(err.response.data);
                } else {
                    console.error(err);
                    setError("An error occurred during registration. Please try again.");
                }
             }}

    return <div className="h-screen flex justify-center bg-opacity-15">
            <h1 className="font-bold relative top-10 left-32 text-3xl">Register</h1>
        <form onSubmit={handleSubmit}  className="w-2/4 shadow-md h-[420px] mt-20 rounded-lg p-6 bg-slate-100 bg-opacity-50 hover:shadow-lg ">
            {
                error && <p className="text-red-500 text-center pb-2 -mb-4">{error}</p>
            }


        <InputBox 
            name="name"
                placeholder="enter name"
                type="name"
                value={name}
                onChange={handleNameChange}
                label="name"
                error={nameError}
                errorMsg="Name must be at least 5 characters long."

            />
            <InputBox 
            name="email"
                placeholder="enter email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                label="Email Id"
                errorMsg="Email must be at least 5 characters long."

            />
            <InputBox 
            name="Password"
                placeholder="enter Password"
                type="Password"
                value={password}
                error={passwordError}
                onChange={handlePassChange}
                label="Password"
                errorMsg="Password must be at least 5 characters long."
            />
            
            <button className="bg-primary text-white rounded-full p-2 w-full hover:bg-red-600 text-xl">Register</button>
            <div className="mt-2 text-center p-2">
                Already have an Account yet? <Link to={'/login'} className="text-cyan-400 hover:text-cyan-800 underline"  > Login now  </Link>
            </div>
        </form>
    </div>
}