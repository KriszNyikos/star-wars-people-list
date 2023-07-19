interface CharacterListData {
    totalCount: number;
    characterList: {
      name: string;
      url: string;
      profilePictureUrl: string;
    };
  }
  

export const mapApiResponseTocharacterListData = (
  apiResponse: any
): CharacterListData => {
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