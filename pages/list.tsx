import { useEffect, useState, KeyboardEvent } from "react";
import Error from "next/error";
import Pagination from "@/app/components/pagination";
import Card from "../app/components/card";
import Head from "next/head";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";
import { CharacterModal } from "@/app/components/character-modal";
import LoadingSpinner from "@/app/components/loading-spinner";

import { getPeopleList } from "@/lib/people";
import { ModalData } from "@/interfaces/ModalData";
import { getFilmDrowDownList } from "@/lib/films";
import { getPlanetDropDownList } from "@/lib/planets";
import { DropDownSelector } from "@/app/components/dropdownSelector";

export async function getServerSideProps({ query }: any) {
  const props = await getPeopleList(query);
  const films = {
    filmsOptions: await getFilmDrowDownList(),
  };
  const planets = { planetOptions: await getPlanetDropDownList() };
  return { props: { ...props, ...films, ...planets } };
}

export default function List({
  errorCode,
  characterListData,
  currentPage,
  search,
  filmsOptions,
  planetOptions,
}: any) {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [selectedFilmId, setSelectedFilmId] = useState("");
  const [selectedPlanetId, setSelectedPlanetId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [paginationState, setPaginationState] = useState({
    count: 0,
    currentPage: 1,
  });

  const [modalData, setModalData] = useState<ModalData>({
    isOpen: false,
    characterUrl: "",
  });

  const navigateToPage = (
    page: number,
    text?: string,
    planetId?: string,
    filmId?: string
  ) => {
    const baseUrl = "/list?";
    let urlSections = [];

    if (text) {
      urlSections.push(`search=${text}`);
    }

    if (planetId) {
      urlSections.push(`planet=${planetId}`);
    }

    if (filmId) {
      urlSections.push(`film=${filmId}`);
    }

    urlSections.push(`page=${page}`);

    if (urlSections.length > 1) {
      const url = baseUrl + urlSections.join("&");
      router.push(url);
    } else {
      const url = baseUrl + `page=${page}`;
      router.push(url);
    }

    setIsLoading(true);
  };

  const onPageChange = (page: number) => {
    navigateToPage(page, searchText, selectedPlanetId, selectedFilmId);
  };

  const onClickSubmit = () => {
    navigateToPage(1, searchText, selectedPlanetId, selectedFilmId);
  };

  const onClosModalHandle = () => {
    setModalData({ isOpen: false, characterUrl: "" });
  };

  const onOpenModalHandle = (url: string) => {
    setModalData({ isOpen: true, characterUrl: url });
  };

  const onFilmDropdownChange = (value: string) => {
    setSelectedFilmId(value);
  };
  const onPlanetDropdownChange = (value: string) => {
    setSelectedPlanetId(value);
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
      <main className="flex min-h-screen flex-col items-center justify-between p-24 relative bg-slate-500">
        {modalData.isOpen &&
          createPortal(
            <CharacterModal
              characterUrl={modalData.characterUrl}
              onClose={onClosModalHandle}
            />,
            document.body
          )}
        <div className="container h-100 bg-slate-300 rounded-md p-3">
          <div className="flex justify-between items-center">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              value={searchText}
              name="character_name"
              className="bg-gray-50 border border-gray-700 text-gray-900 focus:outline-none text-sm rounded-lg block w-1/5 p-2.5 "
              placeholder="Character name"
            />

            <div className="mr-2">
              <DropDownSelector
                type="films"
                items={filmsOptions}
                onChange={onFilmDropdownChange}
              />
            </div>

            <div>
              <DropDownSelector
                type="planets"
                items={planetOptions}
                onChange={onPlanetDropdownChange}
              />
            </div>

            <button
              onClick={onClickSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              Submit
            </button>
          </div>

          <div className="flex justify-center relative rounded-md mt-2 mb-2">
            {isLoading ? <LoadingSpinner /> : null}
            <div>
              <div className="flex flex-wrap">
                {characterListData
                  ? characterListData?.characterList.map(
                      (person: any, index: number) => (
                        <div
                          key={index}
                          onClick={() => onOpenModalHandle(person.url)}
                        >
                          <Card
                            characterName={person.name}
                            profilePictureUrl={person.profilePictureUrl}
                          />
                        </div>
                      )
                    )
                  : null}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            {characterListData &&
            characterListData.characterList?.length > 0 ? (
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
