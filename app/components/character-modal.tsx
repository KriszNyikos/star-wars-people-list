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
    <div className="absolute bg-slate-700/50 w-full h-screen top-0 left-0 flex justify-center items-center ">
      {isLoading && <LoadingSpinner />}
      {characterModalProps && (
        <div className="w-2/6 h-4/6 rounded bg-white flex flex-col justify-between p-3">
          <div>
            <h1 className="mb-4 text-4xl font-extrabold block text-center">
              {characterModalProps.name}
            </h1>

            <div className="mb-4"> <span className="font-semibold"> Height:</span> {characterModalProps.height}</div>

            <div className="mb-4"><span className="font-semibold"> Mass: </span> {characterModalProps.mass}</div>

            <div className="mb-4">
            <span className="font-semibold"> Birth year</span> {characterModalProps.birtnYear}
            </div>

            <div className="mb-4">
               <span className="font-semibold"> Count of films </span> {characterModalProps.countOfFilms}
            </div>

            <div className="mb-4 ">
            <span className="font-semibold"> Homeworld Planet </span>
              {characterModalProps.homeWorldData && (
                <div className="pl-4 pt-1">
                  <div className="mb-4">
                    <span className="font-semibold"> name </span>
                     {characterModalProps.homeWorldData.name}
                  </div>

                  <div className="mb-4">
                  <span className="font-semibold"> terrain </span>
                    {characterModalProps.homeWorldData.terrain}
                  </div>

                  <div className="mb-4">
                  <span className="font-semibold"> climate </span>
                     {characterModalProps.homeWorldData.climate}
                  </div>
                </div>
              )}{" "}
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            onClick={onClose}
          >
            <h1>Close</h1>
          </button>
        </div>
      )}
    </div>
  );
}
