import Image from "next/image";
import Profile from "./profile";
import Cardlist from "./cardlist";

export default function Home() {
  return (
    
    <div className="grid place-content-center">
      <main>
        <div id="profile" className="parent flex">
          <Profile/>
        </div>
        <div id="cardlist">
          <Cardlist/>
        </div>
      </main> 
    </div>
  );
}
