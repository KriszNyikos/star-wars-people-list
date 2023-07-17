import Link from "next/link";
import { useEffect, useState } from "react";
import Error from "next/error";
import Pagination from "@/app/components/pagination";

export async function getServerSideProps({ query }: any) {
  //TODO move to separate file
  const { page } = query;
  const response = await fetch( `https://swapi.dev/api/people?page=${page}`)
  console.log('response', response.ok)
  const errorCode = response.ok ? false : response.status;
  const peopleList = response.ok ? await response.json() : null;

  const props =  {
    errorCode,
    peopleList
  }

  return { props: {...props} };
}

export default function List({ errorCode, peopleList }: any) {
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    console.log('Emit', errorCode, peopleList)
    setIsLoading(false);
  }, [peopleList, errorCode]);

  if(errorCode) return <Error statusCode={errorCode} />

  return (
    <div>
      <h1>List</h1>
      <div>{isLoading ? "Loading..." : null}</div>
      <Link href="/list?page=1" onClick={() => setIsLoading(true)}>
        1
      </Link>
      <Link href="/list?page=2" onClick={() => setIsLoading(true)}>
        2
      </Link>
      <Link href="/list?page=3" onClick={() => setIsLoading(true)}>
        3
      </Link>

      {peopleList
        ? peopleList?.results?.map((person: any) => (
            <div key={person.name}>{person.name}</div>
          ))
        : null}

    <Pagination/>
    </div>
  );
}
