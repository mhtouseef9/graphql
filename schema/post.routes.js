const express = require("express");
const upload = require("../middleware/image.upload");
const router = express.Router();
const postController = require("../controllers/post.contoller");
const imageController = require("../controllers/image.contoller");
const auth = require("../middleware/auth");
const authMiddlewares = [auth];

router.get("/", authMiddlewares, postController.getPostsByUser)
router.post("/upload-image", [authMiddlewares, upload.any()], imageController.uploadImages)
router.post("/", [authMiddlewares, upload.any()], postController.createPost)
router.delete("/", authMiddlewares, postController.deletePostsByUser)

module.exports = router;
