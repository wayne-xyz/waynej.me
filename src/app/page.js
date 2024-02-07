
import Profile from "./profile";
import Cardlist from "./cardlist";
import Head from "next/head";

// home page 
export default function Home() {
  return (
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
  );
}
