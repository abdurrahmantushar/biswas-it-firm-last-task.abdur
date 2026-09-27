import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const getClients = async (req, res) => {
  try {
    const clients = await User.find({ role: "client" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      clients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get clients",
    });
  }
};

export const getClientById = async (req, res) => {
  try {
    const client = await User.findOne({
      _id: req.params.id,
      role: "client",
    }).select("-password");

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    res.json({
      success: true,
      client,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get client",
    });
  }
};

export const createClient = async (req, res) => {
  try {
    const { name, email, password, company, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const existingClient = await User.findOne({ email });

    if (existingClient) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "client",
      company: company || "",
      phone: phone || "",
    });

    const clientData = client.toObject();
    delete clientData.password;

    res.status(201).json({
      success: true,
      message: "Client created successfully",
      client: clientData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create client",
    });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { name, email, company, phone } = req.body;

    const client = await User.findOne({
      _id: req.params.id,
      role: "client",
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    if (email && email !== client.email) {
      const existingUser = await User.findOne({
        email,
        _id: { $ne: req.params.id },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
    }

    client.name = name ?? client.name;
    client.email = email ?? client.email;
    client.company = company ?? client.company;
    client.phone = phone ?? client.phone;

    await client.save();

    const clientData = client.toObject();
    delete clientData.password;

    res.json({
      success: true,
      message: "Client updated successfully",
      client: clientData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update client",
    });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const client = await User.findOne({
      _id: req.params.id,
      role: "client",
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    await client.deleteOne();

    res.json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete client",
    });
  }
};