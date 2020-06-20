module.exports = {
    intToBoolean, 
    booleanToint, 
    carToBody, 
    detailToBody,
  };
  
  function intToBoolean(int) {
    return int === 1 ? true : false;
  }
  
  function booleanToint(bool) {
    return bool === true ? 1 : 0;
  }
  
  function carToBody(car) {
    const result = {
      ...car, 
      completed: intToBoolean(car.completed),
    };
  
    if (car.details) {
      result.details = car.details.map(detail => ({
        ...detail, 
        completed: intToBoolean(detail.completed),
      }));
    }
  
    return result;
  }
  
  function detailToBody(detail) {
    return {
      ...detail, 
      completed: intToBoolean(detail.completed),
    };
  }