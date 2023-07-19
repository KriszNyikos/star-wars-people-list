import Image from "next/image";

export default function Card({ characterName, profilePictureUrl }: { characterName: string, profilePictureUrl: string }) {

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 flex flex-col justify-start items-center transition ease-in-out delay-50 hover:bg-blue-900 hover:text-white cursor-pointer">
      <Image
        src={profilePictureUrl}
        width={150}
        height={150}
        alt={characterName + "_picture"}
        priority
      />
      <div>{characterName}</div>
    </div>
  );
}
