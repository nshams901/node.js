const express = require('express');
const tourController = require('../controller/tourController')
// const app = express();

const router = express.Router()
router
    .get('/', tourController.getTours)
    .post('/', tourController.createTour)

router.get('/:tourId', tourController.getTour)



module.exports = router