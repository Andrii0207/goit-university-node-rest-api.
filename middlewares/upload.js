import path from "path";
import multer from "multer";
import HttpError from "../helpers/HttpError.js";


const destination = path.resolve("tmp");

const storage = multer.diskStorage({
    destination,
    filename: (req, file, callback) => {
        const uniquePreffix = `${Date.now()}_${(Math.round(Math.random()) * 1E9)}`;
        const filename = `${uniquePreffix}_${file.originalname}`;
        callback(null, filename);
    }
});

const limits = {
    fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, callback) => {
    const extension = file.originalname.split(".").pop();
    if (extension === "exe") {
        return callback(HttpError(400, ".exe extension not allow"));
    }
    if (extension !== ("jpg" || "jpeg" || "bmp")) {
        return callback(HttpError(400, "file has wrong extension"));
    }
    callback(null, true);
};

const upload = multer({
    storage,
    limits,
    fileFilter,
});

export default upload;
