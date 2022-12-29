const SPCategory = require("../models/sp_category");

async function getAll(search, reqPage, reqLimit) {
  let options = {};
  let spCategories;
  try {
    spCategories = await SPCategory.find();
    if (spCategories == null) {
      return { success: false, message: "Cannot find SP categories" };
    }
  } catch (err) {
    return { success: false, message: "SP categories not found" };
  }

  return {
    success: true,
    data: spCategories,
  };
}

async function getById(id) {
  let spCategories;
  try {
    spCategories = await SPCategory.findById(id);
    if (spCategories == null) {
      return { success: false, message: "Cannot find sp category" };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }

  return {
    success: true,
    data: spCategories,
  };
}

async function add(body) {
  const spCategories = new SPCategory(body);

  try {
    const newSPCategory = await spCategories.save();
    return {
      success: true,
      data: newSPCategory,
    };
  } catch (err) {
    return { success: false, message: "Failed to add sp category" };
  }
}

async function update(id, name) {
  let spCategories;
  try {
    spCategories = await SPCategory.findById(id);
    if (spCategories == null) {
      return { success: false, message: "Cannot find sp category" };
    }
    if (name != null) {
      spCategories.name = name;
    } else {
      return { success: false, message: "Name property should be passed" };
    }

    try {
      const updatedSPCategory = await spCategories.save();
      return {
        success: true,
        data: updatedSPCategory,
        message: "Service provider updated successfully",
      };
    } catch (err) {
      return { sucess: false, message: "Failed to update sp category" };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
}

async function remove(id) {
  let spCategories;
  try {
    spCategories = await SPCategory.findById(id);
    if (spCategories == null) {
      return { success: false, message: "Cannot find sp category" };
    }

    try {
      await spCategories.remove();
      return {
        success: true,
        message: "Deleted sp category",
      };
    } catch (err) {
      return { success: false, message: err.message };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
