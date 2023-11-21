"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodemailerHelper = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const http_status_1 = __importDefault(require("http-status"));
const path_1 = __importDefault(require("path"));
const ErrorHandler_1 = __importDefault(require("./ErrorHandler"));
const ejs_1 = __importDefault(require("ejs"));
const transporter = nodemailer_1.default.createTransport({
    host: config_1.default.smtp.host,
    port: Number(config_1.default.smtp.port),
    auth: {
        user: config_1.default.smtp.mail,
        pass: config_1.default.smtp.password,
    },
});
const sendEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, subject, template, data } = options;
        const templatePath = path_1.default.join(__dirname, "../ejs", template);
        const html = yield ejs_1.default.renderFile(templatePath, data);
        const mailInfo = {
            from: config_1.default.smtp.mail,
            to: email,
            subject,
            html,
        };
        transporter.sendMail(mailInfo);
    }
    catch (error) {
        throw new ErrorHandler_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to send email");
    }
});
exports.nodemailerHelper = {
    sendEmail,
};
