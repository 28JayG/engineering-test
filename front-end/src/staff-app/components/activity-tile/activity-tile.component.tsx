import React from "react"
import { Activity } from "shared/models/activity"
import { Colors } from "shared/styles/colors"
import { BorderRadius, FontWeight, Spacing } from "shared/styles/styles"
import styled from "styled-components"

interface Props {
  activity: Activity
}

const ActivityTile: React.FC<Props> = ({ activity }) => {
  const [showStudents, setShowStudents] = React.useState<boolean>(false)

  const { name, student_roll_states } = activity.entity

  const toggleShowStudents = () => setShowStudents(!showStudents)

  return (
    <>
      <S.Container onClick={toggleShowStudents}>
        <S.Content>Name: {name}</S.Content>
        <S.Content>Type: {activity.type}</S.Content>
        <S.Content>Total Students: {student_roll_states.length}</S.Content>
      </S.Container>

      {showStudents && (
        <S.StudentsListContainer>
          {student_roll_states.map((rollState) => (
            <S.RollState key={rollState.student_id}>
              id:{rollState.student_id} - roll: {rollState.roll_state}
            </S.RollState>
          ))}
        </S.StudentsListContainer>
      )}
    </>
  )
}

const S = {
  Container: styled.div`
    margin-top: ${Spacing.u3};
    padding-right: ${Spacing.u2};
    cursor: pointer;
    display: flex;
    height: 60px;
    aling-items: center;
    justify-content: center;
    border-radius: ${BorderRadius.default};
    background-color: #fff;
    box-shadow: 0 2px 7px rgba(5, 66, 145, 0.13);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 2px 7px rgba(5, 66, 145, 0.26);
    }
  `,

  Content: styled.div`
    flex-grow: 1;
    padding: ${Spacing.u2};
    color: ${Colors.dark.base};
    font-weight: ${FontWeight.strong};
  `,

  StudentsListContainer: styled.div`
    margin-top: ${Spacing.u3};
    padding-right: ${Spacing.u2};
    display: grid;
    grid-template-columns: auto auto;
    gap: ${Spacing.u3};
    padding: ${Spacing.u3};
    aling-items: center;
    justify-content: center;
    border-radius: ${BorderRadius.default};
    background-color: #fff;
    box-shadow: 0 2px 7px rgba(5, 66, 145, 0.13);
  `,

  RollState: styled.div`
    border-radius: ${BorderRadius.default};
    padding: ${Spacing.u2};
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.2);
  `,
}

export default ActivityTile
