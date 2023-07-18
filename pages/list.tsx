import { useEffect, useState, KeyboardEvent } from "react";
import Error from "next/error";
import Pagination from "@/app/components/pagination";
import Card from "../app/components/card";
import Head from "next/head";
import { useRouter } from "next/router";


export async function getServerSideProps({ query }: any) {
  //TODO move to separate file
  const { page, search } = query;
  let url = ""
  if(search){
    url = `https://swapi.dev/api/people?search=${search}&page=${page}`
  } else {
    url = `https://swapi.dev/api/people?page=${page}`
  }

  const response = await fetch(url);
  const errorCode = response.ok ? false : response.status;
  const peopleList = response.ok ? await response.json() : null;

  const props = {
    errorCode,
    peopleList,
    currentPage: parseInt(page) || 1,
    search: search || null
  };

  return { props: { ...props } };
}

export default function List({ errorCode, peopleList, currentPage, search }: any) {
  const router = useRouter()
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [paginationState, setPaginationState] = useState({
    count: 0,
    currentPage: 1,
  });


  const onPageChange = (page: number) => {
    const url = searchText ? `/list?search=${searchText}&page=${page}` : `/list?page=${page}`
    router.push(url)
    setIsLoading(true);
  };

  const onClickSubmit = () => {
    const url = searchText ? `/list?search=${searchText}&page=${1}` : `/list?page=${1}`
    router.push(url)
    setIsLoading(true);
  };


  useEffect(() => {
    setIsLoading(false);
    setPaginationState({
      ...paginationState,
      count: peopleList?.count,
      currentPage: currentPage,
    });
    if(search){
      setSearchText(search);
    }
    
  }, [peopleList, errorCode, search]);


  if (errorCode) return <Error statusCode={errorCode} />;

  return (
    <>
      <Head>
        <title>Star Wars Characters List</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
              <button onClick={onClickSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                Submit
              </button>

          </div>
          
          <div className="flex justify-center relative">
            {isLoading ? (
              <div
                role="status"
                className="absolute bg-blue-900 h-full w-full bg-opacity-60 flex justify-center items-center"
              >
                <svg
                  aria-hidden="true"
                  className="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : null}

            <div>
              <div className="flex flex-wrap">
                {peopleList
                  ? peopleList?.results?.map((person: any, index: number) => (
                      <div key={index}>
                        <Card characterName={person.name} index={index} />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            {
              peopleList && peopleList?.results?.length > 0 ? <Pagination
              count={paginationState.count}
              currentPage={paginationState.currentPage}
              onPageChange={onPageChange}
            /> : null
            }
            
          </div>
        </div>
      </main>
    </>
  );
}
