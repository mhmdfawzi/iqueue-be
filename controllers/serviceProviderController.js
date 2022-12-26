const ServiceProvider = require("../models/service_provider");

async function getAll(search, reqPage, reqLimit) {
  let options = {};
  let serviceProviders;
  try {
    serviceProviders = await ServiceProvider.find();
    if (serviceProviders == null) {
      return { success: false, message: "Cannot find catchphrases" };
    }
  } catch (err) {
    return { success: false, message: "Catchphrases not found" };
  }

  return {
    success: true,
    data: serviceProviders,
  };
}

async function getById(id) {
  let serviceProvider;
  try {
    serviceProvider = await ServiceProvider.findById(id);
    if (serviceProvider == null) {
      return { success: false, message: "Cannot find service provider" };
    }
  } catch (err) {
    return { success: false, message: err.message };
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
    return { success: false, message: "Failed to add service provider" };
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

    try {
      const updatedServiceProvider = await serviceProvider.save();
      return {
        success: true,
        data: updatedServiceProvider,
        message: "Service provider updated successfully",
      };
    } catch (err) {
      return { sucess: false, message: "Failed to update service provider" };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
}

async function remove(id) {
  let serviceProvider;
  try {
    serviceProvider = await ServiceProvider.findById(id);
    if (serviceProvider == null) {
      return { success: false, message: "Cannot find service provider" };
    }

    try {
      await serviceProvider.remove();
      return {
        success: true,
        message: "Deleted service provider",
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
