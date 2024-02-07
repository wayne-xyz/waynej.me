
import Profile from "./profile";
import Cardlist from "./cardlist";
import Head from "next/head";
import { GoogleAnalytics } from '@next/third-parties/google'

// home page 
export default function Home() {
  return (
    <>
      <Head>
        <GoogleAnalytics gaId="G-5K7T3SZ06Z" />
      </Head>
      <div className="md:grid place-content-center ">
        <main className=" ">
          <div id="profile" className=" flex place-content-center ">
            <Profile />
          </div>
          <div id="cardlist" className="flex max-w-4xl place-content-center">
            <Cardlist />
          </div>
        </main>
      </div>
    </>
  );
}
