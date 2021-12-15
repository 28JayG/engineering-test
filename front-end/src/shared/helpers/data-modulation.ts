import { NameSortType } from "shared/enums/sort.enums"
import { Person, PersonHelper } from "shared/models/person"
import { RolllStateType } from "shared/models/roll"

export const getSearchStudents = (searchVale: string, data: Person[]) => {
  // create a regex expresion of search value
  const searchRegex = new RegExp(searchVale, "i")
  // filter students with matching fullname
  return data.filter((student) => searchRegex.test(PersonHelper.getFullName(student)))
}

//sort accorting to first name or last name;
export type nameSortFactorType = NameSortType.FirstName | NameSortType.LastName
//sort asending or decending
export type sortType = -1 | 1

export const sortStudents = (sortType: sortType, sortFactor: nameSortFactorType, data: Person[], rollState: RolllStateType | "", searchValue: string) => {
  //get searched students and then sort
  const searchResult = getSearchStudents(searchValue, data)
  const rollStateSortedStudnets = rollState ? searchResult.filter((s) => s.current_roll_state === rollState) : [...searchResult]

  switch (sortFactor) {
    case "first-name":
      return rollStateSortedStudnets.sort((a, b) => a.first_name.localeCompare(b.first_name) * sortType)
    case "last-name":
      return rollStateSortedStudnets.sort((a, b) => a.last_name.localeCompare(b.last_name) * sortType)
  }
}
