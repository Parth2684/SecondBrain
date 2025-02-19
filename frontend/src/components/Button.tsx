import { MouseEventHandler } from "react";


interface ButtonInputs {
    label: string;
    onClick: (MouseEventHandler<HTMLButtonElement>)
}

export const Button = ({ label, onClick }: ButtonInputs) => {
    return <div>
        <button onClick={onClick} className="opacity-90 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
        <span className="opacity-90 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
        {label}
        </span>
        </button>
    </div>
}