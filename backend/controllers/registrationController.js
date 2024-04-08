

exports.register = (req, res) => {
  const userData = req.body
  if (Object.keys(userData).length === 0) {
    res.status(500).json({ success: false, message: "Invalid Data!" });
  }

  const { status } = userData

  if (!["staff", "student", "volunteer"].includes(status)) {
    res.status(500).json({ success: false, message: "Invalid Status!" });
  }


  let fee = 0;

  if (status == "student") {
    fee = 10

  } else if (status == "staff") {
    fee = 50
  }

  const response = {
    ...userData,
    fee
  }


  res.status(200).json(response)
};