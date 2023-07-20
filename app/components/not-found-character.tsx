import chubiLogo from "../../public/chubi.gif";
import Image from "next/image";

export default function NotFoundCharacter() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div>
          <Image src={chubiLogo} alt="Chubi" width={300} height={300} />
        </div>

        <div className="text-2xl font-bold text-center">
          Sorry we did not found characters for you. 
        </div>
        <div>
        Please, try again the search with other parameters.
        </div>
      </div>
    </div>
  );
}
