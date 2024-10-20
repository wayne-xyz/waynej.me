
import dynamic from 'next/dynamic'

const HomePage = dynamic(() => import('./home-page'), { ssr: false })

// home page 
export default function Home() {
  return (
      <div className="mb-0  md:grid place-content-center " >
        <main className="mb-20 ">

          <HomePage /> {/* Used HomePageComponent */}
        </main>
      </div>
  );
}
