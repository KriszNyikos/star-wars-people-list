const idPattern = /\/(\d+)\/$/

export const getIdFromUrl = (url: string) => {
  const match = url.match(idPattern)
  return match ? match[1] : ""
}