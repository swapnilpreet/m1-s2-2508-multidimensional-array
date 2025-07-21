import asyncHandler from 'express-async-handler';
import Review from '../models/Review.js'; // Assuming Review model exists
import MedicineModel from '../models/Medicine.js';
//user
const getMedicine = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const category = req.query.category
    ? {
        category: req.query.category,
      }
    : {};

  const brand = req.query.brand
    ? {
        brand: req.query.brand,
      }
    : {};

  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : 0;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : Infinity;

  const filters = {
    ...keyword,
    ...category,
    ...brand,
    price: { $gte: minPrice, $lte: maxPrice },
  };

  const count = await MedicineModel.countDocuments(filters);

  const Medicines = await MedicineModel.find(filters)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  const allMedicines = await MedicineModel.find({}, "brand");
  const brandSet = new Set(allMedicines.map((med) => med.brand));
  const brandList = Array.from(brandSet);

  res.json({
    Medicines,
    page,
    pages: Math.ceil(count / pageSize),
    count,
    brandList,
  });
});


const getMedicineById = asyncHandler(async (req, res) => {
  const Medicine = await MedicineModel.findById(req.params.id);

  if (Medicine) {
    res.json(Medicine);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//admin
const createMedicine = asyncHandler(async (req, res) => {
  const { name, image, brand, category, description, price,  countInStock } = req.body;

  const Medicine = new MedicineModel({
    name: name || 'Sample Name',
    price: price || 0,
    user: req.user._id, // User who created it (admin)
    image: image || '/images/sample.jpg',
    brand: brand || 'Sample Brand',
    category: category || 'Sample Category',
    countInStock: countInStock || 0,
    numReviews: 0,
    description: description || 'Sample Description',
  });

  const createdMedicine = await Medicine.save();
  res.status(201).json(createdMedicine);
});

//admin
const updateMedicine = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  const Medicine = await MedicineModel.findById(req.params.id);

  if (Medicine) {
    Medicine.name = name || Medicine.name;
    Medicine.price = price || Medicine.price;
    Medicine.description = description || Medicine.description;
    Medicine.image = image || Medicine.image;
    Medicine.brand = brand || Medicine.brand;
    Medicine.category = category || Medicine.category;
    Medicine.countInStock = countInStock !== undefined ? countInStock : Medicine.countInStock;

    const updatedMedicine = await Medicine.save();
    res.json(updatedMedicine);
  } else {
    res.status(404);
    throw new Error('Medicine not found');
  }
});

//admin
const deleteMedicine = asyncHandler(async (req, res) => {
  const Medicine = await MedicineModel.findById(req.params.id);

  if (Medicine) {
    await MedicineModel.deleteOne({ _id: Medicine._id }); 
    res.json({ message: 'Medicine removed' });
  } else {
    res.status(404);
    throw new Error('Medicine not found');
  }
});

//user
const createMedicineReview = asyncHandler(async (req, res) => {
  const {rating,comment}=req.body;

  const Medicine=await MedicineModel.findById(req.params.id);

  if (Medicine){
    const alreadyReviewed = Medicine.reviews.find(
      (r)=>r.user.toString()===req.user._id.toString()
    );
    if(alreadyReviewed){
      res.status(400);
      throw new Error('Medicine already reviewed');
    }
    const review={
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    Medicine.reviews.push(review);
    Medicine.numReviews=Medicine.reviews.length;
    Medicine.rating=Medicine.reviews.reduce((acc,item)=>item.rating+acc,0)/Medicine.reviews.length;

    await Medicine.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Medicine not found');
  }
});


export {
  getMedicine,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  createMedicineReview,
};