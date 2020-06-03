const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        // It replaces colons" : " with dashes.
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');
        cb(null, date + file.originalname);
        // cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb)=>{
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024
},
fileFilter: fileFilter
});

const Product = require('../models/product')

// GET all Post
router.get('/', async (req, res) => {
    try {
        const gets = await Product.find();
        res.status(200).json(gets)
    } catch (err) {
        res.status(500).json({ message: err })
    }
});

// GET a single post by id
router.get('/:_id', async (req, res) => {
    try {
        const singleProduct = await Product.findById(req.params._id);
        res.status(200).json(singleProduct);
    } catch (err) {
        res.status(500).json({ message: err })
    }
});


// make a Post to the DB
router.post('/', upload.single('productImage'), async (req, res) => {
    console.log(req.file);
    const post = new Product({
        productImage: req.file.path,
        name: req.body.name,
        spec: req.body.spec,
        available: req.body.available,
        price: req.body.price
    });
    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json({ message: err })
    }
});

// Update post
router.patch('/:_id', async (req, res) => {
    try {
        const updatePost = await Product.updateOne(
            { _id: req.params._id },
            {
                $set: {
                    productImage: req.file.path,
                    name: req.body.name,
                    spec: req.body.spec,
                    available: req.body.available,
                    price: req.body.price
                }
            }
        );
        res.status(200).json(updatePost);
    } catch (err) {
        res.status(500).json({ message: err })
    }
})

// Delete a Post
router.delete('/:_id', async (req, res) => {
    try {
        const removePost = await Product.remove({ _id: req.params._id });
        res.status(200).json(removePost);
    } catch (err) {
        res.status(500).json({ message: err })
    }
})

module.exports = router;