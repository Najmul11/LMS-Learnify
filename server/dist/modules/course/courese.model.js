"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const CourseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    estimatedPrice: {
        type: Number,
    },
    thumbnail: {
        publicId: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    tags: [
        {
            type: String,
            required: true,
        },
    ],
    level: {
        type: String,
        required: true,
    },
    demoUrl: {
        type: String,
        required: true,
    },
    categories: {
        type: String,
        // required: true,
    },
    benefits: [
        {
            title: String,
        },
    ],
    prerequisites: [
        {
            title: String,
        },
    ],
    reviews: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "user",
            },
            rating: {
                type: Number,
            },
            comment: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    courseData: [
        {
            title: {
                type: String,
            },
            description: {
                type: String,
            },
            videoUrl: {
                type: String,
            },
            videoThumbnail: {
                type: Object,
            },
            videoSection: {
                type: String,
            },
            videoLength: {
                type: Number,
            },
            videoPlayer: {
                type: String,
            },
            suggestion: {
                type: String,
            },
            links: [
                {
                    title: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
            questions: [
                {
                    user: {
                        type: mongoose_1.Schema.Types.ObjectId,
                        ref: "user",
                    },
                    question: {
                        type: String,
                    },
                    questionReplies: [
                        {
                            user: {
                                type: mongoose_1.Schema.Types.ObjectId,
                                ref: "user",
                            },
                            answer: {
                                type: String,
                            },
                            createdAt: {
                                type: Date,
                                default: Date.now,
                            },
                        },
                    ],
                    createdAt: {
                        type: Date,
                        default: Date.now,
                    },
                },
            ],
        },
    ],
    ratings: {
        type: Number,
        default: 0,
    },
    purchased: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
exports.Course = (0, mongoose_1.model)("Course", CourseSchema);
