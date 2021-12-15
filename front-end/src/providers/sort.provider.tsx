import React, { useState } from "react"
import { RolllStateType } from "shared/models/roll"

interface SortContextI {
  selectedRollState: RolllStateType | ""
  setSelectedRollState: (rollState: RolllStateType | '') => void
}

export const SortContext = React.createContext<SortContextI>({
  selectedRollState: "",
  setSelectedRollState: (rollState) => {},
})

const SortProvider: React.FC = ({ children }) => {
  const [rollState, setRollState] = useState<RolllStateType | "">("")

  return (
    <SortContext.Provider
      value={{
        selectedRollState: rollState,
        setSelectedRollState: (rollState) => setRollState(rollState),
      }}
    >
      {children}
    </SortContext.Provider>
  )
}

export default SortProvider
export const useSortContext = () => React.useContext(SortContext)
