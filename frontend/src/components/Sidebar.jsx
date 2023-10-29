import React from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { theme } from "../App";
import { useTheme } from "@mui/material/styles";

function Sidebar() {
  return (
    <div style={{ backgroundColor: theme.palette.primary.main }}>
      <Box sx={{ width: "250px", height: "100vh", bgcolor: "grey.800" }}>
        <List component="nav">
          <ListItem button>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Settings" />
          </ListItem>
          {/* Add more ListItems as needed */}
        </List>
      </Box>
    </div>
  );
}

export default Sidebar;
