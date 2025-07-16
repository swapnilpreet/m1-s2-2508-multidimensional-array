import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js';

// @desc    Get personalized medicine recommendations
// @route   GET /api/recommendations
// @access  Private
const getPersonalizedRecommendations = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Placeholder for AI logic:
  // For simplicity, let's recommend based on:
  // 1. User's past purchases
  // 2. Products with similar categories/brands to past purchases
  // 3. (Optional) Basic recommendations for common conditions based on user's medical history (if available and relevant)

  const userOrders = await Order.find({ user: userId }).select('orderItems.product');
  const purchasedProductIds = userOrders.flatMap(order => order.orderItems.map(item => item.product));

  const recommendedProducts = [];

  // Get products similar to purchased ones
  if (purchasedProductIds.length > 0) {
    const purchasedProducts = await Product.find({ _id: { $in: purchasedProductIds } });
    const categories = [...new Set(purchasedProducts.map(p => p.category))];
    const brands = [...new Set(purchasedProducts.map(p => p.brand))];

    // Find other products in the same categories/brands, excluding already purchased ones
    const similarProducts = await Product.find({
      $or: [{ category: { $in: categories } }, { brand: { $in: brands } }],
      _id: { $nin: purchasedProductIds },
    }).limit(5); // Limit to 5 similar products
    recommendedProducts.push(...similarProducts);
  }

  // Add some general popular products if not enough recommendations
  if (recommendedProducts.length < 5) {
    const popularProducts = await Product.find({}).sort({ numReviews: -1 }).limit(5 - recommendedProducts.length);
    recommendedProducts.push(...popularProducts);
  }

  // Deduplicate and send
  const uniqueRecommendations = Array.from(new Set(recommendedProducts.map(p => p._id.toString())))
    .map(id => recommendedProducts.find(p => p._id.toString() === id));


  res.json(uniqueRecommendations);
});

// @desc    Get recommendations based on search term/symptoms (simplified)
// @route   GET /api/recommendations/symptoms
// @access  Public (can be private if symptom history is involved)
const getSymptomRecommendations = asyncHandler(async (req, res) => {
    const { symptoms } = req.query; // symptoms could be a comma-separated string like "fever,cough"

    if (!symptoms) {
        return res.json([]);
    }

    const symptomArray = symptoms.split(',').map(s => s.trim().toLowerCase());

    // Basic mapping of symptoms to categories/keywords
    const productKeywords = [];
    if (symptomArray.includes('fever')) productKeywords.push('pain relief', 'fever reducer');
    if (symptomArray.includes('cough')) productKeywords.push('cough syrup', 'cold & flu');
    if (symptomArray.includes('headache')) productKeywords.push('pain relief');
    if (symptomArray.includes('allergies')) productKeywords.push('allergy relief');
    // Add more mappings as needed

    const recommendedProducts = await Product.find({
        $or: [
            { name: { $in: productKeywords.map(kw => new RegExp(kw, 'i')) } },
            { description: { $in: productKeywords.map(kw => new RegExp(kw, 'i')) } },
            { category: { $in: productKeywords.map(kw => new RegExp(kw, 'i')) } },
        ]
    }).limit(5);

    res.json(recommendedProducts);
});


export { getPersonalizedRecommendations, getSymptomRecommendations };