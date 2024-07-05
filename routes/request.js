const express = require("express");
const router = express.Router();
const multer = require("multer");
const pool = require("../models/databases/pg");

// Middleware to set user data in res.locals
function setUserData(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.username = req.user.name;
    res.locals.userType = req.user.usertype;
  } else {
    res.locals.username = null;
    res.locals.userType = null;
  }
  next();
}

router.use(setUserData);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.use("/uploads", express.static("uploads"));

router.get("/", checkAuthenticated, (req, res) => {
  res.render("request");
});

// Route to request medicine
router.post(
  "/request",
  checkAuthenticated,
  upload.fields([
    { name: "pt_prescription", maxCount: 1 },
    { name: "rp_valid_id", maxCount: 1 },
  ]),
  async (req, res) => {
    const {
      pt_name,
      pt_age,
      pt_gender,
      pt_contact,
      pt_address,
      rp_name,
      rp_age,
      rp_relationship,
      rp_contact,
      rp_address,
    } = req.body;

    const pt_prescription = req.files["pt_prescription"]
      ? req.files["pt_prescription"][0].path
      : null;
    const rp_valid_id = req.files["rp_valid_id"]
      ? req.files["rp_valid_id"][0].path
      : null;

    const rq_id = generateRequestId();

    try {
      await pool.query(
        "INSERT INTO request (rq_id, pt_name, pt_age, pt_gender, pt_contact, pt_address, pt_prescription, rp_name, rp_age, rp_relationship, rp_contact, rp_address, rp_valid_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
        [
          rq_id,
          pt_name,
          pt_age,
          pt_gender,
          pt_contact,
          pt_address,
          pt_prescription,
          rp_name,
          rp_age,
          rp_relationship,
          rp_contact,
          rp_address,
          rp_valid_id,
        ]
      );
      res.redirect('/');
    } catch (err) {
      console.error("Error processing request:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function generateRequestId() {
  return "RQ" + Date.now();
}

module.exports = router;
