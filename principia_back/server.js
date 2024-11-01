const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dataSyncRoutes = require("./routes/dataSyncRoutes");
const importRoutes = require("./routes/importRoutes");
const voteCalcRoutes = require("./routes/voteCalcRoutes");
const cron = require("node-cron");
const moment = require("moment-timezone");
const { syncData } = require("./controllers/dataSyncController");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

connectDB();

cron.schedule(
  "0 12 * * *",
  async () => {
    try {
      await syncData({});
      console.log("Data synchronized successfully at 12:00 PM BRT");
    } catch (error) {
      console.error("Error syncing data:", error);
    }
  },
  {
    scheduled: true,
    timezone: "America/Sao_Paulo",
  }
);

app.use("/api/sync", dataSyncRoutes);
app.use("/api/import", importRoutes);
app.use("/api/vote", voteCalcRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
