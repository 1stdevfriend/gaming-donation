import url from "url";
import querystring from "querystring";

import { ApiError } from "../utils/ApiError.js";
import { Device } from "../models/device.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getFund = asyncHandler(async (req, res) => {
  try {
    const requestUrl = req.url;
    const parsedUrl = url.parse(requestUrl);
    const queryParams = querystring.parse(parsedUrl.query);
    if (queryParams?.device) {
      const deviceInfo = await Device.findOne({
        name: queryParams?.device,
      }).populate("donarList");
      res
        .status(200)
        .json(new ApiResponse(200, deviceInfo, "Device information"));
    } else
      throw new ApiError(
        400,
        "Bad request, Device name is required in header" + error?.message
      );
  } catch (error) {
    throw new ApiError(500, "Internal server error: " + error?.message);
  }
});

const getAllDeviceInfo = asyncHandler(async (req, res) => {
  try {
    const allDevices = await Device.find({});
    res
      .status(200)
      .json(new ApiResponse(200, allDevices, "All Devices information"));
  } catch (error) {
    throw new ApiError(500, "Internal server error: " + error?.message);
  }
});

const addDevices = asyncHandler(async (req, res) => {
  try {
    const { productList } = req.body;
    if (productList?.length > 0) {
      const result = await Device.insertMany(productList);
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            result,
            "All the devices has successfully inserted!"
          )
        );
    } else throw new ApiError(400, "Bad request" + error?.message);
  } catch (error) {
    throw new ApiError(500, "Internal server error: " + error?.message);
  }
});

const deleteAllProducts = asyncHandler(async (req, res) => {
  try {
    const result = await Device.deleteMany({});
    res
      .status(200)
      .json(new ApiResponse(200, result, "Successfully deleted all data..!"));
  } catch (error) {
    throw new ApiError(500, "Internal server error: " + error?.message);
  }
});

export { getFund, getAllDeviceInfo, addDevices, deleteAllProducts };
