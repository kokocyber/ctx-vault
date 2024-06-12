"use client";

import { useState, useEffect, Suspense } from "react";
import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../(util)/api";

import { UserContext } from "../(context)/UserContextComponent";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useRef } from "react";

const FullHeightContainer = styled(Container)({
  height: "100vh",
  display: "flex",
  flexDirection: "row",
  padding: 0,
});

const FullHeightPaper = styled(Paper)({
  height: "60%",
  marginRight: "8px",
});

const CategoryList = styled(List)({
  height: "60%",
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
  height: "60%",
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
  const { isUserLoggedIn, userData } = useContext(UserContext);
  const router = useRouter();

  const userId = useRef("")

  const [categoriesData, setCategoriesData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
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

  useEffect(() => {
    console.log(userData.current, isUserLoggedIn)
    if (!isUserLoggedIn || userData.current === "") {
      toast.error("You are not logged in");
      router.push("/");
    } else {
      userId.current = userData.current.id.user.id
    }
  }, []);

/*
  useEffect(() => {
    async function loadCategories() {
      try {
        const categories = await fetchCategories(userId);
        console.log("fetched categories", categories);
        const categoriesObj = categories.reduce((acc, category) => {
          acc[category.name] = [];
          return acc;
        }, {});
        setCategoriesData(categoriesObj);
        if (categories.length > 0) {
          setSelectedCategory(categories[0].name);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadCategories();
  }, [userId]);
*/

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

  const handleAddCategory = async () => {
    try {
      console.log(userId.current, newCategory)
      const createdCategory = await createCategory(userId.current, newCategory)

      setCategoriesData({ ...categoriesData, [createdCategory.id]: { [createdCategory.name]: [] } });
      setNewCategory("");
      handleAddCategoryClose();

    } catch(e) {
      toast.error("Failed Adding Category")
      console.error({"Error": e})
    }
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

  const handleUpdateCategory = async () => {
    try {
      console.log(newCategory)
      const updatedCategory = await updateCategory(
        selectedCategory,
        userId.current,
        newCategory
      );
      const updatedCategories = { ...categoriesData };
      if (Object.keys(categoriesData[editingCategory])[0] !== newCategory && newCategory) {
        updatedCategories[newCategory] = updatedCategories[editingCategory.name];
        delete updatedCategories[editingCategory.name];
        setSelectedCategory(newCategory);
      }
      setCategoriesData(updatedCategories);
      handleEditCategoryClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async (category) => {
    try {
      await deleteCategory(category, userId.current)

      const updatedCategories = { ...categoriesData };
      delete updatedCategories[category];
      setCategoriesData(updatedCategories);
      if(Object.keys(categoriesData[category])[0] === selectedCategory[0]) {
        console.log(Object.keys(updatedCategories))
        setSelectedCategory(Object.keys(updatedCategories) || "");
      }
    } catch(e) {
      toast.error("Failed deleting category")
      console.error(e)
    }
  };
/*
  const setPasswordTitle = () => {
    if(categoriesData[selectedCategory]) {
      return Object.keys(categoriesData[selectedCategory])[0]
    }
  }
*/
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
          {
            Object.keys(categoriesData).map((category) => {
              const categoryName = Object.keys(categoriesData[category])
              return(
                <ListItemHover
                  key={category}
                  button
                  selected={category === selectedCategory}
                  onClick={() => handleCategoryClick(category)}
                >
                  <ListItemText primary={categoryName} />
                  <ActionButtons className="action-buttons">
                    <IconButton onClick={() => handleEditCategoryOpen(category)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteCategory(category)}>
                      <DeleteIcon />
                    </IconButton>
                  </ActionButtons>
                </ListItemHover>
              )
            })
          }
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
                {/*
                  categoriesData[selectedCategory]?.map((row, index) => {
                    return(
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
                    )
                  })
                */}
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
