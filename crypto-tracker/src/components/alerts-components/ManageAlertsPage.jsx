import { ListItem, Stack, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { FixedSizeList } from "react-window";
import { UserContext } from "../../context/UserContext";

const ManageAlertsPage = () => {
  const useUserContext = useContext(UserContext);
  const { dispatchUserContext, alerts, portfolio } = useUserContext;
  return (
    <>
      <FixedSizeList
        itemData={alerts}
        itemCount={alerts.length}
        itemSize={60}
        overscanCount={5}
        height={600}
        width="100%"
      >
        {({ data, index, style }) => {
          return (
            <ListItem
              disablePadding
              key={index}
              divider
              sx={{ display: "flex", justifyContent: "flex-start" }}
              style={style}
            >
              <Stack direction="row">
                <Typography>{data[index].coinId}</Typography>
              </Stack>
            </ListItem>
          );
        }}
      </FixedSizeList>
    </>
  );
};

export default ManageAlertsPage;
