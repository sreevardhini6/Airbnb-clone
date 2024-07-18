import React, { ChangeEvent } from "react"

interface InputBoxProps {
    type:string
    value?:string
    placeholder:string
    onChange: (e: ChangeEvent<HTMLInputElement>  ) => void
    label?:string
    error?:boolean
    name?:string
    errorMsg?:string
}

export const InputBox: React.FC<InputBoxProps> = ({
    type,onChange,placeholder,value,label,error,name,errorMsg
}) => {

    return <div className="mb-4 p-2">
        <label className="block text-sm font-extrabold pl-1 capitalize mb-1" >  {label}  </label>
            <input 
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={`w-full p-2 border rounded-full text-black ${error ? 'border-primary' : 'border-gray-200'}`} />

{error && errorMsg && <span  className="text-red-400 text-sm mt-1"> {errorMsg} </span>   }
    </div>
}