const Cars = require('./cars-model')
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  const { id } = require.body
  const check = await Cars.getById(id)
  if (check){
    next()
  }else{
    next({
      status: 404, message: `car with id ${id} is not found`
    })
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage, } = req.body
  if ( !vin || !make || !model || !mileage ){
    next ({status: 404, message: `vin ${req.body} is invalid`})
  }
  else{
    next()
  }
}

const checkVinNumberValid = async (req, res, next) => {
  const { vin } = req.body
  const valid = vinValidator.validate(vin)
  if (vin === undefined || !valid) {
    next({status: 400, message: `vin ${vin} is invalid`,
    })
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const validateVin = await Cars.findVin(req.body.vin)
  if (validateVin) {
    next({
      status: 400, message: `vin ${validateVin} already exists`
    })
  } else {
    next()
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}