const db = require("../Configs/DB.Config");

const GetAllOrders = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM orders");

    res.status(200).json({
      message: "Viewing all the orders",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GetOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query(
      `SELECT * FROM orders where id= ? `,
      [id]
    );
    console.log(result);
    res.status(200).json({
      message: "orders details",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const CreateOrder = async (req, res) => {
  const { user_id, total } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO orders (user_id,total) VALUES (?, ?)",
      [user_id, total]
    );
    res.status(201).json({
      message: "Order Created",
      userId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const CreateOrders = async (req, res) => {
  const { data } = req.body;

  try {
    const values = data.map((order) => [
      order.id,
      order.total,
    ]);

    const [result] = await db.query(
      "INSERT INTO orders (id,total) VALUES ?",
      [values]
    );

    res.status(201).json({
      message: "Oder created",
      result: result,
    });
  } catch (error) {
    console.error("Insert error:", error);
    res
      .status(500)
      .json({ error: "Failed to insert users" });
  }
};

const UpdateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, total } = req.body;

    // finding the existing order
    const [existingOrderResult] = await db.query(
      "SELECT * FROM orders where id = ?",
      [id]
    );

    const existingOrder = existingOrderResult[0];
    const updatedUserId = user_id || existingOrder.user_id;
    const updatedTotal = total || existingOrder.total;

    const updatedResult = await db.query(
      "UPDATE orders SET user_id = ?, total = ? WHERE id = ? ",
      [updatedUserId, updatedTotal, id]
    );

    res.status(201).json({
      message: "Order Updated successfully",
      UpdatedUser: { id, user_id, total },
      UpdatedUserDetails: updatedResult,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const DeleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM  orders where id = ?",
      [id]
    );
    res.status(201).json({
      message: "Order Deleted Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const DeleteAllOrders = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM orders");
    res.status(201).json({
      message: "All orders deleted",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  GetAllOrders,
  GetOrder,
  CreateOrder,
  CreateOrders,
  UpdateOrder,
  DeleteOrder,
  DeleteAllOrders,
};
