const db = require('../../data/db-config')
const getAll = async() => {
  const result = await db('cars')
  return result
}

const getById = async(id) => {
const result = await db('cars').select().where({car_id: id}).first()
return result
}

const create = async(car) => {
  const [id] = await db('car').insert(car)
  const newCar = await getById(id)
  return newCar
}

module.exports={
  getAll,
  getById,
  create
}
