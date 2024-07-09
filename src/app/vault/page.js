"use client";

import { alpha } from "@mui/material/styles";
import { useEffect, useState, useContext, useRef } from "react";
import {
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
  Typography,
  Tooltip,
  Toolbar,
} from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
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
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { decryptText } from "@/middleware/encryption";
import { sha512_256 } from "js-sha512";
import { Navbar } from "../(components)/Navbar";
import AutocompleteTextField from "../(components)/Autocomplete";
import FilterListIcon from "@mui/icons-material/FilterList";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

const initialCategoriesData = {
  1: {
    id: 1,
    name: "Loading",
    userId: 0,
    passwords: [],
  },
};

const FullHeightContainer = styled(Container)({
  height: "70vh",
  display: "flex",
  flexDirection: "row",
  paddingTop: "2%",
  maxWidth: "50%",
  justifyContent: "center",
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
  backgroundColor: "white",
  borderRadius: "25px 25px 25px 25px",
});

const ToolbarBox = styled(Box)({
  padding: "2%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const TableRowHover = styled(DataGrid)({
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
  }, [currentUserData, isUserLoggedIn, router]);

  const [categoriesData, setCategoriesData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(initialCategoriesData)[0]
  );
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openAddPassword, setOpenAddPassword] = useState(false);

  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [openEditPassword, setOpenEditPassword] = useState(false);

  const [openDeletePassword, setOpenDeletePassword] = useState(false);

  const [newCategory, setNewCategory] = useState("");
  const [newPassword, setNewPassword] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingPassword, setEditingPassword] = useState(null);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const setNewDPassword = (password) => {
    console.log("password in setNewdPasswort function", password);
    if (openEditPassword || openAddPassword) {
      setNewPassword(password);
      return;
    }

    var newDPassword = { name: "", username: "", password: "" };
    if (password.name !== "") {
      newDPassword.name = password.name;
    }
    if (password.username !== "") {
      newDPassword.username = decryptText(
        password.username,
        sha512_256(secretKey)
      );
    }
    if (password.password !== "") {
      newDPassword.password = decryptText(
        password.password,
        sha512_256(secretKey)
      );
    }
    setNewPassword(newDPassword);
  };

  const setNewOCategory = (category) => {
    if (openEditCategory || openAddCategory) {
      setNewCategory(category);
      return;
    }

    var newOCateogry = "";
    if (category !== "") {
      newOCateogry = categoriesData[category].name;
    }
    setNewCategory(newOCateogry);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddCategoryOpen = () => {
    setNewOCategory("");
    setOpenAddCategory(true);
  };

  const handleAddCategoryClose = () => {
    setOpenAddCategory(false);
  };

  const handleDeletePasswordOpen = () => {
    setOpenDeletePassword(true);
  };

  const handleDeletePasswordClose = () => {
    setOpenDeletePassword(false);
  };

  const handleAddPasswordOpen = () => {
    setNewDPassword({ name: "", username: "", password: "" });
    setOpenAddPassword(true);
  };

  const handleAddPasswordClose = () => {
    setOpenAddPassword(false);
  };

  const handleEditCategoryOpen = (category) => {
    setEditingCategory(category);
    setNewOCategory(category);
    setOpenEditCategory(true);
  };

  const handleEditCategoryClose = () => {
    setOpenEditCategory(false);
    setEditingCategory(null);
  };

  const handleEditPasswordOpen = () => {
    const selectedData = getRowDataByIds(rowSelectionModel)[0];
    console.log(selectedData);
    setEditingPassword(selectedData);
    setNewDPassword(selectedData);
    setOpenEditPassword(true);
  };

  const handleEditPasswordClose = () => {
    setOpenEditPassword(false);
    setEditingPassword(null);
  };

  const handleAddCategory = async () => {
    try {
      const response = await createCategory(userId.current, newCategory);
      const newUserData = await verifyCookie();

      setCategoriesData(newUserData["user data"]);
    } catch (e) {
      toast.error("Failed adding category");
      console.error(e);
    }
    setNewOCategory("");
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
    setNewDPassword({ name: "", username: "", password: "" });
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
    try {
      console.log("index password", index);
      console.log(
        "with category data",
        categoriesData[selectedCategory].passwords[index].id
      );
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
    console.log(selectedCategory);
    console.log(categoriesData);
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

  const handleUsernameCopy = (username) => {
    navigator.clipboard.writeText(decryptText(username, sha512_256(secretKey)));
    toast.success("Copied username into Clipboard");
  };

  const handlePasswordCopy = (password) => {
    navigator.clipboard.writeText(decryptText(password, sha512_256(secretKey)));
    toast.success("Copied password into Clipboard");
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 300,
    },
    {
      field: "username",
      headerName: "Username",
      width: 300,
      renderCell: (params) => (
        <Tooltip title="Copy Username" arrow>
          <Button
            style={{
              justifyContent: "center",
              overflow: "hidden",
              whiteSpace: "nowrap",
              color: "black",
            }}
            onClick={() => handleUsernameCopy(params.value)}
          >
            {"••••••••••••••••"}
          </Button>
        </Tooltip>
      ),
    },
    {
      field: "password",
      headerName: "Password",
      width: 400,
      renderCell: (params) => (
        <Tooltip title="Copy Password" arrow>
          <Button
            style={{
              justifyContent: "center",
              overflow: "hidden",
              whiteSpace: "nowrap",
              color: "black",
            }}
            onClick={() => handlePasswordCopy(params.value)}
          >
            {"••••••••••••••••"}
          </Button>
        </Tooltip>
      ),
    },
    // },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   sortable: false,
    //   width: 100,
    //   renderCell: (params) => (
    //     <ActionButtons className="action-buttons">
    //       <Tooltip title="Edit" arrow>
    //         <IconButton onClick={() => handleEditPasswordOpen(params.row)}>
    //           <EditIcon />
    //         </IconButton>
    //       </Tooltip>
    //       <Tooltip title="Delete" arrow>
    //         <IconButton onClick={() => handleDeletePassword(params.rowIndex)}>
    //           <DeleteIcon />
    //         </IconButton>
    //       </Tooltip>
    //     </ActionButtons>
    //   ),
    // },
  ];

  const getRowDataByIds = (ids) => {
    const selectedData = ids.map((id) =>
      categoriesData[selectedCategory]?.passwords.find((row) => row.id === id)
    );
    return selectedData;
  };

  const handleSelectionChange = (newRowSelectionModel) => {
    console.log("New Selection IDs:", newRowSelectionModel);
    const selectedData = getRowDataByIds(newRowSelectionModel);
    console.log("Selected Rows Data:", selectedData);
    console.log("Selected Row id:", newRowSelectionModel[0]);
    setRowSelectionModel(newRowSelectionModel);
  };

  function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Actions
          </Typography>
        )}

        {numSelected > 0 && (
          <>
            <Tooltip title="Edit">
              <IconButton onClick={handleEditPasswordOpen}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={handleDeletePasswordOpen}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Toolbar>
    );
  }

  return (
    <>
      <Navbar />
      <FullHeightContainer>
        <FullHeightPaper style={{ flex: "0 0 25%" }}>
          <Box padding={2} textAlign="center">
            <Typography className="vaultTitle" variant="h6">
              Categories
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCategoryOpen}
            >
              Add Category
            </Button>
          </Box>
          <CategoryList>
            {Object.keys(categoriesData).map((key) => (
              <ListItemHover
                key={key}
                button
                selected={key === selectedCategory}
                onClick={() => handleCategoryClick(key)}
              >
                <ListItemText primary={categoriesData[key].name} />
                <ActionButtons className="action-buttons">
                  <Tooltip title="Edit" arrow>
                    <IconButton onClick={() => handleEditCategoryOpen(key)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" arrow>
                    <IconButton onClick={() => handleDeleteCategory(key)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ActionButtons>
              </ListItemHover>
            ))}
          </CategoryList>
        </FullHeightPaper>
        <Box style={{ flex: "1" }}>
          <TableBox>
            <ToolbarBox>
              <Typography className="vaultTitle" variant="h6">
                <span className="vaultTitleName">
                  {categoriesData[selectedCategory]?.name}
                </span>{" "}
                Passwords
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddPasswordOpen}
              >
                Add Password
              </Button>
            </ToolbarBox>
            <EnhancedTableToolbar numSelected={rowSelectionModel.length} />
            <DataGrid
              rows={categoriesData[selectedCategory]?.passwords || []}
              columns={columns}
              autoHeight
              checkboxSelection
              onRowSelectionModelChange={handleSelectionChange}
              rowSelectionModel={rowSelectionModel}
              pageSizeOptions={[5, 10, 25]}
              disableMultipleRowSelection
            />
          </TableBox>
        </Box>

        {/* Dialogs */}
        {/* Add Category Dialog */}
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
              onChange={(e) => setNewOCategory(e.target.value)}
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
              onChange={(e) => setNewOCategory(e.target.value)}
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
                setNewDPassword({ ...newPassword, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Username"
              fullWidth
              value={newPassword.username}
              onChange={(e) =>
                setNewDPassword({ ...newPassword, username: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Password"
              fullWidth
              value={newPassword.password}
              onChange={(e) =>
                setNewDPassword({ ...newPassword, password: e.target.value })
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
                setNewDPassword({ ...newPassword, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Username"
              fullWidth
              value={newPassword.username}
              onChange={(e) =>
                setNewDPassword({ ...newPassword, username: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Password"
              fullWidth
              value={newPassword.password}
              onChange={(e) =>
                setNewDPassword({ ...newPassword, password: e.target.value })
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

        {/* Delete Password Dialog */}
        <Dialog
          open={openDeletePassword}
          onClose={() => handleDeletePassword(rowSelectionModel[0])}
        >
          <DialogTitle>Delete Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this password from {""}
              <span className="vaultTitleName">
                {categoriesData[selectedCategory]?.name}
              </span>
              ?
              <br />
              This operation is permanent.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeletePasswordClose} color="primary">
              Cancel
            </Button>
            <Button onClick={deletePassword} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </FullHeightContainer>
    </>
  );
}
