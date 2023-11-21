"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importStar(require("../../middleware/auth"));
const layout_controller_1 = require("./layout.controller");
const multer_1 = __importDefault(require("../../middleware/multer"));
const router = express_1.default.Router();
router.post("/create-layout", auth_1.default, (0, auth_1.authorizeRoles)(auth_1.ENUM_USER_ROLE.ADMIN), multer_1.default, layout_controller_1.LayoutController.createLayout);
router.patch("/update-banner", auth_1.default, (0, auth_1.authorizeRoles)(auth_1.ENUM_USER_ROLE.ADMIN), multer_1.default, layout_controller_1.LayoutController.updateBanner);
router.patch("/edit-layout", auth_1.default, (0, auth_1.authorizeRoles)(auth_1.ENUM_USER_ROLE.ADMIN), layout_controller_1.LayoutController.editLayout);
router.get("/get-layout/:type", layout_controller_1.LayoutController.getLayout);
exports.LayoutRoutes = router;
