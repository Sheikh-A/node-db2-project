const express = require('express');
const db = require('../data/db-config.js');

const router = express.Router();


//validation
const validatePost = (req, res, next) => {
    const body = req.body;

    if(!body.vin || !body.model || !body.make || !body.mileage) {
        res.status(400).json({message: "Please enter all required fields"});
    } else if (typeof body.mileage !== "number") {
        res.status(400).json({ message: "Please enter a number decimal for mileage" });
    } else {
        next();
    }
};



router.get('/', (req,res) => {
    const orderby = req.query.orderby || "name";
    const limit = req.query.limit || -1;
    const sortdir = req.query.sortdir || "desc";
    
    db('cars')
      .then(cars => {
          res.json(cars);
      })
      .catch(err => {
          res.status(500).json({message: 'Failed to retrieve cars'});
      });
});

router.get('/:id', (req,res) => {
    const {id} = req.params;

    db('cars')
      .where({ id }).first()
      .then(car => {
          res.status(200).json({car});
      })
      .catch(err => {
          res.status(500).json({ message: 'Failed to get car', err });
      });
});

router.post("/", validatePost, (req, res) => {
    const body = req.body;
    db("cars")
      .insert(body)
      .then(data => {
          res.status(200).json({ data });
      })
      .catch(err => {
          res.status(500).json({
              message: "error occured for post", err
          });
      });
});

router.put("/:id", validatePost, (req, res) => {
    const changes = req.body;
    const { id } = req.params;

    db("cars")
      .where({ id })
      .update(changes)
      .then(update => {
          if(update) {
              res.status(200).json({message: `Success updating post ${id}`, update});
          } else {
              res.status(404).json({ messsage: `The id ${id} could not be found` });
          }
      })
      .catch(err => {
          res.status(500).json({ message: "Error with DB editing this car", err })
      });
});

// DELETE
router.delete('/:id', (req, res) => {
    db("cars")
      .where({ id: req.params.id })
      .del()
      .then((count) => {
        if(count > 0) {
          res.status(200).json({ message: "record deleted successfully" });
        } else {
          res.status(400).json({ message: "car not found" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Sorry, ran into an error" });
      })
  })

module.exports = router;


/*
//? Using knex migrations, design and write a schema for the cars table using the specifications below.
//? Configure knex to connect to a /data/car-dealer.db3 database using the sqlite3 npm module.
//? Write endpoints to support CREATE and READ operations on the cars resource 
//? Use a rest client like Insomnia to test your API
const express = require("express");
// db access using knex
const db = require("../data/db-config.js"); // connection to the db

const router = express.Router();

const mw = require('../api/middleware.js');

// These are related to cars - resource
// the router handles endpoints that begin with /api/cars

// READ - add an endpoint that returns all the details for a car
router.get("/", (req, res) => {
 // get the data from the db
  db('cars')
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to retrieve data' });
    });
});

// READ 
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db('cars')
    .where({ id })
    .first()
    .then(cars => {
      res.json(cars);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to retrieve cars by id' });
    });
});

// CREATE
router.post("/", (req, res) => {
  db("cars")
    .insert(req.body, "id") // second argument for postgres and other dbs except sqlite3
    .then(ids => {
      res.status(201).json({ newID: ids }); // worked on Insomnia
    })
    .catch(err => {
      console.log('Post error', err);
      res.status(500).json({ message: "Failed to store data" });
    });
});

// UPDATE
router.put('/:id', (req, res) => {
  const changes = req.body;

  db("cars")
    .where({ id: req.params.id })
    .update(changes)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "record updated successfully" }); // worked on insomnia
      } else {
        res.status(400).json({ message: "account not updated" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "sorry, ran into an error" });
    });
  });

// DELETE
router.delete('/:id', (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .del()
    .then((count) => {
      if(count > 0) {
        res.status(200).json({ message: "record deleted successfully" });
      } else {
        res.status(400).json({ message: "car not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Sorry, ran into an error" });
    })
})

module.exports = router;

*/