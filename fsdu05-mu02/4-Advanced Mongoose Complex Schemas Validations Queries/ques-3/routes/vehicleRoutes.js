const express = require("express");
const router = express.Router();
const controller = require("../controllers/vehicleController");

router.post("/", controller.createVehicle);
router.get("/", controller.getAllVehicles);
router.put("/:id", controller.updateVehicle);
router.delete("/:id", controller.deleteVehicle);

router.post("/:id/trips", controller.addTrip);
router.put("/:id/trips/:tripId", controller.updateTrip);
router.delete("/:id/trips/:tripId", controller.deleteTrip);
 
router.get("/query/distance-over-200", controller.tripsLongerThan200);
router.get("/query/from-metro", controller.tripsFromMetroCities);
router.get("/query/after-jan-2024", controller.tripsAfterJan2024);
router.get("/query/car-or-truck", controller.carsOrTrucks);
router.get("/:id/total-distance", controller.getTotalDistance);

module.exports = router;
