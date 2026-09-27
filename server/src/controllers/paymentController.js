import Payment from "../models/Payment.js";

export const getPayments = async (req, res) => {
  try {
    const filter =
      req.user.role === "client"
        ? { client: req.user.id }
        : {};

    const payments = await Payment.find(filter)
      .populate("client", "name email company")
      .populate("project", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error("Get Payments Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get payments",
    });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("client", "name email company")
      .populate("project", "name");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    if (
      req.user.role === "client" &&
      payment.client._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error("Get Payment Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get payment",
    });
  }
};

export const createPayment = async (req, res) => {
  try {
    const {
      title,
      client,
      project,
      amount,
      status,
      dueDate,
      invoice,
    } = req.body;

    if (!title || !client || !project || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "Title, client, project and amount are required",
      });
    }

    const payment = await Payment.create({
      title,
      client,
      project,
      amount,
      status: status || "pending",
      dueDate,
      invoice: invoice || "",
    });

    const populatedPayment = await Payment.findById(payment._id)
      .populate("client", "name email company")
      .populate("project", "name");

    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      payment: populatedPayment,
    });
  } catch (error) {
    console.error("Create Payment Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create payment",
    });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    const {
      title,
      client,
      project,
      amount,
      status,
      dueDate,
      invoice,
      paidAt,
    } = req.body;

    payment.title = title ?? payment.title;
    payment.client = client ?? payment.client;
    payment.project = project ?? payment.project;
    payment.amount = amount ?? payment.amount;
    payment.status = status ?? payment.status;
    payment.dueDate = dueDate ?? payment.dueDate;
    payment.invoice = invoice ?? payment.invoice;
    payment.paidAt = paidAt ?? payment.paidAt;

    await payment.save();

    const updatedPayment = await Payment.findById(payment._id)
      .populate("client", "name email company")
      .populate("project", "name");

    res.json({
      success: true,
      message: "Payment updated successfully",
      payment: updatedPayment,
    });
  } catch (error) {
    console.error("Update Payment Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update payment",
    });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    await payment.deleteOne();

    res.json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    console.error("Delete Payment Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete payment",
    });
  }
};