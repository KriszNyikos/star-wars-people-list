import { useEffect, useState } from "react";
import LoadingSpinner from "./loading-spinner";
import { mapApiResponseToCharacterModalProps } from "@/lib/modal";
import { CharacterModalProps } from "@/interfaces/CharacterModalProps";

export function CharacterModal({
  characterUrl,
  onClose,
}: {
  characterUrl: string;
  onClose: () => void;
}) {
  useEffect(() => {
    setIsLoading(true);
    fetch(characterUrl)
      .then((res) => res.json())
      .then(async (res) => {
        setCharacterModalProps(await mapApiResponseToCharacterModalProps(res));
        setIsLoading(false);
      });

  }, [characterUrl]);

  const [characterModalProps, setCharacterModalProps] = useState<
    CharacterModalProps | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="absolute bg-slate-700/50 w-full h-full top-0 left-0 flex justify-center items-center">
      {isLoading && <LoadingSpinner/>}
      {characterModalProps && (
        <div className="w-2/6 h-5/6 rounded bg-white">
          <div>{characterModalProps.name}</div>

          <div>Height: {characterModalProps.height}</div>

          <div>Mass: {characterModalProps.mass}</div>

          <div>BirthYear {characterModalProps.birtnYear}</div>

          <div> Count of films {characterModalProps.countOfFilms}</div>

          <div>Homeworld Data {
            characterModalProps.homeWorldData && <div>
              {JSON.stringify(characterModalProps.homeWorldData)}
            </div>
            } </div>
          <button onClick={onClose}>
            <h1>Close</h1>
          </button>
        </div>
      )}
    </div>
  );
}
