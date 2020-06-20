
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate() //can use del();
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { vin:'12345', make:'Ferrari', model:'Tesla', mileage:10.0, color:'red'},
        { vin:'1234', make:'Merc', model:'Chevy', mileage:11.0, color:'blue'},
        { vin:'123', make:'BMW', model:'Chase', mileage:14.0, color:'red'},
        { vin:'12', make:'Honda', model:'Lexus', mileage:10.0, color:'green'},
        { vin:'121', make:'Toy', model:'Tesla', mileage:14.0, color:'red'}
      ]);
    });
};
