const express = require('express')
const router = express.Router({ mergeParams: true})
const Campground = require('../models/campground')
const Review = require('../models/review')
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')
const reviews = require('../controllers/reviews')




router.post('/', validateReview, isLoggedIn, catchAsync(reviews.postReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router