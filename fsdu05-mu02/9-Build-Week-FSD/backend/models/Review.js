import mongoose from 'mongoose';

/**
 * @swagger
 * components:
 * schemas:
 * Review:
 * type: object
 * required:
 * - name
 * - rating
 * - comment
 * - user
 * properties:
 * name:
 * type: string
 * description: Name of the user who posted the review.
 * example: "Jane Doe"
 * rating:
 * type: number
 * format: float
 * minimum: 1
 * maximum: 5
 * description: Rating given by the user (1-5 stars).
 * example: 4.5
 * comment:
 * type: string
 * description: The review comment/text.
 * example: "Great product, highly recommend!"
 * user:
 * type: string
 * format: ObjectId
 * description: ID of the user who posted the review.
 * example: "60d0fe4f5a65a2001c9a0b1c"
 * # Note: If this Review model were to be a standalone collection,
 * # it would typically also have a 'product' field to link it to a product.
 * # However, in the context of the previous Product.js, reviews were embedded.
 * # This standalone definition is provided as requested.
 */
const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1, // Minimum rating of 1
      max: 5, // Maximum rating of 5
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to the User model
    },
    // If this was a standalone collection, you would typically add a product field:
    // product: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'Product', // Reference to the Product model
    // },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create the Review model from the schema
const Review = mongoose.model('Review', reviewSchema);

export default Review;
