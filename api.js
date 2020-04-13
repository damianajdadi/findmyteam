const { appInitConf } = require("./appConf");
const { mongoDbInit } = require("./dbConf");

const app = appInitConf();
mongoDbInit();

const log = require("./log");

const Sports = require("./models/sports");
const Users = require("./models/users");
const Offers = require("./models/offers");
const Applies = require("./models/applies");

// GET sports
app.get("/api/sports", (req, res) => {
  log.writeLog(req);
  Sports.find((err, data) => {
    if (!err) {
      res.status(200).send({
        success: 'true',
        message: 'GET: SPORTS',
        sports: data,
      });
    } else {
      throw error;
    }
  });
});



// GET ONE sport
app.get("/api/sports/:id", (req, res) => {
  log.writeLog(req);
  Sports.findById(req.params.id, (err, data) => {
    if (!err) {
      res.status(200).send({
        success: 'true',
        message: 'GET ONE: SPORTS',
        positions: data,
      });
    } else {
      throw error;
    }
  });
});

// GET users
app.get("/api/users", (req, res) => {
  log.writeLog(req);
  Users.find((err, data) => {
    if (!err) {
      res.status(200).send({
        success: 'true',
        message: 'GET: USERS',
        users: data,
      });
    } else {
      throw error;
    }
  });
});

//GET ONE user
app.get("/api/users/:id", (req, res) => {
  log.writeLog(req);
  Users.findById(req.params.id, (err, data) => {
    if (!err) {
      res.status(200).send({
        success: 'true',
        message: 'GET ONE: USERS',
        users: data,
      });
    } else {
      throw error;
    }
  });
});

// POST ONE USER
app.post("/api/users", (req, res) => {
  log.writeLog(req);
  const user = new Users({
    email: req.body.email,
    password: req.body.password,
    type: req.body.type,
  });

  user.save((err) => {
    if (!err) {
      res.status(201).send({
        success: 'true',
        message: 'POST ONE: User',
        user
      });
    } else {
      throw error;
    }
  });
});



//LOGIN -> POST 

app.post("/api/users/login", (req, res) => {
  log.writeLog(req);
  Users.find(
    { $and: [{ "email": req.body.email }, { "password": req.body.password }] },
    (err, data) => {
      if (data.length !== 0) {
        res.status(200).send({
          success: "true",
          message: "User encontrado",
          user: data
        })
      } else {
        res.status(401).send({
          success: "false",
          message: "User y/o password no encontrados",
        })
      }
    }
  )
});

//PUT modifica un usuario
app.put("/api/users/:id", (req, res) => {
  log.writeLog(req);
  Users.findById(req.params.id, (err, data) => {
    if (!err) {

      data.password = req.body.password ? req.body.password : data.password;
      data.name = req.body.name ? req.body.name : data.name;
      data.surname = req.body.surname ? req.body.surname : data.surname;
      data.sport = req.body.sport ? req.body.sport : data.sport;
      data.position = req.body.position ? req.body.position : data.position;
      data.phone = req.body.phone ? req.body.phone : data.phone;
      data.dominantLeg = req.body.dominantLeg ? req.body.dominantLeg : data.dominantLeg;
      data.age = req.body.age ? req.body.age : data.age;
      data.experience = req.body.experience ? req.body.experience : data.experience;
      data.city = req.body.city ? req.body.city : data.city;

      data.save((err) => {
        if (!err) {
          res.status(201).send({
            success: 'true',
            message: 'PUT: User',
            user: data
          });
        } else {
          throw err;
        }
      });
    }
  });
});

// DELETE elimina un usuario
app.delete("/api/users/:id", (req, res) => {
  log.writeLog(req);
  Users.findByIdAndDelete(req.params.id, (err, data) => {

    if (err)
      throw err;

    res.status(200).send({
      succes: true,
      message: "DELETE: Usuario",
      user: data
    })
  })
});

// GET offers
app.get("/api/offers", (req, res) => {
  log.writeLog(req);
  Offers.find((err, data) => {
    if (!err) {
      res.status(200).send({
        success: 'true',
        message: 'GET: OFFERS',
        offers: data,
      });
    } else {
      throw error;
    }
  });
});


// GET ONE offer
app.get("/api/offers/:id", (req, res) => {
  log.writeLog(req);
  Offers.findById(req.params.id, (err, data) => {
    if (!err) {
      res.status(200).send({
        success: 'true',
        message: 'GET ONE: OFFERS',
        offers: data,
      });
    } else {
      throw error;
    }
  });
});

// POST ONE OFFER
app.post("/api/offers", (req, res) => {
  log.writeLog(req);
  Users.findById(req.body.team_id, (err, data) => {
    let user = data;
    const offer = new Offers({
      team: user,
      sport: req.body.sport,
      position: req.body.position,
      city: req.body.city,
      notes: req.body.notes
    });
    offer.save((err) => {
      if (!err) {
        res.status(201).send({
          success: 'true',
          message: 'POST ONE: OFFER',
          offer
        });
      } else {
        throw error;
      }
    });
  });
});



//POST SEARCH
app.post("/api/offers/search", (req, res) => {
  log.writeLog(req);
  const andArray = [];
  if (req.body.sport !== undefined) {
    andArray.push({ "sport._id": req.body.sport._id })
  }

  if (req.body.position !== undefined) {
    andArray.push({ "position._id": req.body.position._id })
  }

  if (req.body.city !== undefined) {
    andArray.push({ "city": req.body.city })
  }

  Offers.find(
    { $and: andArray },
    (err, data) => {
      if (data.length !== 0) {
        res.status(200).send({
          success: "true",
          message: "Ofertas encontradas",
          offer: data
        })
      } else {
        res.status(401).send({
          success: "false",
          message: "Ofertas no encontradas",
        })
      }
    }
  )
}
);



// DELETE elimina una oferta
app.delete("/api/offers/:id", (req, res) => {
  log.writeLog(req);
  Offers.findByIdAndDelete(req.params.id, (err, data) => {

    if (err)
      throw err;

    res.status(200).send({
      succes: true,
      message: "DELETE: Oferta",
      oferta: data
    })
  })
});

// GET applies
app.get("/api/applies", (req, res) => {
  log.writeLog(req);
  if (req.query && req.query.offer_id) {
    Applies.find({ "offer._id": req.query.offer_id }, (err, data) => {
      if (!err) {
        res.status(200).send({
          success: 'true',
          message: 'GET: OFFERS',
          applies: data,
        });
      } else {
        throw error;
      }
    })
  } else {
    Applies.find((err, data) => {
      if (!err) {
        res.status(200).send({
          success: 'true',
          message: 'GET: OFFERS',
          applies: data,
        });
      } else {
        throw error;
      }
    });
  }
});

// POST ONE APPLY
app.post("/api/applies", (req, res) => {
  log.writeLog(req);
  const apply = new Applies({
    player: req.body.user,
    offer: req.body.offer,
  });
  apply.save((err) => {
    if (!err) {
      res.status(201).send({
        success: 'true',
        message: 'POST ONE: APPLY',
        apply
      });
    } else {
      throw error;
    }
  });
});

// DELETE elimina una APPLY
app.delete("/api/applies/:id", (req, res) => {
  log.writeLog(req);
  Applies.findByIdAndDelete(req.params.id, (err, data) => {

    if (err)
      throw err;

    res.status(200).send({
      succes: true,
      message: "DELETE: Apply",
      apply: data
    })
  })
});


const PORT = 5000;
app.listen(PORT, function () {
  console.log(`API SPORTS corriendo en puerto ${PORT}`);
});