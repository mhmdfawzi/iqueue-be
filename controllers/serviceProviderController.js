const { log } = require("console");
const ServiceProvider = require("../models/service_provider");
const SPCategories = require("../models/sp_category");

async function getAll(search, reqPage, reqLimit) {
  let options = {};
  let serviceProviders;
  try {
    // serviceProviders = await ServiceProvider.find()
    //   .select("-__v")
    //   .populate("category", "-_id -__v")
    //   .populate("owner", "-_id -__v -password")
    //   .populate("createdBy", "-_id -__v -password");

    serviceProviders = await ServiceProvider.aggregate([
      {
        $lookup: {
          from: "queues",
          localField: "_id",
          foreignField: "serviceProvider",
          as: "queues",
        },
      },
      {
        $unwind: "$queues",
      }
    ]);
    if (serviceProviders == null) {
      return { success: false, message: "Cannot find service providers" };
    }
  } catch (err) {
    return {
      success: false,
      message: "Service providers not found",
      error: err.message,
    };
  }

  return {
    success: true,
    data: serviceProviders,
  };
}

async function getById(id) {
  let serviceProvider;
  try {
    serviceProvider = await ServiceProvider.findById(id)
      .select("-__v")
      .populate("category", "-_id -__v")
      .populate("owner", "-_id -__v -password")
      .populate("createdBy", "-_id -__v -password");
    if (serviceProvider == null) {
      return { success: false, message: "Cannot find service provider" };
    }
  } catch (err) {
    return {
      success: false,
      message: "Service providers not found",
      error: err.message,
    };
  }

  return {
    success: true,
    data: serviceProvider,
  };
}

async function add(body) {
  const serviceProvider = new ServiceProvider(body);

  try {
    const newServiceProvider = await serviceProvider.save();
    return {
      success: true,
      data: newServiceProvider,
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to add service provider",
      error: err.message,
    };
  }
}

async function update(id, name = null, phone = null, long = null, lat = null) {
  let serviceProvider;
  try {
    serviceProvider = await ServiceProvider.findById(id);
    if (serviceProvider == null) {
      return { success: false, message: "Cannot find service provider" };
    }
    if (name != null) {
      serviceProvider.name = name;
    }
    if (phone != null) {
      serviceProvider.phone = phone;
    }
    if (long != null && lat != null) {
      serviceProvider.lat = lat;
      serviceProvider.long = long;
    }

    const updatedServiceProvider = await serviceProvider.save();
    return {
      success: true,
      data: updatedServiceProvider,
      message: "Service provider updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to update service provider",
      error: err.message,
    };
  }
}

async function remove(id) {
  let serviceProvider;
  try {
    serviceProvider = await ServiceProvider.findById(id);
    if (serviceProvider == null) {
      return { success: false, message: "Cannot find service provider" };
    }

    await serviceProvider.remove();
    return {
      success: true,
      message: "Deleted service provider",
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to delete service provider",
      error: err.message,
    };
  }
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
