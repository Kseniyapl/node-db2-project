
const router = require("express").Router()
const Cars = require("./cars-model")
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware")

router.get('/', async (req, res, next) => {
    try{
        const allCars = await Cars.getAll()
        res.status(200).json(allCars)
    }
    catch(err) {
        next(err)
    }
})
router.get('/:id', checkCarId, async (req, res, next) => {
    try{
        const {id} = req.params
        const car = await Cars.getById(id)
        res.status(200).json(car)
    }
    catch(err) {
        next(err)
    }
})
router.post(
    '/',
    [checkCarPayload, checkVinNumberValid, checkVinNumberUnique],
    async (req, res, next) => {
      try {
        const newCar = await Cars.create(req.car)
        res.json(newCar)
      } catch (err) {
        next(err)
      }
    }
  )
router.use((err, req, res, next) => { 
    res.status(err.status || 500).json({
      message: `${err.message}`
    })
  })
  

module.exports = router

 
//   - `[GET] /api/cars` returns an array of cars sorted by id (or an empty array if there aren't any).
//   - `[GET] /api/cars/:id` returns a car by the given id.
//   - `[POST] /api/cars` returns the created car.