import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import chubiLogo from "../public/chubi.gif";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Star Wars Characters</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center content-center  p-24 bg-slate-500" >
        <div className="flex flex-col rounded items-center content-center text-white bg-slate-700 p-3">
          {isLoading! ? <Image src={chubiLogo} alt="Chubi" width={300} height={300} />: null}
        
        <div className="m-3">Are you looking for a star wars character?</div>
        <Link href="/list?page=1">
          <button onClick={() => setIsLoading(true)}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Button
          </button>
        </Link>
        </div>

      </main>
    </>
  );
}
