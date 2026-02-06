const rabbitzuser = require("../model/rabbitz.model.js");

const loginuser = async (req, res) => {
  try {
    const { name, prompt, result } = req.body;
    if (!name) return res.status(400).json({ error: "Missing name" });

    const existing = await rabbitzuser.findOne({ name });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const user = new rabbitzuser({
      name,
      details: [{ prompt, result }]
    });

    await user.save();
    return res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

const currentresult = async (req, res) => {
  try {
    console.log("insideeeeeeee")
    const { name } = req.body;
    const user = await rabbitzuser.findOne({ name });
    if (!user || user.details.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }
    const length = user.details.length;
    const lastResult = user.details[length - 1].result;
    console.log("yeahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",lastResult)
    res.json(lastResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  loginuser,
  currentresult
}