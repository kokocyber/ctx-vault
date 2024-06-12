// utils/api.js
export async function fetchCategories(userId) {
  try {
    const response = await fetch(`/api/categories?id=${userId}`);
    const contentType = response.headers.get("content-type");

    if (
      !response.ok ||
      !contentType ||
      !contentType.includes("application/json")
    ) {
      const errorText = await response.text();
      console.error("Error fetching categories:", errorText);
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// create Category for user
export async function createCategory(userId, name) {
  try {
    const response = await fetch(`/api/v1/categories?id=${userId}&categoryName=${name}`, {
      method: "POST",
    });
    const contentType = response.headers.get("content-type");

    if (
      !response.ok ||
      !contentType ||
      !contentType.includes("application/json")
    ) {
      const errorText = await response.text();
      console.error("Error creating category:", errorText);
      throw new Error("Failed to create category");
    }

    const data = await response.json();
    return data["Created category"];
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// update category
export async function updateCategory(categoryId, userId, name) {
  try {
    const response = await fetch(
      `/api/v1/categories?categoryId=${categoryId}&id=${userId}&name=${name}`,
      {
        method: "PUT",
      }
    );
    const contentType = response.headers.get("content-type");

    if (
      !response.ok ||
      !contentType ||
      !contentType.includes("application/json")
    ) {
      const errorText = await response.text();
      console.error("Error updating category:", errorText);
      throw new Error("Failed to update category");
    }

    const data = await response.json();
    return data["Updated"];
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}


// deletes category for user
export async function deleteCategory(categoryId, userId) {
  try {
    const response = await fetch(
      `/api/v1/categories?categoryId=${categoryId}&id=${userId}`,
      {
        method: "DELETE",
      }
    );
    const contentType = response.headers.get("content-type");

    if (
      !response.ok ||
      !contentType ||
      !contentType.includes("application/json")
    ) {
      const errorText = await response.text();
      console.error("Error deleting category:", errorText);
      throw new Error("Failed to delete category");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// login API calls
export async function login(email, password) {
  try {
    const response = await fetch(
      `/api/v1/login?email=${email}&password=${password}`,
      {
        method: "POST",
      }
    );
    const contentType = response.headers.get("content-type");

    if (
      !response.ok ||
      !contentType ||
      !contentType.includes("application/json")
    ) {
      const errorText = await response.text();
      console.error("Error logging in:", errorText);
      return response;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// verify if logged in
export async function verifyCookie() {
  try {
    const response = await fetch(`/api/v1/user/me`, {
      method: "GET",
    });
    const contentType = response.headers.get("content-type");

    if (
      !response.ok ||
      !contentType ||
      !contentType.includes("application/json")
    ) {
      return response;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// registers user
export async function register(email, password, firstName, lastName) {
  try {
    const response = await fetch(
      `/api/v1/user?email=${email}&password=${password}&firstName=${firstName}&lastName=${lastName}`,
      {
        method: "POST",
      }
    );
    const contentType = response.headers.get("content-type");

    if (
      !response.ok ||
      !contentType ||
      !contentType.includes("application/json")
    ) {
      return response;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// logout user
export async function logout() {
  try {
    const response = await fetch(`/api/v1/logout`, {
      method: "GET",
    });
    const contentType = response.headers.get("content-type");

    if (
      !response.ok ||
      !contentType ||
      !contentType.includes("application/json")
    ) {
      return response;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
