import {
  Box,
  Divider,
  IconButton,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material/";
import React from "react";
import { useContext } from "react";
import { FixedSizeList } from "react-window";
import { AppContext } from "../../context/AppContext";
import { DataContext } from "../../context/DataContext";
import { UserContext } from "../../context/UserContext";
import {
  currencyFormatter,
  numberFormatter,
} from "../../utils/numberFormatters";

const NotificationsPage = () => {
  const useUserContext = useContext(UserContext);
  const { activatedAlerts, dispatchUserContext } = useUserContext;
  const useDataContext = useContext(DataContext);
  const { coinPrices } = useDataContext;
  const useAppContext = useContext(AppContext);
  const { settings } = useAppContext;

  const handleCloseAlert = (alertId) => {
    dispatchUserContext({
      type: "removeActivatedAlert",
      payload: alertId,
    });
  };

  if (activatedAlerts.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        data-test="notifications-page"
      >
        <Typography>No Notifications</Typography>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          "& ::-webkit-scrollbar": {
            width: "0.4em",
          },
          "& ::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "& ::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
            outline: "1px solid slategrey",
            borderRadius: "5px",
          },
        }}
        data-test="notifications-page"
      >
        <FixedSizeList
          itemData={activatedAlerts}
          itemCount={activatedAlerts.length}
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
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
                style={style}
                data-test="activated-alert"
              >
                <Stack
                  direction="row"
                  spacing={3}
                  width="100%"
                  height="100%"
                  alignItems="center"
                >
                  <IconButton
                    size="small"
                    color="inherit"
                    sx={{ ml: "1rem" }}
                    onClick={() => handleCloseAlert(data[index].id)}
                    data-test="close-activated-alert"
                  >
                    <Close color="warning" />
                  </IconButton>
                  <Typography
                    variant="body2"
                    data-test="activated-alert-message"
                  >
                    {`${data[index].coinName} is now ${data[index].type} than ${
                      settings.activeCurrency.symbol
                    }${currencyFormatter(
                      data[index].targetPrice
                    )}. The current price is ${
                      settings.activeCurrency.symbol
                    }${currencyFormatter(coinPrices[data[index].coinId])}`}
                  </Typography>
                </Stack>
                <Divider variant="middle" sx={{ bgcolor: "text.secondary" }} />
              </ListItem>
            );
          }}
        </FixedSizeList>
      </Box>
    );
  }
};

export default NotificationsPage;
