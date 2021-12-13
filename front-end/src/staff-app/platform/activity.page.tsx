import React, { useEffect } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { Activity } from "shared/models/activity"
import { useApi } from "shared/hooks/use-api"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const ActivityPage: React.FC = () => {
  const [getActivities, data, loadState] = useApi<{ activity: Activity[] }>({ url: "get-activities" })

  useEffect(() => {
    void getActivities()
  }, [getActivities])

  console.log({ data: data?.activity })

  return (
    <S.Container>
      {loadState == "loading" && (
        <CenteredContainer>
          <FontAwesomeIcon icon="spinner" size={"2x"} spin />
        </CenteredContainer>
      )}
      {loadState == "loaded" && data?.activity && (
        <CenteredContainer>
          {data.activity.map((a) => (
            <div>{a.entity.name}</div>
          ))}
        </CenteredContainer>
      )}
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 0;
  `,
}
