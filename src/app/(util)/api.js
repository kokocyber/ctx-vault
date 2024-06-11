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

export async function createCategory(userId, name) {
  try {
    const response = await fetch(`/api/categories?id=${userId}&name=${name}`, {
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

export async function updateCategory(categoryId, userId, name) {
  try {
    const response = await fetch(
      `/api/categories?categoryId=${categoryId}&id=${userId}&name=${name}`,
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

export async function deleteCategory(categoryId, userId) {
  try {
    const response = await fetch(
      `/api/categories?categoryId=${categoryId}&id=${userId}`,
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
    return data["Deleted"];
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
