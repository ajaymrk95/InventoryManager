import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({ success: true, categories});

  } 
  
  catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description)
      return res.status(400).json({ success: false, message: "Missing Category Data" });

    const checkCategoryExist = await Category.findOne({ name });

    if (checkCategoryExist)
      return res.status(409).json({ success: false, message: "Category Already Exists" });

    const newCategory = new Category({ name, description });

    await newCategory.save();

    console.log("New Category Added!");

    return res.status(201).json({ success: true, message: `Category ${name} Added Successfully` });

  } catch (error) {
    console.error("Error adding category:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    await Category.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: `Category "${category.name}" deleted successfully` });

  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
