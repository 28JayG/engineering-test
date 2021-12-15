import React, { useEffect } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { Activity } from "shared/models/activity"
import { useApi } from "shared/hooks/use-api"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ActivityTile from "staff-app/components/activity-tile/activity-tile.component"

export const ActivityPage: React.FC = () => {
  const [getActivities, data, loadState] = useApi<{ activity: Activity[] }>({ url: "get-activities" })

  useEffect(() => {
    void getActivities()
  }, [getActivities])

  console.log({ data: data?.activity })

  return (
    <S.PageContainer>
      {loadState === "loading" && (
        <CenteredContainer>
          <FontAwesomeIcon icon="spinner" size={"2x"} spin />
        </CenteredContainer>
      )}

      {loadState === "loaded" && data?.activity && (
        <CenteredContainer>
          {data.activity.map((a) => (
            <ActivityTile activity={a} key={a.entity.id} />
          ))}
        </CenteredContainer>
      )}

      {loadState === "error" && <CenteredContainer>There was error in loading activities</CenteredContainer>}
    </S.PageContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
}
