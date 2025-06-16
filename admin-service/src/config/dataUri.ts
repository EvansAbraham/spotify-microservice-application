import path from "path";
import DataURIParser from "datauri/parser.js";

const getBuffer = (file: any) => {
    const parser = new DataURIParser();
    const extName = path.extname(file.originalname).toString();

    return parser.format(extName, file.buffer);
};

export default getBuffer;