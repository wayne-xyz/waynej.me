
import Profile from "./profile";
import Cardlist from "./cardlist";



// home page 
export default function Home() {
  return (
      <div className="mb-0  md:grid place-content-center " >
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