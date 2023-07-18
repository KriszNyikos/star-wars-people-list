import Image from "next/image";

export default function Card({ characterName, index }: { characterName: string, index: number }) {

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 flex flex-col justify-start items-center transition ease-in-out delay-50 hover:bg-blue-900 hover:text-white cursor-pointer">
      <Image
        src={`https://picsum.photos/id/${index}/100/100`}
        width={150}
        height={150}
        alt={characterName + "_picture"}
        priority
      />
      <div>{characterName}</div>
    </div>
  );
}
