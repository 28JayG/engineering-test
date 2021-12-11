import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { sortStudents, sortType } from "shared/helpers/data-modulation"
import { MenuItem, Select } from "@material-ui/core"
import { NameSortType } from "shared/enums/sort.enums"

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [aplhaSortType, setAplhSort] = useState<sortType>(1)
  const [nameSortType, setNameSortType] = useState(NameSortType.FirstName)
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  const onToolbarAction = (action: ToolbarAction, sortAction?: SortAction) => {
    if (action === "roll") {
      setIsRollMode(true)
    }

    if (action === "sort" && sortAction === "aplha") {
      toggleAlphaSort()
    }

    if (action === "sort" && sortAction === NameSortType.FirstName) {
      setNameSortType(NameSortType.FirstName)
    }

    if (action === "sort" && sortAction === NameSortType.LastName) {
      setNameSortType(NameSortType.LastName)
    }
  }

  const toggleAlphaSort = () => {
    setAplhSort(aplhaSortType === -1 ? 1 : -1)
  }

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false)
    }
  }

  const onSearchInput = (value: string) => {
    //set search value
    setSearchValue(value)
  }

  return (
    <>
      <S.PageContainer>
        <Toolbar sortType={aplhaSortType} onSearchInput={onSearchInput} onItemClick={onToolbarAction} />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && data?.students && (
          <>
            {sortStudents(aplhaSortType, nameSortType, data.students, searchValue)?.map((s) => (
              <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />
            ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} />
    </>
  )
}

type ToolbarAction = "roll" | "sort"
type SortAction = "aplha" | "first-name" | "last-name"

interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: SortAction) => void
  onSearchInput: (value: string) => void
  sortType: sortType
}
const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick, onSearchInput, sortType } = props
  return (
    <S.ToolbarContainer>
      <div>
        <S.Select style={{ color: "white" }} defaultValue={NameSortType.FirstName} onChange={(evt) => onItemClick("sort", evt.target.value as SortAction)}>
          <MenuItem value={NameSortType.FirstName}>First Name</MenuItem>
          <MenuItem value={NameSortType.LastName}>Last Name</MenuItem>
        </S.Select>
        <FontAwesomeIcon cursor="pointer" size="1x" onClick={() => onItemClick("sort", "aplha")} icon={sortType === 1 ? "sort-alpha-up" : "sort-alpha-down"} />
      </div>
      <div>
        <S.Input onChange={(evt) => onSearchInput(evt.target.value)} placeholder="Search" />
      </div>
      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
  Input: styled.input`
    padding: ${Spacing.u1};
    border-radius: ${BorderRadius.default};
  `,

  Select: styled(Select)`
    && {
      margin: 0 20px;
    }
  `,
}
