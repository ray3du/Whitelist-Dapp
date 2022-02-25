import { Link } from "react-router-dom"
import logo from "../public/logo.jpeg"

const Home = () => {
    return(
        <div className="pt-12">
            <div className="grid grid-cols-2 gap-4 w-11/12 md:w-8/12 lg:w-6/12 m-auto p-4 bg-slate-800 shadow-md rounded text-white">
                <div className="col-start-1 col-end-3 flex flex-col justify-content items-start my-4">
                    <p className="text-lg font-bold">Welcome to Crypto Devs!</p>
                    <p className="text-sm my-4">Join the waitlist to get custom coin</p>
                    <Link to="/join" className="bg-red-500 mt-2 py-2 px-4 shadow rounded hover:opacity-50 hover:cursor-pointer" >Join Waitlist</Link>
                </div>
                <div className="my-4 col-end-7 col-span-2">
                    <img src={logo} alt="logo" className="object-cover"/>
                </div>
            </div>
        </div>
    )
}

export default Home