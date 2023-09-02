import crypto from "crypto";

const storageNameGenerator = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");
export default storageNameGenerator;
