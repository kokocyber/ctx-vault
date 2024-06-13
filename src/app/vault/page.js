"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { UserContext } from "../(context)/UserContextComponent";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Navbar } from "../(components)/Navbar";
import "../globals.css";
import "./page.model.css";

const sampleData = {
  1: {
    id: 1,
    name: "General",
    userId: 3,
    passwords: [
      {
        id: 1,
        name: "Minecraft",
        username:
          "39ccefb21c6a4344169e14f790fb2847:fa83f17319ac4ed8f0b735d897935394",
        password:
          "89a7b9f1550a582953b14b8fae893401:0a507891584d22e4d455c705dd399c8e",
        categoryId: 1,
      },
    ],
  },
  2: {
    id: 26,
    name: "sdfs",
    userId: 3,
    passwords: [
      {
        id: 23,
        name: "Minecraft",
        username:
          "39ccefb21c6a4344169e14f790fb2847:fa83f17319ac4ed8f0b735d897935394",
        password:
          "89a7b9f1550a582953b14b8fae893401:0a507891584d22e4d455c705dd399c8e",
        categoryId: 26,
      },
    ],
  },
  3: {
    id: 58,
    name: "sdfs",
    userId: 3,
    passwords: [
      {
        id: 48,
        name: "Minecraft",
        username:
          "39ccefb21c6a4344169e14f790fb2847:fa83f17319ac4ed8f0b735d897935394",
        password:
          "89a7b9f1550a582953b14b8fae893401:0a507891584d22e4d455c705dd399c8e",
        categoryId: 58,
      },
    ],
  },
};

export default function Vault() {
  const { currentUserData, isUserLoggedIn, setCurrentUserData } =
    useContext(UserContext);
  const [data, setData] = useState({});
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [openAddPassword, setOpenAddPassword] = useState(false);
  const [openEditPassword, setOpenEditPassword] = useState(false);
  const [passwordToEdit, setPasswordToEdit] = useState(null);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [newPasswordData, setNewPasswordData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [userId, setUserId] = useState();
  const router = useRouter();

  useEffect(() => {
    let data = sessionStorage.getItem("currentUserData");
    setCurrentUserData(JSON.parse(data));
  });

  useEffect(() => {
    if (!isUserLoggedIn || userData === "") {
      toast.error("You are not logged in");
      router.push("/");
      return;
    }
    setUserId(userData.id.user.id);

    console.log(userId, userData.current);

    // Simulate fetch
    setData(userData.current["user data"]);
  }, [isUserLoggedIn, userData, router]);

  const handleEditCategory = (category) => {
    setCategoryToEdit(category);
    setOpenEditCategory(true);
  };

  const handleDeleteCategory = (categoryId) => {
    const updatedData = { ...data };
    delete updatedData[categoryId];
    setData(updatedData);
  };

  const handleAddCategory = () => {
    const newCategoryId = Object.keys(data).length + 1;
    const newCategory = {
      id: newCategoryId,
      name: newCategoryName,
      userId: userId.current,
      passwords: [],
    };
    setData({ ...data, [newCategoryId]: newCategory });
    setNewCategoryName("");
    setOpenAddCategory(false);
  };

  const handleEditPassword = (password, categoryId) => {
    setPasswordToEdit(password);
    setCurrentCategoryId(categoryId);
    setOpenEditPassword(true);
  };

  const handleDeletePassword = (passwordId, categoryId) => {
    const updatedData = { ...data };
    updatedData[categoryId].passwords = updatedData[
      categoryId
    ].passwords.filter((pwd) => pwd.id !== passwordId);
    setData(updatedData);
  };

  const handleAddPassword = () => {
    const newPasswordId = Math.random().toString(36).substr(2, 9); // Generate a random id for new password
    const newPassword = {
      id: newPasswordId,
      name: newPasswordData.name,
      username: newPasswordData.username,
      password: newPasswordData.password,
      categoryId: currentCategoryId,
    };
    const updatedData = { ...data };
    updatedData[currentCategoryId].passwords.push(newPassword);
    setData(updatedData);
    setNewPasswordData({ name: "", username: "", password: "" });
    setOpenAddPassword(false);
  };

  const handleUpdatePassword = () => {
    const updatedData = { ...data };
    const passwordIndex = updatedData[currentCategoryId].passwords.findIndex(
      (pwd) => pwd.id === passwordToEdit.id
    );
    updatedData[currentCategoryId].passwords[passwordIndex] = passwordToEdit;
    setData(updatedData);
    setOpenEditPassword(false);
  };

  return (
    <>
      <Navbar />
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12}>
          <Typography
            variant="h1"
            component="h1"
            className="vaultTitle"
            gutterBottom
          >
            Your personal <span className="highlight">Vault</span>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenAddCategory(true)}
          >
            Add Category
          </Button>
        </Grid>
        {Object.values(data).map((category) => (
          <Grid item xs={12} key={category.id}>
            <Paper
              elevation={3}
              style={{ padding: 16, borderRadius: "25px 25px 25px 25px" }}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5" fontWeight="bold">
                  {category.name}
                </Typography>
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleEditCategory(category)}
                    style={{ marginRight: 8 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Grid>
              <TableContainer component={Paper} style={{ marginTop: 16 }}>
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
                    {category.passwords.map((password) => (
                      <TableRow key={password.id}>
                        <TableCell>{password.name}</TableCell>
                        <TableCell>{password.username}</TableCell>
                        <TableCell>{password.password}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              handleEditPassword(password, category.id)
                            }
                            style={{ marginRight: 8 }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() =>
                              handleDeletePassword(password.id, category.id)
                            }
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setCurrentCategoryId(category.id);
                            setOpenAddPassword(true);
                          }}
                        >
                          Add Password
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        ))}

        {/* Dialog for Adding Category */}
        <Dialog
          open={openAddCategory}
          onClose={() => setOpenAddCategory(false)}
        >
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
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddCategory(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddCategory} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for Editing Category */}
        <Dialog
          open={openEditCategory}
          onClose={() => setOpenEditCategory(false)}
        >
          <DialogTitle>Edit Category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the new name of the category.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Category Name"
              fullWidth
              value={categoryToEdit?.name || ""}
              onChange={(e) =>
                setCategoryToEdit({ ...categoryToEdit, name: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditCategory(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleEditCategory(categoryToEdit.id, categoryToEdit.name);
                setOpenEditCategory(false);
              }}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for Adding Password */}
        <Dialog
          open={openAddPassword}
          onClose={() => setOpenAddPassword(false)}
        >
          <DialogTitle>Add New Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the details of the new password.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Password Name"
              fullWidth
              value={newPasswordData.name}
              onChange={(e) =>
                setNewPasswordData({ ...newPasswordData, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Username"
              fullWidth
              value={newPasswordData.username}
              onChange={(e) =>
                setNewPasswordData({
                  ...newPasswordData,
                  username: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              label="Password"
              fullWidth
              value={newPasswordData.password}
              onChange={(e) =>
                setNewPasswordData({
                  ...newPasswordData,
                  password: e.target.value,
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddPassword(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddPassword} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for Editing Password */}
        <Dialog
          open={openEditPassword}
          onClose={() => setOpenEditPassword(false)}
        >
          <DialogTitle>Edit Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please edit the details of the password.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Password Name"
              fullWidth
              value={passwordToEdit?.name || ""}
              onChange={(e) =>
                setPasswordToEdit({ ...passwordToEdit, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Username"
              fullWidth
              value={passwordToEdit?.username || ""}
              onChange={(e) =>
                setPasswordToEdit({
                  ...passwordToEdit,
                  username: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              label="Password"
              fullWidth
              value={passwordToEdit?.password || ""}
              onChange={(e) =>
                setPasswordToEdit({
                  ...passwordToEdit,
                  password: e.target.value,
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditPassword(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdatePassword} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
}
