import React, { useState } from "react";
import {
  TextField,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const AutocompleteTextField = ({ passwords, categories }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPasswords, setFilteredPasswords] = useState([]);

  const handleInputChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === "") {
      setFilteredPasswords([]);
    } else {
      const filtered = passwords.filter(
        (password) =>
          password.username.toLowerCase().includes(term) ||
          password.name.toLowerCase().includes(term)
      );
      setFilteredPasswords(filtered);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (item) => {
    // Handle click on list item (e.g., navigate to details page)
    console.log("Selected item:", item);
    setOpen(false);
  };

  return (
    <>
      <TextField
        label="Search Passwords"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Popper
        open={open}
        anchorEl={null}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Paper>
            {filteredPasswords.length > 0 ? (
              <List>
                {filteredPasswords.map((password) => (
                  <ListItem
                    key={password.id}
                    button
                    onClick={() => handleListItemClick(password)}
                  >
                    <ListItemText
                      primary={password.username}
                      secondary={password.name}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography sx={{ p: 2 }}>No matching passwords found</Typography>
            )}
          </Paper>
        )}
      </Popper>
    </>
  );
};

export default AutocompleteTextField;
