import { Person, PersonHelper } from "shared/models/person"

export const getSearchStudents = (searchVale: string, data: Person[]) => {
  const searchRegex = new RegExp(searchVale, "i")
  return data.filter((student) => searchRegex.test(PersonHelper.getFullName(student)))
}
