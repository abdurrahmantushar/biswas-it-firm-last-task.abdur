import SupportRequest from "../models/SupportRequest.js";

export const createSupportRequest = async (req, res) => {
  try {
    const { subject, message, priority } = req.body;

    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Subject and message are required",
      });
    }

    const request = await SupportRequest.create({
      subject,
      message,
      priority: priority || "medium",
      client: req.user.id,
      status: "open",
    });

    const populatedRequest = await SupportRequest.findById(
      request._id
    ).populate("client", "name email company");

    res.status(201).json({
      success: true,
      message: "Support request submitted successfully",
      request: populatedRequest,
    });
  } catch (error) {
    console.error("Create Support Request Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create support request",
    });
  }
};
export const getSupportRequests = async (req, res) => {
  try {
    const filter =
      req.user.role === "client"
        ? { client: req.user.id }
        : {};

    const requests = await SupportRequest.find(filter)
      .populate("client", "name email company")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("Get Support Requests Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get support requests",
    });
  }
};

export const updateSupportRequest = async (req, res) => {
  try {
    const { status, response, priority } = req.body;

    const request = await SupportRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Support request not found",
      });
    }

    request.status = status ?? request.status;
    request.response = response ?? request.response;
    request.priority = priority ?? request.priority;

    await request.save();

    const updatedRequest = await SupportRequest.findById(request._id).populate(
      "client",
      "name email company"
    );

    res.json({
      success: true,
      message: "Support request updated successfully",
      request: updatedRequest,
    });
  } catch (error) {
    console.error("Update Support Request Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update support request",
    });
  }
};