import Image from "next/image";

export default function Card({ characterName }: { characterName: string }) {
  const imageLoader = () => {
    // It is necessary for the random generated avatars
    const id = Math.floor(Math.random() * 100);
    return `https://picsum.photos/id/${id}/100/100`;
  };
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 flex flex-col justify-start items-center transition ease-in-out delay-50 hover:bg-blue-900 hover:text-white cursor-pointer">
      <Image
        loader={imageLoader}
        src="https://picsum.photos/150/150"
        width={150}
        height={150}
        alt={characterName + "_picture"}
        priority
      />
      <div>{characterName}</div>
    </div>
  );
}
