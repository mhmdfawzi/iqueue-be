const Queue = require("../models/queue");

async function getAll(serviceProviderID) {
  let queues;
  try {
    queues = await Queue.find({ serviceProvider: serviceProviderID })
      .select("-__v")
      .populate("serviceProvider", "-_id -__v")
      .populate("manager", "-_id -__v -password")
      .populate("createdBy", "-_id -__v -password");
    if (queues == null) {
      return { success: false, message: "Cannot find queues" };
    }
  } catch (err) {
    return {
      success: false,
      message: "Queues not found",
      error: err.message,
    };
  }

  return {
    success: true,
    data: queues,
  };
}

async function getById(id) {
  let queue;
  try {
    queue = await Queue.findById(id)
      .select("-__v")
      .populate("serviceProvider", "-_id -__v")
      .populate("manager", "-_id -__v -password")
      .populate("createdBy", "-_id -__v -password");
    if (queue == null) {
      return { success: false, message: "Cannot find queue" };
    }
  } catch (err) {
    return {
      success: false,
      message: "Queues not found",
      error: err.message,
    };
  }

  return {
    success: true,
    data: queue,
  };
}

async function add(body) {
  const queue = new Queue(body);

  try {
    const newQueue = await queue.save();
    return {
      success: true,
      data: newQueue,
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to add queue",
      error: err.message,
    };
  }
}

async function update(
  id,
  manager = null,
  bookCount = null,
  nowServing = null,
  nextServing = null,
  name = null
) {
  let queue;
  try {
    queue = await Queue.findById(id);
    if (queue == null) {
      return { success: false, message: "Cannot find queue" };
    }
    if (name != null) {
      queue.name = name;
    }
    if (manager != null) {
      queue.manager = manager;
    }
    if (bookCount != null) {
      queue.bookCount = bookCount;
    }
    if (nowServing != null) {
      queue.nowServing = nowServing;
    }
    if (nextServing != null) {
      queue.nextServing = nextServing;
    }

    const updatedQueue = await queue.save();
    return {
      success: true,
      data: updatedQueue,
      message: "Queue updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to update queue",
      error: err.message,
    };
  }
}

async function remove(id) {
  let queue;
  try {
    queue = await Queue.findById(id);
    if (queue == null) {
      return { success: false, message: "Cannot find queue" };
    }

    await queue.remove();
    return {
      success: true,
      message: "Deleted queue",
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to delete queue",
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
