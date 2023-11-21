"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
const mongoose_1 = require("mongoose");
const LayoutSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ["banner", "faq", "categories"],
        unique: true,
    },
    faq: {
        type: [
            {
                question: {
                    type: String,
                },
                answer: {
                    type: String,
                },
            },
        ],
        default: undefined,
    },
    banner: {
        type: {
            title: {
                type: String,
            },
            subTitle: {
                type: String,
            },
        },
        default: undefined,
    },
    categories: {
        type: [
            {
                categoryTitle: {
                    type: String,
                },
            },
        ],
        default: undefined,
    },
});
exports.Layout = (0, mongoose_1.model)("Layout", LayoutSchema);
