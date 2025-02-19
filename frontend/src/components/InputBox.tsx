import { ChangeEvent } from "react";

interface InputBoxTypes {
    type: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement> ) => void
    label: string;
}

export const InputBox = ({type, placeholder, onChange, label}: InputBoxTypes) => {
    return <div>
        <label className="block mb-2 text-sm font-medium text-white opacity-90">{ label }</label>
        <input type={type} onChange={onChange} className="opacity-90 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} />      
    </div>
}