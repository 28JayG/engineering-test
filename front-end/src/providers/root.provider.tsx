import React from "react"
import SortProvider from "./sort.provider"
import StudentProvider from "./students.provider"

const RootProvider: React.FC = ({ children }) => {
  return (
    <SortProvider>
      <StudentProvider>{children}</StudentProvider>
    </SortProvider>
  )
}

export default RootProvider
