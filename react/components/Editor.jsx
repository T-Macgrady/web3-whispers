import { ethers } from "ethers"
import { useState } from "react"
import toast from "react-hot-toast"
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useEnsAvatar,
  useSigner,
  UserRejectedRequestError,
} from "wagmi"
import { contractAddress, contractABI } from "../lib/contract.js"

export default function Editor() {
  const [message, setMessage] = useState("")
  const [price, setPrice] = useState(0)
  const { data: account } = useAccount()

  const { data: signer } = useSigner()

  /**
   * Contract hooks
   */
  const {
    data: avatar,
    isSuccess: avatarSuccess,
    refetch: avatarRefetch,
  } = useEnsAvatar({
    addressOrName: account ? account.address : "",
    onError(error) {
      console.error("Error fetching ENS", error)
    },
  })

  const {
    data: priceData,
    error: priceError,
    refetch: priceRefetch,
  } = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: contractABI,
    },
    "getPrice",
    {
      onSuccess(data) {
        setPrice(ethers.utils.formatEther(data))
      },
    }
  )

  const {
    data: totalTweetsData,
    error: totalTweetsError,
    refetch: totalTweetsRefetch,
  } = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: contractABI,
    },
    "getTotalTweets"
  )

  const {
    data: tweetData,
    error: tweetError,
    write: newTweet,
  } = useContractWrite(
    {
      addressOrName: contractAddress,
      contractInterface: contractABI,
    },
    "newTweet",
    {
      onSuccess(data) {
        totalTweetsRefetch().then((value) => {
          toast.success("Sent tweet!")
          console.debug("Tweeted --", data.hash)
          console.debug("Retrieved total tweet count --", value.data.toNumber())
        })
      },
      onError(error) {
        if (error instanceof UserRejectedRequestError) {
          toast.error("User rejected transaction")
          console.error("User rejected transaction")
        } else {
          toast.error("Transaction failed")
          console.error("Transaction failed --", error)
        }
      },
    }
  )

  /**
   * Submit a new tweet to the contract
   */
  const sendTweet = () => {
    try {
      newTweet({
        args: message.toString(),
        overrides: { value: ethers.utils.parseEther(price) },
      })
    } catch (error) {
      toast.error("Please wait 1 minute before tweeting again!")
      console.error("Transaction failed --", error)
    }
  }

  return (
    <section className="flex flex-col border-b">
      <h2 className="mt-4 ml-3">Latest Tw33ts</h2>
      <div className="mt-2 flex items-center">
        <img
          src="/images/egg.png"
          className="mx-3 inline h-12 w-12 rounded-full"
        />
        {avatar && (
          <img
            src={avatar}
            className="absolute top-0 left-0 z-10 mx-3 inline h-12 w-12 rounded-full"
            onLoad={() => setLoaded(true)}
          />
        )}
        <textarea
          type="text"
          rows="1"
          value={message}
          maxLength="280"
          placeholder="What's happening? (in web3)"
          onChange={(e) => setMessage(e.target.value)}
          onInput={(e) => {
            e.target.style.height = "auto"
            e.target.style.height = e.target.scrollHeight + "px"
          }}
          className="mr-4 grow resize-none text-xl outline-none"
        />
      </div>
      <div className="ml-3 flex items-center justify-between">
        <span className="mb-3 text-sm text-gray-500">Price: {price}Ξ</span>
        <div>
          <span className="text-gray-500">
            {message ? message.length + "/280" : ""}
          </span>
          <button className="button mx-3 mb-3 self-end" onClick={sendTweet}>
            Tw33t
          </button>
        </div>
      </div>
    </section>
  )
}
