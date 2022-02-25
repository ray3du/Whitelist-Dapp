import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ethers, utils } from "ethers"
import abi from "../contracts/WhiteList.json"

const Join = () => {

    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState("")
    const [address, setAddress] = useState("")
    const [num, setNum] = useState(-1)
    const [walletConnected, setWalletConnected] = useState(false)

    const CONTRACT_ADDRESS = "0xbADd71fBC5a275DF45a04Fa9740135DEf5B338Ca"
    const ABI = abi.abi

    const handAddressChange = (e) => {
        setAddress(e.target.value)
    }

    const checkConnection = async() => {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({
                    method:'eth_requestAccounts'
                  })
                  const account = accounts[0]
                  setWalletConnected(true)
                  setAddress(account)
            } else {
                setShowModal(true)
                setMessage("Please install Metamask to get started!")
                setWalletConnected(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getNumAddresses = async () => {
        if(!walletConnected){
            checkConnection()
        }else{
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const WhitelistContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
            
            let numAddress = await WhitelistContract.getNumAddresses()
            console.log(numAddress)
            setNum(numAddress)
        }
    }

    const setWhitelistAddress = async(e) => {
        e.preventDefault()
        if (!walletConnected) {
            checkConnection()
        } else {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()

            const WhiteListContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)

            const result = await WhiteListContract.setWhitelistAddress()

            await result.wait()
        }
    }


    useEffect(() => {
        checkConnection()
        setWalletConnected(true)
        getNumAddresses()        
    }, 
    [walletConnected])

    return(
        <div className="pt-12">
            <div className="w-11/12 md:w-7/12 lg:w-6/12 m-auto p-4 bg-slate-800 shadow-md rounded text-white">
                <p className="text-lg font-bold">Join the Waitlist</p>
                <p className="text-sm py-4">{ 
                    num == -1? null:
                    num + " Addresses have been are in the wait list"
                }</p>
                <p className="text-xs py-4">{address != "" ? "Your address: " + address : null}</p>
                <form  method="post" onSubmit={setWhitelistAddress}>
                    { address == "" ?
                    <input type="text" name="address" value={address} onChange={handAddressChange}  className="bg-slate-400 rounded w-full py-2 px-2 outline-none my-4 text-xs" placeholder="Address 0x0000000000000"/>
                    :
                    <input type="text" name="address" value={address} onChange={handAddressChange}  className="bg-slate-400 rounded w-full py-2 px-2 outline-none my-4" placeholder={"Your address: " + address} disabled/>
                    }
                    <div className="flex flex-row">
                        <input type="submit" value="Join" className="bg-red-500 mt-2 py-2 px-4 shadow rounded hover:opacity-50 hover:cursor-pointer mr-4" />
                        <Link to="/" className="bg-sky-500 mt-2 py-2 px-4 shadow rounded hover:opacity-50 hover:cursor-pointer" >Home</Link>
                    </div>
                </form>
            </div>
            {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">General Info</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                    <p className="text-lg text-red-300">
                        {message}
                    </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
        </div>
    )
}

export default Join