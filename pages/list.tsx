import { useEffect, useState, KeyboardEvent } from "react";
import Error from "next/error";
import Pagination from "@/app/components/pagination";
import Card from "../app/components/card";
import Head from "next/head";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";
import { CharacterModal } from "@/app/components/character-modal";
import LoadingSpinner from "@/app/components/loading-spinner";

interface modalData {
  isOpen: boolean;
  characterUrl: string;
}

interface characterListData {
  totalCount: number;
  characterList: {
    name: string;
    url: string;
    profilePictureUrl: string;
  };
}

//TODO move to other file
const mapApiResponseTocharacterListData = (
  apiResponse: any
): characterListData => {
  return {
    totalCount: apiResponse.count,
    characterList: apiResponse.results.map((character: any, index: number) => {
      return {
        name: character.name,
        url: character.url,
        profilePictureUrl: `https://picsum.photos/id/${index + 1}/100/100`,
      };
    }),
  };
};

export async function getServerSideProps({ query }: any) {
  //TODO move to separate file
  const { page, search } = query;
  let url = "";
  if (search) {
    url = `https://swapi.dev/api/people?search=${search}&page=${page}`;
  } else {
    url = `https://swapi.dev/api/people?page=${page}`;
  }

  const response = await fetch(url);
  const errorCode = response.ok ? false : response.status;
  const characterListData = response.ok
    ? await response.json().then(mapApiResponseTocharacterListData)
    : null;
  const props = {
    errorCode,
    characterListData,
    currentPage: parseInt(page) || 1,
    search: search || null,
  };

  return { props: { ...props } };
}

export default function List({
  errorCode,
  characterListData,
  currentPage,
  search,
}: any) {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [paginationState, setPaginationState] = useState({
    count: 0,
    currentPage: 1,
  });

  const [modalData, setModalData] = useState<modalData>({
    isOpen: false,
    characterUrl: "",
  });

  const onPageChange = (page: number) => {
    const url = searchText
      ? `/list?search=${searchText}&page=${page}`
      : `/list?page=${page}`;
    router.push(url);
    setIsLoading(true);
  };

  const onClickSubmit = () => {
    const url = searchText
      ? `/list?search=${searchText}&page=${1}`
      : `/list?page=${1}`;
    router.push(url);
    setIsLoading(true);
  };

  const onClosModalHandle = () => {
    setModalData({ isOpen: false, characterUrl: "" });
  };

  const onOpenModalHandle = (url: string) => {
    setModalData({ isOpen: true, characterUrl: url });
  };

  useEffect(() => {
    setIsLoading(false);
    setPaginationState({
      ...paginationState,
      count: characterListData?.totalCount,
      currentPage: currentPage,
    });
    if (search) {
      setSearchText(search);
    }
  }, [characterListData, errorCode, search]);

  if (errorCode) return <Error statusCode={errorCode} />;

  return (
    <>
      <Head>
        <title>Star Wars Characters List</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
        {modalData.isOpen &&
          createPortal(
            <CharacterModal
              characterUrl={modalData.characterUrl}
              onClose={onClosModalHandle}
            />,
            document.body
          )}
        <div className="container h-100">
          <div>
            <input
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              value={searchText}
              name="character_name"
              className="bg-gray-50 border border-gray-700 text-gray-900 focus:outline-none text-sm rounded-lg block w-1/5 p-2.5 "
              placeholder="Character name"
            />
            <button
              onClick={onClickSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              Submit
            </button>
          </div>

          <div className="flex justify-center relative">
            {isLoading ? <LoadingSpinner/> : null}
            <div>
              <div className="flex flex-wrap">
                {characterListData
                  ? characterListData?.characterList.map((person: any, index: number) => (
                      <div
                        key={index}
                        onClick={() => onOpenModalHandle(person.url)}
                      >
                        <Card
                          characterName={person.name}
                          profilePictureUrl={person.profilePictureUrl}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            {characterListData && characterListData.characterList?.length > 0 ? (
              <Pagination
                count={paginationState.count}
                currentPage={paginationState.currentPage}
                onPageChange={onPageChange}
              />
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
}
