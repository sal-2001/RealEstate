import { Listing } from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
export const deleteListing = async (req, res, next) => {
  // check wheather the listing exist or not
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }
  // check if the listing belong to the current user
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  //if the listing doesn't exist
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }
  //if the listing doesn't belong to this particular user
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only access your own listing"));
  }

  try {
    //new: true is required, as if we won't write it, it is going to produce the previouse data, not the updated one
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json("Updated listing successfully");
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  //if the listing doesn't exist
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }
  console.log(req);
  try {
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
