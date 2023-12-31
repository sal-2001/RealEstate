import React from "react";
import { Link } from "react-router-dom";
import { FaBath, FaBed, FaMapMarkerAlt } from "react-icons/fa";
import { list } from "postcss";
export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[285px]">
      <Link to={`/listing/${listing._id}`} className="">
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[200px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 ">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="h-4 w-4 text-green-700" />
            <p className=" text-sm text-slate-700 truncate">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold">
            ${" "}
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="text-slate-700 font-bold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex flex-row items-center gap-1 whitespace-nowrap ">
              <FaBed className="text-lg" />
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className="flex flex-row items-center gap-1 whitespace-nowrap ">
              <FaBath className="text-lg" />
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
