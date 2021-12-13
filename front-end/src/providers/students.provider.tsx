import React, { useContext, useEffect, useState } from "react"
import { LoadState, useApi } from "shared/hooks/use-api"
import { Person } from "shared/models/person"

interface StudentContextI {
  students: Person[] | null
  setStudents: (students: Person[] | null) => void
  loadState: LoadState
}

export const StudentsContext = React.createContext<StudentContextI>({
  students: null,
  setStudents: (students) => {},
  loadState: "loading",
})

const StudentProvider: React.FC = ({ children }) => {
  const [students, setStudents] = useState<Person[] | null>(null)
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  useEffect(() => {
    let students = null
    if (data) {
      students = data.students.map((s) => ({ ...s, current_roll_state: "unmark" }))
    }
    setStudents(students as Person[])
  }, [data])

  return <StudentsContext.Provider value={{ students, setStudents: (students) => setStudents(students), loadState }}>{children}</StudentsContext.Provider>
}

export default StudentProvider

export const useStudentsContext = () => useContext(StudentsContext)
