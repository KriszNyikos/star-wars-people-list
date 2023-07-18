
import { useEffect, useState } from "react";
import Error from "next/error";
import Pagination from "@/app/components/pagination";
import Card from '../app/components/card'

export async function getServerSideProps({ query }: any) {
  //TODO move to separate file
  const { page } = query;
  const response = await fetch(`https://swapi.dev/api/people?page=${page}`);
  const errorCode = response.ok ? false : response.status;
  const peopleList = response.ok ? await response.json() : null;

  const props = {
    errorCode,
    peopleList,
    currentPage: parseInt(page) || 1,
  };

  return { props: { ...props } };
}

export default function List({ errorCode, peopleList, currentPage, next, prev }: any) {
  const [isLoading, setIsLoading] = useState(false);

  const [paginationState, setPaginationState] = useState({
    count : 0,
    currentPage : 1,
  });

  const onPageChange = () => {
  setIsLoading(true);

}

  useEffect(() => {
    setIsLoading(false);
    setPaginationState({...paginationState, count : peopleList?.count, currentPage: currentPage})
  }, [peopleList, errorCode]);

  if (errorCode) return <Error statusCode={errorCode} />;

  return (
    <div>
      <h1>List</h1>
      <div>{isLoading ? "Loading..." : null}</div>
      {peopleList
        ? peopleList?.results?.map((person: any) => (
            <div key={person.name}>
                <Card characterName={person.name}/>
            </div>
          ))
        : null}

      <Pagination count={paginationState.count} currentPage={paginationState.currentPage} onPageChange={onPageChange}/>
    </div>
  );
}
