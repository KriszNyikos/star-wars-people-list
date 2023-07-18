import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import chubiLogo from "../public/chubi.gif";

export default function Home() {
  return (
    <>
      <Head>
        <title>Star Wars Characters</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Image src={chubiLogo} alt="Chubi" width={300} height={300} />
        <div>Do you wanna looking for a star wars character?</div>

        <Link href="/list?page=1">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Button
          </button>
        </Link>
      </main>
    </>
  );
}
