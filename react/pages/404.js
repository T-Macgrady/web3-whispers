import Head from "next/head"
import Link from "next/link"
import Layout from "../components/Layout"
import { useState, useEffect } from "react"
import { useAccount } from "wagmi"

export default function Error404() {
  const [address, setAddress] = useState("")
  const { refetch: accountRefetch } = useAccount()

  /**
   * Get the address of the connected account
   */
  const getAddress = () => {
    try {
      accountRefetch().then((value) => {
        console.log(value)
        setAddress(value.data.address)
      })
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * On page load
   */
  useEffect(() => {
    getAddress()
  })

  return (
    <>
      <Head>
        <title>Error 404 - Twitt3r</title>
        <meta name="description" content="That page cannot be found!" />
      </Head>
      <Layout>
        <section className="p-4 border-b">
          <h1>Error 404: Rugged!</h1>
          <h3 className="mt-4">Looks like that page does not exist</h3>
          <p className="mt-4">
            The selected profile does not exist, or you are trying to access a
            non-existent page. Trying{" "}
            <Link href="/">
              <a>returning home</a>
            </Link>{" "}
            or check out your{" "}
            <Link href={`/${address}`}>
              <a>Twitt3r profile</a>
            </Link>
            .
          </p>
        </section>
      </Layout>
    </>
  )
}
