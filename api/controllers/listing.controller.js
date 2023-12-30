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
    res.status(200).json(updatedListing);
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
  try {
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === false) {
      //if offer is false or undefined we need all the data's with and without offer
      //so we search in the database for both offer true & false
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === false) {
      //if furnished is false or undefined we need all the data's
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === false) {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["rent", "sale"] };
    }

    //if there is no search term we need all the data, which can be obtained by empty sttring
    const searchTerm = req.query.searchTerm || "";

    //if there no need of sort then we sort based on the creation time (time stamp)
    const sort = req.query.sort || "createdAt";

    //if there is no preference order we default order it by descending order
    const order = req.query.order || "desc";

    //options i means doesn't care about uppercase and lowercase
    const litings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(litings);
  } catch (error) {
    next(error);
  }
};
