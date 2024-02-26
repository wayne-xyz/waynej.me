
import Profile from "./profile";
import Cardlist from "./cardlist";
import Backgournd from "./background";


// home page 
export default function Home() {
  return (
      <div className="mb-0  md:grid place-content-center bg-gradient-to-tl from-lightbg-blue-100 via-lightbg-blue-200 to-lightbg-blue-300  dark:from-darkbg-blue-100 from-30% dark:via-darkbg-blue-300 via-60% dark:to-darkbg-blue-200 to-100% rounded-lg " >
        <main className="mb-20 ">
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