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
exports.LayoutService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ErrorHandler_1 = __importDefault(require("../../utils/ErrorHandler"));
const layout_model_1 = require("./layout.model");
const createLayout = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, bannerSubTitle, bannerTitle, faq, categories } = payload;
    const typeExist = yield layout_model_1.Layout.findOne({ type });
    if (typeExist)
        throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, `${type} already exist`);
    let result = null;
    if (type === "banner") {
        if (!bannerSubTitle || !bannerTitle)
            throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, `Please provide all information`);
        result = yield layout_model_1.Layout.create({
            type: type,
            banner: {
                title: bannerTitle,
                subTitle: bannerSubTitle,
            },
        });
    }
    if (type === "faq") {
        if (faq.length < 1)
            throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, `Please provide questiona and answers`);
        result = yield layout_model_1.Layout.create({
            type: type,
            faq,
        });
    }
    if (type === "categories") {
        if (categories.length < 1)
            throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, `Please provide needed information`);
        result = yield layout_model_1.Layout.create({
            type: type,
            categories,
        });
    }
    return result;
});
const updateBanner = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, bannerSubTitle, bannerTitle } = payload;
    const typeExist = yield layout_model_1.Layout.findOne({ type });
    if (!typeExist)
        throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, `${type} doesn't exist`);
    let result = null;
    if (type === "banner") {
        const banner = {
            type: type,
            banner: {
                title: bannerTitle ? bannerTitle : typeExist.banner.title,
                subTitle: bannerSubTitle ? bannerSubTitle : typeExist.banner.subTitle,
            },
        };
        result = yield layout_model_1.Layout.findOneAndUpdate({ type }, banner, { new: true });
    }
    return result;
});
const editLayout = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, categories, faq } = payload;
    const typeExist = yield layout_model_1.Layout.findOne({ type });
    if (!typeExist)
        throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, `${type} doesn't exist`);
    let result = null;
    if (type === "faq") {
        if (faq.length < 1)
            throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, `Please provide question  and answers`);
        const newFaq = {
            type: type,
            faq: faq,
        };
        result = yield layout_model_1.Layout.findOneAndUpdate({ type }, newFaq, { new: true });
    }
    if (type === "categories") {
        if (categories.length < 1)
            throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, `Please provide needed information`);
        const newCategories = {
            type: type,
            categories: categories,
        };
        result = yield layout_model_1.Layout.findOneAndUpdate({ type }, newCategories, {
            new: true,
        });
    }
    return result;
});
const getLayout = (type) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield layout_model_1.Layout.findOne({ type });
    return result;
});
exports.LayoutService = {
    createLayout,
    updateBanner,
    editLayout,
    getLayout,
};
