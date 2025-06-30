const VehicalModel = require("../models/Vehicle");

exports.createVehicle = async (req, res, next) => {
  try {
    const vehicle = await VehicalModel.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    next(err);
  }
};

exports.getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await VehicalModel.find();
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.updateVehicle = async (req, res, next) => {
  try {
    const vehicle = await VehicalModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};

exports.deleteVehicle = async (req, res, next) => {
  try {
    const vehicle = await VehicalModel.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    next(err);
  }
};

exports.addTrip = async (req, res, next) => {
  try {
    const vehicle = await VehicalModel.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    vehicle.trips.push(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    next(err);
  }
};

exports.updateTrip = async (req, res, next) => {
  try {
    const { id, tripId } = req.params;
    const vehicle = await VehicalModel.findById(id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    const trip = vehicle.trips.id(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    Object.assign(trip, req.body);
    await vehicle.save();
    res.json({ message: "Trip updated", trip });
  } catch (err) {
    next(err);
  }
};
 

exports.deleteTrip = async (req, res, next) => {
  try {
    const vehicle = await VehicalModel.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    vehicle.trips = vehicle.trips.filter(
      (t) => t._id.toString() !== req.params.tripId
    );
    await vehicle.save();
    res.json({ message: "Trip deleted" });
  } catch (err) {
    next(err);
  }
};

exports.tripsLongerThan200 = async (req, res, next) => {
  try {
    const vehicles = await VehicalModel.find({ "trips.distance": { $gt: 200 } });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.tripsFromMetroCities = async (req, res, next) => {
  try {
    const cities = ["Delhi", "Mumbai", "Bangalore"];
    const vehicles = await VehicalModel.find({
      "trips.startLocation": { $in: cities },
    });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.tripsAfterJan2024 = async (req, res, next) => {
  try {
    const vehicles = await VehicalModel.find({
      "trips.startTime": { $gte: new Date("2024-01-01") },
    });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.carsOrTrucks = async (req, res, next) => {
  try {
    const vehicles = await VehicalModel.find({ type: { $in: ["car", "truck"] } });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};
 

exports.getTotalDistance = async (req, res, next) => {
  try {
    const vehicle = await VehicalModel.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ totalDistance: vehicle.totalDistance() });
  } catch (err) {
    next(err);
  }
};
