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
  Tooltip,
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
import "./page.model.css";
import { useRouter } from "next/navigation";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { decryptText } from "@/middleware/encryption";
import { sha512_256 } from "js-sha512";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY

const initialCategoriesData = {
  1: {
    id: 1,
    name: "Loading",
    userId: 0,
    passwords: [],
  },
};

const FullHeightContainer = styled(Container)({
  height: "90vh",
  display: "flex",
  flexDirection: "row",
  paddingTop: "2%",
  maxWidth: "50%",
});

const FullHeightPaper = styled(Paper)({
  height: "100%",
  marginRight: "2%",
  borderRadius: "25px 25px 25px 25px",
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
  padding: "2%",
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
  const router = useRouter();
  const { currentUserData, setCurrentUserData, isUserLoggedIn } =
    useContext(UserContext);
  const userId = useRef("");

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("currentUserData"));
    if (data) {
      setCurrentUserData(data);
    }
  }, []);

  useEffect(() => {
    if (currentUserData !== "" && currentUserData["user data"]) {
      setCategoriesData((prevData) => {
        // Only update state if the data has actually changed
        if (
          JSON.stringify(prevData) !==
          JSON.stringify(currentUserData["user data"])
        ) {
          return currentUserData["user data"];
        }
        return prevData;
      });
      userId.current = currentUserData.id?.user.id;
    }
    // } else {
    //   router.push("/login");
    // }
  }, [currentUserData, isUserLoggedIn, router]);

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

  const handlePasswordCopy = (type) => async () => {
    try {
      console.log(selected);
      const { username, password } = await fetchPasswordFromDB(
        currentUserData.id.user.id
      );
      if (type === "username") {
        setCopyUsername(username);
      } else if (type === "password") {
        setCopyPassword(password);
      }
      navigator.clipboard.writeText(type === "username" ? username : password);
      alert(`Copied ${type} to clipboard!`);
    } catch (error) {
      console.error("Error fetching password:", error);
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
            <Typography className="vaultTitle" variant="h6">
              {categoriesData[selectedCategory]?.name} Passwords
            </Typography>
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
            style={{ flex: 1, maxWidth: "100%" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    style={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Username
                  </TableCell>
                  <TableCell
                    style={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Password
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoriesData[selectedCategory]?.passwords.length > 0 ? (
                  categoriesData[selectedCategory]["passwords"].map(
                    (row, index) => (
                      <TableRowHover key={index}>
                        <TableCell
                          style={{
                            maxWidth: "200px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "200px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {decryptText(row.username, sha512_256(secretKey))}
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "200px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {decryptText(row.password, sha512_256(secretKey))}
                        </TableCell>
                        <TableCell>
                          <ActionButtons className="action-buttons">
                            <Tooltip title="to be implemented">
                              <IconButton
                              // onClick={handlePasswordCopy("username")}
                              >
                                <ContentCopyIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="to be implemented">
                              <IconButton
                              // onClick={handlePasswordCopy("password")}
                              >
                                <ContentCopyIcon />
                              </IconButton>
                            </Tooltip>
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
