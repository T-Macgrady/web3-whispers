import { ethers } from "ethers"
import React, { useState, useMemo } from "react"
import toast from "react-hot-toast"
import {
  useContractRead,
  useContractWrite,
  UserRejectedRequestError,
} from "wagmi"
import { contractABI, contractAddress } from "../lib/contract"

export default function Controls() {
  const [price, setPrice] = useState("")
  const [odds, setOdds] = useState("")
  const [jackpot, setJackpot] = useState("")
  const [deposit, setDeposit] = useState("")

  /**
   * Contract hooks
   */
  useContractRead(
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

  useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: contractABI,
    },
    "getOdds",
    {
      onSuccess(data) {
        setOdds(ethers.utils.formatUnits(data, 0))
      },
    }
  )

  useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: contractABI,
    },
    "getJackpot",
    {
      onSuccess(data) {
        setJackpot(ethers.utils.formatEther(data))
      },
    }
  )

  const { refetch: totalTweetsRefetch } = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: contractABI,
    },
    "getTotalTweets"
  )

  const { data: isPausedData } = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: contractABI,
    },
    "isPaused"
  )

  const { write: updateSettings } = useContractWrite(
    {
      addressOrName: contractAddress,
      contractInterface: contractABI,
    },
    "updateSettings",
    {
      onSuccess(data) {
        toast.success("Updated settings")
        console.debug("Updated settings --", data.hash)
      },
      onError(error) {
        if (error instanceof UserRejectedRequestError) {
          toast.error("User rejected transaction")
          console.error("User rejected transaction")
        } else if (error.message.includes("Ownable: caller is not the owner")) {
          toast.error("You are not the owner!")
          console.error("Unauthorized --", error)
        } else {
          toast.error("Transaction failed")
          console.error("Transaction failed --", error)
        }
      },
    }
  )

  const { write: clear } = useContractWrite(
    {
      addressOrName: contractAddress,
      contractInterface: contractABI,
    },
    "clear",
    {
      onSuccess(data) {
        toast.success("Cleared tweets")
        console.debug("Cleared --", data.hash)
        totalTweetsRefetch().then((value) => {
          console.debug(
            "Retrieved total tweet count --",
            value.data!.toNumber()
          )
        })
      },
      onError(error) {
        if (error instanceof UserRejectedRequestError) {
          toast.error("User rejected transaction")
          console.error("User rejected transaction")
        } else if (error.message.includes("Ownable: caller is not the owner")) {
          toast.error("You are not the owner!")
          console.error("Unauthorized --", error)
        } else {
          toast.error("Transaction failed")
          console.error("Transaction failed --", error)
        }
      },
    }
  )

  const { write: pause } = useContractWrite(
    {
      addressOrName: contractAddress,
      contractInterface: contractABI,
    },
    "pause",
    {
      onSuccess(data) {
        toast.success("Paused contract")
        console.debug("Paused --", data.hash)
      },
      onError(error) {
        if (error instanceof UserRejectedRequestError) {
          toast.error("User rejected transaction")
          console.error("User rejected transaction")
        } else if (error.message.includes("Ownable: caller is not the owner")) {
          toast.error("You are not the owner!")
          console.error("Unauthorized --", error)
        } else {
          toast.error("Transaction failed")
          console.error("Transaction failed --", error)
        }
      },
    }
  )

  const { write: unpause } = useContractWrite(
    {
      addressOrName: contractAddress,
      contractInterface: contractABI,
    },
    "unpause",
    {
      onSuccess(data) {
        toast.success("Unpaused contract")
        console.debug("Unpaused --", data.hash)
      },
      onError(error) {
        if (error instanceof UserRejectedRequestError) {
          toast.error("User rejected transaction")
          console.error("User rejected transaction")
        } else if (error.message.includes("Ownable: caller is not the owner")) {
          toast.error("You are not the owner!")
          console.error("Unauthorized --", error)
        } else {
          toast.error("Transaction failed")
          console.error("Transaction failed --", error)
        }
      },
    }
  )

  /**
   * Balance
   * @notice get balance of contract
   * @returns {void}
   */
  const { data: balanceData, refetch: refetchBalance } = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: contractABI,
    },
    "getBalance"
  )
  const balance = useMemo(
    () => balanceData && ethers.utils.formatEther(balanceData),
    [balanceData]
  )

  /**
   * Deposit
   * @notice deposit funds to contract
   * @param {string} deposit - amount to deposit
   * @returns {void}
   */
  const { write: sendDeposit } = useContractWrite(
    {
      addressOrName: contractAddress,
      contractInterface: contractABI,
    },
    "deposit",
    {
      onSuccess(data) {
        refetchBalance()
          .then((value) => {
            console.debug("Retrieved balance --", value.data)
          })
          .catch((err) => {
            console.error("Retrieved balance error --", err)
          })
        toast.success("Set deposit")
        console.debug("Set deposit --", data.hash)
      },
      onError(error) {
        if (error instanceof UserRejectedRequestError) {
          toast.error("User rejected transaction")
          console.error("User rejected transaction")
        } else if (error.message.includes("Ownable: caller is not the owner")) {
          toast.error("You are not the owner!")
          console.error("Unauthorized --", error)
        } else {
          toast.error("Transaction failed")
          console.error("Transaction failed --", error)
        }
      },
    }
  )

  /**
   * Update the setting parameters (price, odds, jackpot), only for the owner
   * @param {Object} event
   */
  const updateContractSettings = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      e.preventDefault()

      updateSettings({
        args: [
          e.currentTarget.odds.value,
          ethers.utils.parseEther(e.currentTarget.price.value),
          ethers.utils.parseEther(e.currentTarget.jackpot.value),
        ],
      })
    } catch (error) {
      toast.error("Transaction error")
      console.error("Transaction error --", error)
    }
  }

  /**
   * Delete all tweets from the contract, only for the owner
   */
  const clearTweets = async () => {
    try {
      clear()
    } catch (error) {
      toast.error("Transaction error")
      console.error("Transaction error --", error)
    }
  }

  /**
   * Pause all transactions to the contract, only for the owner
   */
  const pauseContract = () => {
    try {
      if (isPausedData) {
        unpause()
      } else {
        pause()
      }
    } catch (error) {
      toast.error("Transaction error")
      console.error("Transaction error --", error)
    }
  }

  return (
    <section className="m-3 rounded-xl bg-gray-100 p-3">
      <h3>Contract Settings</h3>
      <p className="mt-1">
        Welcome, owner! You may modify the contract settings below:
      </p>
      <form onSubmit={updateContractSettings}>
        <div className="mt-3 flex">
          <label>Odds:</label>
          <input
            id="odds"
            type="number"
            value={odds}
            onChange={(e) => setOdds(e.target.value)}
            placeholder="0 - 100"
            className="w-full bg-gray-100 text-right"
            required
          />
          <span>%</span>
        </div>
        <div className="mt-1 flex">
          <label>Price:</label>
          <input
            id="price"
            type="number"
            step="any"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price in Ether"
            className="w-full bg-gray-100 text-right"
            required
          />
          <span>Ξ</span>
        </div>
        <div className="mt-1 flex">
          <label>Jackpot:</label>
          <input
            id="jackpot"
            type="number"
            step="any"
            value={jackpot}
            onChange={(e) => setJackpot(e.target.value)}
            placeholder="Prize in Ether"
            className="w-full bg-gray-100 text-right"
            required
          />
          <span>Ξ</span>
        </div>
        <div className="mt-6 flex flex-col">
          <button className="button mx-6">Submit Changes</button>
          <button
            className="button mx-6 mt-3"
            type="button"
            onClick={pauseContract}
          >
            Pause Contract
          </button>
          <button
            className="button mx-6 mt-3"
            type="button"
            onClick={clearTweets}
          >
            Clear All Tw33ts
          </button>
        </div>
        <div className="mt-1 flex">
          <label>balance:</label>
          <input
            id="balance"
            type="number"
            disabled
            step="any"
            value={balance}
            placeholder="balance in Ether"
            className="w-full bg-gray-100 text-right"
            required
          />
        </div>
        <div className="mt-1 flex">
          <label>Deposit:</label>
          <input
            id="deposit"
            type="number"
            step="any"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            placeholder="Deposit in Ether"
            className="w-full bg-gray-100 text-right"
          />
          <span>Ξ</span>
        </div>
        <div className="mt-6 flex flex-col">
          <button
            className="button mx-6 mt-3"
            type="button"
            onClick={() => {
              const depositInWei = ethers.utils.parseEther(deposit)

              sendDeposit({ overrides: { value: depositInWei } })
            }}
          >
            Deposit
          </button>
        </div>
      </form>
    </section>
  )
}
