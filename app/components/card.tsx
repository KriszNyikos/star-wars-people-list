import Image from "next/image";

export default function Card({ characterName }: { characterName: string }) {
  const imageLoader = () => {  // It is necessary for the random generated avatars
    const id = Math.floor( Math.random() * 100)
    return `https://picsum.photos/id/${id}/100/100`;
  };
  return (
    <div>
      <Image
        loader={imageLoader}
        src="https://picsum.photos/100/100"
        width={100}
        height={100}
        alt={characterName + "_picture"}
        priority
      />
      character name {characterName}
    </div>
  );
}
