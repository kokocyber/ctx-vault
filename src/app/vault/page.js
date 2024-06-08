"use client";

import { useState } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const initialCategoriesData = {
  Email: [
    { name: "Gmail", username: "user@gmail.com", password: "password123" },
    { name: "Yahoo", username: "user@yahoo.com", password: "password123" },
  ],
  "Social Media": [
    {
      name: "Facebook",
      username: "user@facebook.com",
      password: "password123",
    },
    { name: "Twitter", username: "user@twitter.com", password: "password123" },
  ],
  Banking: [
    {
      name: "Bank of America",
      username: "user@boa.com",
      password: "password123",
    },
    { name: "Chase", username: "user@chase.com", password: "password123" },
  ],
};

const FullHeightContainer = styled(Container)({
  height: "100vh",
  display: "flex",
  flexDirection: "row",
  padding: 0,
});

const FullHeightPaper = styled(Paper)({
  height: "100%",
  marginRight: "8px",
});

const CategoryList = styled(List)({
  height: "100%",
  width: "100%",
  overflow: "auto",
});

const ListItemHover = styled(ListItem)({
  "&:hover .action-buttons": {
    visibility: "visible",
  },
});

const ActionButtons = styled(Box)({
  visibility: "hidden",
  display: "flex",
});

const TableBox = styled(Box)({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

const ToolbarBox = styled(Box)({
  padding: "8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const TableRowHover = styled(TableRow)({
  "&:hover .action-buttons": {
    visibility: "visible",
  },
});

export default function Home() {
  const [categoriesData, setCategoriesData] = useState(initialCategoriesData);
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(categoriesData)[0]
  );
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openAddPassword, setOpenAddPassword] = useState(false);
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newPassword, setNewPassword] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [editingCategory, setEditingCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddCategoryOpen = () => {
    setOpenAddCategory(true);
  };

  const handleAddCategoryClose = () => {
    setOpenAddCategory(false);
  };

  const handleAddPasswordOpen = () => {
    setOpenAddPassword(true);
  };

  const handleAddPasswordClose = () => {
    setOpenAddPassword(false);
  };

  const handleEditCategoryOpen = (category) => {
    setEditingCategory(category);
    setNewCategory(category);
    setOpenEditCategory(true);
  };

  const handleEditCategoryClose = () => {
    setOpenEditCategory(false);
    setEditingCategory(null);
  };

  const handleAddCategory = () => {
    setCategoriesData({ ...categoriesData, [newCategory]: [] });
    setNewCategory("");
    handleAddCategoryClose();
  };

  const handleAddPassword = () => {
    const updatedPasswords = [...categoriesData[selectedCategory], newPassword];
    setCategoriesData({
      ...categoriesData,
      [selectedCategory]: updatedPasswords,
    });
    setNewPassword({ name: "", username: "", password: "" });
    handleAddPasswordClose();
  };

  const handleEditPassword = (index, updatedPassword) => {
    const updatedPasswords = categoriesData[selectedCategory].map(
      (password, i) => (i === index ? updatedPassword : password)
    );
    setCategoriesData({
      ...categoriesData,
      [selectedCategory]: updatedPasswords,
    });
  };

  const handleDeletePassword = (index) => {
    const updatedPasswords = categoriesData[selectedCategory].filter(
      (_, i) => i !== index
    );
    setCategoriesData({
      ...categoriesData,
      [selectedCategory]: updatedPasswords,
    });
  };

  const handleUpdateCategory = () => {
    const updatedCategories = { ...categoriesData };
    if (editingCategory !== newCategory && newCategory) {
      updatedCategories[newCategory] = updatedCategories[editingCategory];
      delete updatedCategories[editingCategory];
      setSelectedCategory(newCategory);
    }
    setCategoriesData(updatedCategories);
    handleEditCategoryClose();
  };

  const handleDeleteCategory = (category) => {
    const updatedCategories = { ...categoriesData };
    delete updatedCategories[category];
    setCategoriesData(updatedCategories);
    if (category === selectedCategory) {
      setSelectedCategory(Object.keys(updatedCategories)[0] || "");
    }
  };

  return (
    <FullHeightContainer>
      <FullHeightPaper style={{ flex: "0 0 25%" }}>
        <Box padding={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCategoryOpen}
          >
            Add Category
          </Button>
        </Box>
        <CategoryList>
          {Object.keys(categoriesData).map((category) => (
            <ListItemHover
              key={category}
              button
              selected={category === selectedCategory}
              onClick={() => handleCategoryClick(category)}
            >
              <ListItemText primary={category} />
              <ActionButtons className="action-buttons">
                <IconButton onClick={() => handleEditCategoryOpen(category)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteCategory(category)}>
                  <DeleteIcon />
                </IconButton>
              </ActionButtons>
            </ListItemHover>
          ))}
        </CategoryList>
      </FullHeightPaper>
      <Box style={{ flex: "1" }}>
        <TableBox>
          <ToolbarBox>
            <Typography variant="h6">{selectedCategory} Passwords</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddPasswordOpen}
            >
              Add Password
            </Button>
          </ToolbarBox>
          <TableContainer
            component={Paper}
            style={{ flex: 1, overflow: "auto" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoriesData[selectedCategory].map((row, index) => (
                  <TableRowHover key={index}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.password}</TableCell>
                    <TableCell>
                      <ActionButtons className="action-buttons">
                        <IconButton
                          onClick={() => handleEditPassword(index, row)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeletePassword(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </ActionButtons>
                    </TableCell>
                  </TableRowHover>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableBox>
      </Box>

      {/* Dialogs */}
      <Dialog open={openAddCategory} onClose={handleAddCategoryClose}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the new category.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddCategoryClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddCategory} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={openEditCategory} onClose={handleEditCategoryClose}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new name for the category.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCategoryClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateCategory} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Password Dialog */}
      <Dialog open={openAddPassword} onClose={handleAddPasswordClose}>
        <DialogTitle>Add New Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details of the new password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newPassword.name}
            onChange={(e) =>
              setNewPassword({ ...newPassword, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Username"
            fullWidth
            value={newPassword.username}
            onChange={(e) =>
              setNewPassword({ ...newPassword, username: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Password"
            fullWidth
            value={newPassword.password}
            onChange={(e) =>
              setNewPassword({ ...newPassword, password: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddPasswordClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddPassword} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </FullHeightContainer>
  );
}
