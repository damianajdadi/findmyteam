const { appInitConf } = require("./appConf");
const { mongoDbInit } = require("./dbConf");

const app = appInitConf();
mongoDbInit();

const Sports = require("./models/sports");
const Users = require("./models/users")


// GET filtrado
/*app.get("/api/frutas/filter", (req, res) => {

  Frutas.find(
    { $and: [{ color: { $in: ["rojo", "verde"] } }, { "size.h": { $lte: 15 } }] },
    { name: 1, qty: 1, _id: 0 },
    (err, data) => {
      if (!err) {
        res.status(200).send({
          success: 'true',
          message: 'GET: Frutas',
          frutas: data,
        });
      } else {
        throw error;
      }
    })//.sort([["qty", 1]]) //ojo! array dentro de array
  //.skip(2).limit(2);
})*/

// GET sports
app.get("/api/sports", (req, res) => {

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

/* PUT modifica una fruta
app.put("/api/frutas/:id", (req, res) => {
  Frutas.findById(req.params.id, (err, data) => {
    if (!err) {

      data.name = req.body.name ? req.body.name : data.name;
      data.qty = req.body.qty ? req.body.qty : data.qty;
      data.color = req.body.color ? req.body.color : data.color;
      data.size = req.body.size ? req.body.size : data.size;

      data.save((err) => {
        if (!err) {
          res.status(201).send({
            success: 'true',
            message: 'PUT: Fruta',
            fruta: data
          });
        } else {
          throw err;
        }
      });
    }
  });
});

// DELETE elimina una fruta
app.delete("/api/frutas/:id", (req, res) => {
  Frutas.findByIdAndDelete(req.params.id, (err, data) => {

    if (err)
      throw err;

    res.status(200).send({
      succes: true,
      message: "DELETE: Fruta",
      fruta: data
    })
  })
});*/


const PORT = 5000;
app.listen(PORT, function () {
  console.log(`API SPORTS corriendo en puerto ${PORT}`);
});