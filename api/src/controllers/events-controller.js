const { EventsCreated, Event } = require("../db");
const fs = require("fs");
const uploadImage = require("../helpers/cloudinary");
const fsExtra = require("fs-extra");

const createEvent = async (req, res) => {
  const { description, price, date, artist, place, stock, category } = req.body;
  var result;
  try {
    if (req.files?.image) {
      result = await uploadImage(req.files.image.tempFilePath);
      await fsExtra.unlink(req.files.image.tempFilePath);
    }

    const newEvent = await EventsCreated.create({
      description,
      price,
      date,
      artist,
      place,
      stock,
      category,
      image: result ? result.secure_url : "undefined",
    });
    res.json({
      eventsCreated: newEvent,
    });
  } catch (error) {
    console.log(error);
  }
};

const getEvents = async (req, res) => {
  const allEvents = await Event.findAll();
  const data = JSON.parse(fs.readFileSync("dataBase.json", "utf8"));

  if (allEvents.length === 0) {
    const events = await Event.bulkCreate(data);
    res.json(events);
  } else {
    res.json(allEvents);
  }
};

const getEventDetail = async (req, res, next) => {
  const { id } = req.params;
  let detail;

  if (id.includes("-")) {
    try {
      detail = await Event.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await EventsCreated.findOne({
        where: {
          id: id,
        },
      });
      const elem = response.dataValues;
      detail = {
        id: elem.id,
        description: elem.description,
        price: elem.price,
        date: elem.date,
        artist: elem.artist,
        place: elem.place,
        stock: elem.stock,
        category: elem.category,
      };
    } catch (error) {
      console.log(error);
    }
  }
  if (detail) {
    res.send(detail);
  } else {
    res.status(404).send("ID not found");
  }
};

const getEventsDetailDb = async (req, res) => {
  const { id } = req.params;
  let detail;

  if (id.includes("-")) {
    try {
      detail = await Event.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await Event.findOne({
        where: {
          id: id,
        },
      });
      const elem = response.dataValues;
      detail = {
        id: elem.id,
        description: elem.description,
        price: elem.price,
        date: elem.date,
        artist: elem.artist,
        place: elem.place,
        stock: elem.stock,
        category: elem.category,
      };
    } catch (error) {
      console.log(error);
    }
  }
  if (detail) {
    res.send(detail);
  } else {
    res.status(404).send("ID not found");
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventDetail,
  getEventsDetailDb,
};
