const express = require('express');

const blogController = require('./controller');

const router = express.Router();

router.post('/postBlog', blogController.postBlog);

router.get('/getBlog/:myBlog_id', blogController.getBlog);

router.get('/getAllBlog', blogController.getAllBlog);

exports.routes = router;