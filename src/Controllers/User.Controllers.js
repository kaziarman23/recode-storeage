const db = require("../Configs/DB.Config");

const GetAllUsers = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM users");

    res.status(200).json({
      message: "Viewing all the users",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GetOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query(
      `SELECT * FROM users where id= ? `,
      [id]
    );
    console.log(result);
    res.status(200).json({
      message: "user details",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const CreateUser = async (req, res) => {
  const { name, age } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO users (name,age) VALUES (?, ?)",
      [name, age]
    );
    res.status(201).json({
      message: "User created",
      userId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const CreateUsers = async (req, res) => {
  const { data } = req.body;

  try {
    const values = data.map((user) => [
      user.name,
      user.age,
    ]);

    const [result] = await db.query(
      "INSERT INTO users (name,age) VALUES ?",
      [values]
    );

    res.status(201).json({
      message: "User created",
      result: result,
    });
  } catch (error) {
    console.error("Insert error:", error);
    res
      .status(500)
      .json({ error: "Failed to insert users" });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age } = req.body;

    // finding the existing user
    const [existingUser] = await db.query(
      "SELECT * FROM users where id = ?",
      [id]
    );

    const updatedName = name || existingUser.name;
    const updatedAge = age || existingUser.age;

    const updatedResult = await db.query(
      "UPDATE users SET name = ?, age = ? WHERE id = ? ",
      [updatedName, updatedAge, id]
    );

    res.status(201).json({
      message: "User Updated successfully",
      UpdatedUser: { id, name, age },
      UpdatedUserDetails: updatedResult,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM  users where id = ?",
      [id]
    );
    res.status(201).json({
      message: "User Deleted Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const DeleteAllUser = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM users");
    res.status(201).json({
      message: "All users deleted",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  GetAllUsers,
  GetOneUser,
  CreateUser,
  CreateUsers,
  UpdateUser,
  DeleteUser,
  DeleteAllUser,
};
