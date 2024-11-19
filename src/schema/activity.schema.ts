const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for transfer options
const TransferOptionSchema = new Schema({
  option: { type: String, required: true }, // e.g., "option1"
  charge: { type: Number, required: true }, // Cost for the transfer option
});

// Schema for package types
const PackageTypeSchema = new Schema({
  id: { type: Number, required: true }, // Unique identifier for the package
  name: { type: String, required: true }, // Package name (e.g., "Half Day")
  charges: { type: Number, required: true }, // Base charges for the package
  transferOptions: [TransferOptionSchema], // Available transfer options for the package
});

// Main schema for activities
export const ActivitySchema = new Schema({
  activityId: { type: String, required: true, unique: true }, // Unique identifier for the activity
  name: { type: String, required: true }, // Activity name (e.g., "Atlantis Water Park")
  location: { type: String, required: true }, // Location of the activity
  tag: { type: String, required: true }, // Tag for categorization (e.g., "Adventure")
  noOfReviews: { type: Number, default: 0 }, // Number of reviews
  noOfHours: { type: Number, required: true }, // Duration in hours
  basePrice: {
    adult: { type: Number, required: true }, // Base price for adults
    child: { type: Number, required: true }, // Base price for children
    infant: { type: Number, required: true }, // Base price for infants
  },
  images: [{ type: String, required: true }], // Array of image URLs
  packagetype: [PackageTypeSchema], // Array of package types
  rating: { type: Number, default: 0 }, // Overall rating
});

