import multer from "multer";
import HttpError from "../helpers/HttpError.js";

function handleMulterValidate(upload) {
    return (req, res, next) => {
        upload(req, res, error => {
            if (error instanceof multer.MulterError) {
                next(HttpError(400, error));
            } else if (error) {
                next(error);
            }
            next();
        });
    };
}

export default handleMulterValidate;