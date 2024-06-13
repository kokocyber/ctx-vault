"use client";

import { useEffect, useState, useContext, useRef } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "../(context)/UserContextComponent";
import toast from "react-hot-toast";
import {
  createCategory,
  createPassword,
  deleteCategory,
  deletePassword,
  fetchCurrentUserData,
  updateCategory,
  updatePassword,
  verifyCookie,
} from "../(util)/api";

const initialCategoriesData = {
  1: {
    id: 1,
    name: "Loading",
    userId: 0,
    passwords: [],
  },
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
  const { currentUserData, setCurrentUserData, isLoggedIn } =
    useContext(UserContext);
  const userId = useRef("");

  useEffect(() => {
    if (currentUserData.current !== "" || isLoggedIn) {
      setCategoriesData(currentUserData["user data"]);
      userId.current = currentUserData.id.user.id;
    }
  }, [currentUserData, isLoggedIn]);

  const [categoriesData, setCategoriesData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(initialCategoriesData)[0]
  );
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openAddPassword, setOpenAddPassword] = useState(false);

  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [openEditPassword, setOpenEditPassword] = useState(false);

  const [newCategory, setNewCategory] = useState("");
  const [newPassword, setNewPassword] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingPassword, setEditingPassword] = useState(null);

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

  const handleEditPasswordOpen = (password) => {
    setEditingPassword(password);
    setNewPassword(password);
    setOpenEditPassword(true);
  };

  const handleEditPasswordClose = () => {
    setOpenEditPassword(false);
    setEditingPassword(null);
  };

  const handleAddCategory = async () => {
    try {
      console.log(userId);
      const response = await createCategory(userId.current, newCategory);
      const newUserData = await verifyCookie();

      setCategoriesData(newUserData["user data"]);
    } catch (e) {
      toast.error("Failed adding category");
      console.error(e);
    }
    setNewCategory("");
    handleAddCategoryClose();
  };

  const handleAddPassword = async () => {
    try {
      const response = await createPassword(
        userId.current,
        categoriesData[selectedCategory].id,
        newPassword.name,
        newPassword.username,
        newPassword.password
      );

      const newUserData = await verifyCookie();
      setCategoriesData(newUserData["user data"]);
    } catch (e) {
      toast.error("Failed added password");
      console.error(e);
    }
    setNewPassword({ name: "", username: "", password: "" });
    handleAddPasswordClose();
  };

  const handleEditPassword = async () => {
    try {
      const response = await updatePassword(
        userId.current,
        editingPassword.id,
        newPassword.name,
        newPassword.username,
        newPassword.password
      );
      const newUserData = await verifyCookie();
      setCategoriesData(newUserData["user data"]);
    } catch (e) {
      toast.error("Failed editing password");
      console.error(e);
    }
    handleEditPasswordClose();
  };

  const handleDeletePassword = async (index) => {
    console.log(index, categoriesData[selectedCategory].passwords[index].id);
    try {
      const response = await deletePassword(
        userId.current,
        categoriesData[selectedCategory].passwords[index].id
      );

      const newUserData = await verifyCookie();
      setCategoriesData(newUserData["user data"]);
    } catch (e) {
      toast.error("Failed deleting password");
      console.error(e);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      const response = await updateCategory(
        categoriesData[selectedCategory].id,
        categoriesData[selectedCategory].userId,
        newCategory
      );
      const newUserData = await verifyCookie();

      setCategoriesData(newUserData["user data"]);
    } catch (e) {
      toast.error("Failed editing Category");
      console.error(e);
    }
    handleEditCategoryClose();
  };

  const handleDeleteCategory = async (category) => {
    try {
      const response = await deleteCategory(
        categoriesData[category].id,
        categoriesData[selectedCategory].userId
      );
      const newUserData = await verifyCookie();

      setCategoriesData(newUserData["user data"]);
    } catch (e) {
      toast.error("Failed deleting Category");
      console.error(e);
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
          {Object.keys(categoriesData).map((key) => {
            return (
              <ListItemHover
                key={key}
                button
                selected={key === selectedCategory}
                onClick={() => handleCategoryClick(key)}
              >
                <ListItemText primary={categoriesData[key].name} />
                <ActionButtons className="action-buttons">
                  <IconButton onClick={() => handleEditCategoryOpen(key)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCategory(key)}>
                    <DeleteIcon />
                  </IconButton>
                </ActionButtons>
              </ListItemHover>
            );
          })}
        </CategoryList>
      </FullHeightPaper>
      <Box style={{ flex: "1" }}>
        <TableBox>
          <ToolbarBox>
            <Typography variant="h6">{categoriesData[selectedCategory]?.name} Passwords</Typography>
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
                {categoriesData[selectedCategory]?.passwords.length > 0 ? (
                  categoriesData[selectedCategory]["passwords"].map(
                    (row, index) => (
                      <TableRowHover key={index}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.password}</TableCell>
                        <TableCell>
                          <ActionButtons className="action-buttons">
                            <IconButton
                              onClick={() => handleEditPasswordOpen(row)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeletePassword(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ActionButtons>
                        </TableCell>
                      </TableRowHover>
                    )
                  )
                ) : (
                  <TableRowHover>
                    <TableCell colSpan={4} align="center">
                      No passwords found.
                    </TableCell>
                  </TableRowHover>
                )}
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

      {/* Edit Password Dialog */}
      <Dialog open={openEditPassword} onClose={handleEditPasswordClose}>
        <DialogTitle>Edit Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new details for the password.
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
          <Button onClick={handleEditPasswordClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditPassword} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </FullHeightContainer>
  );
}
