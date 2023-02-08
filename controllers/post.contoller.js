const Post = require('../models/post')

exports.createPost = async (req, res) => {
    let userId = req.user && req.user._id;
    req.body.userId = userId;
    if (req.files) {
        let images = uploadImage(req.files);
        req.body.imageURLs = images;
    }
    Post.create(req.body)
            .then(post =>
            {
                res.status(200).send(post);
            })
}

exports.getPostsByUser = (req, res) => {
    const { _id: userId } = req.user;
    Post.find({ userId })
        .sort({createdAt: "desc"})
        .then(posts =>
            // res.send(addImageHost(req, posts))
            res.send(posts)
        );
}

exports.deletePostsByUser = (req, res) => {
    const { _id: userId } = req.user;
    Post.deleteMany({ userId })
        .then(posts =>
            res.status(200)
        );
}

function uploadImage(images) {
    return images.map((image) => {
        return {original: image.path};
    })
}

const addImageHost = (req, posts) => {
    return posts.map((post) => {
        let updatedURLs = post.imageURLs.map((path) => {
            path.original = basePath(req.hostname) + path.original;
            return path;
        });
        post.imageURLs = updatedURLs
        return post;
    })
}

const basePath = (host) => {
    return "http://" + host + ":" + process.env.PORT + "/";
}

