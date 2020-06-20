const db = require('../data/db-config.js');
const mappers = require("../data/helpers/mappers.js");

module.exports = {
    find,
    add,
    findById,
    get,
    insert,
    update,
    remove,
};

function find() {
    return db('cars');
}

function add(car) {
    return db('cars')
      .insert(car, 'id')
      .first();
}

function findById(id) {
    return db('cars')
      .where({ id })
      .first();
}

function get(id) {
    let query = db("cars as c");
  
    if (id) {
      query.where("c.id", id).first();
  
      const promises = [query, getCarDetails(id)]; // [cars, details]
  
      return Promise.all(promises).then(function(results) {
        let [car, details] = results;
  
        if (car) {
          car.details = details;
  
          return mappers.carToBody(car);
        } else {
          return null;
        }
      });
    } else {
      return query.then(cars => {
        return cars.map(car => mappers.carToBody(car));
      });
    }
  }

function insert(car) {
    return db("cars")
      .where("id", id)
      .update(changes)
      .then(count => (count > 0 ? get(id) : null));
}

function remove(id) {
    return db("cars")
      .where("id", id)
      .del();
}

