require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./DB");

// console.log(db);
const app = express();

// json middelware
app.use(express.json());
// cors middel ware
app.use(cors());

// get all todo list and respective task
app.get("/api/v1/todo/", async (req, res) => {
  try {
    const response = await db.query(
      "select id, date, title, string_agg(action, ',') as tasks from (select * from dates left join (select date_id, action, done from actions) as act on dates.id =  act.date_id) as temp group by id, date, title order by id desc;"
    );
    console.log(response.rows);
    console.log(response);
    res.status(200).json({
      status: "success",
      data: { todolist: response.rows },
    });
  } catch (error) {
    console.log(error);
  }
});

// create a new task and add it to the data base
app.post("/api/v1/todo/addtodo", async (req, res) => {
  try {
    const response = await db.query(
      "insert into dates (date, title) values (NOW(), $1) returning *",
      [req.body.title]
    );
    // console.log(response);

    const queryStrings = req.body.actions.map((value) => {
      console.log(response.rows[0].id);
      console.log(value);
      return (
        "insert into actions (date_id, action, done) values (" +
        "'" +
        response.rows[0].id +
        "'" +
        "," +
        "'" +
        value +
        "'" +
        ", false);"
      );
    });

    console.log(queryStrings);

    const queryString = queryStrings.join("");

    const response1 = await db.query(queryString);
    res.status(200).json({
      status: "success",
      data: response.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

// delete a todo based on its id
app.delete("/api/v1/todo/delete/:id", async (req, res) => {
  try {
    const response1 = await db.query("delete from actions where date_id = $1", [
      req.params.id,
    ]);
    const response = await db.query(
      "delete from dates where id = $1 returning *",
      [req.params.id]
    );
    console.log(response);
    res.status(205).json({
      status: "success",
      data: response.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

// update a title todo based on its id
app.put("/api/v1/todo/updatetitle/:id", async (req, res) => {
  try {
    const response = await db.query(
      "update dates set date = NOW(), title = $1 where id = $2 returning *",
      [req.body.title, req.params.id]
    );
    // console.log(response);
    res.status(205).json({
      status: "success",
      data: response.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

// get a todo task and its corresponding tasks data
app.get("/api/v1/todo/:id", async (req, res) => {
  try {
    // console.log(req.params);
    const datesResponse = await db.query("select * from dates where id = $1 ", [
      req.params.id,
    ]);
    const actionsResponse = await db.query(
      "select * from actions where date_id = $1",
      [req.params.id]
    );
    // console.log(datesResponse);
    // console.log(actionsResponse);
    res.status(200).json({
      status: "success",
      data: {
        todoData: datesResponse.rows[0],
        tasksData: actionsResponse.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// update action of a todo for given id
app.put("/api/v1/todo/updateaction/:id", async (req, res) => {
  try {
    // console.log(req);
    console.log("'" + req.body.action + "'", req.body.done, req.params.id);
    const response = await db.query(
      "update actions set action =$1, done = $2 where id = $3 returning *",
      [req.body.action, req.body.done, req.params.id]
    );
    console.log(response);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

// add a new task for given date_id
app.post("/api/v1/todo/addtask", async (req, res) => {
  try {
    const response = await db.query(
      "insert into actions (date_id, action,done) values($1, $2, $3) returning *",
      [req.body.date_id, req.body.action, false]
    );
    console.log(response);
    res.status(200).json({
      status: "success",
      data: response.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

// delete a task based on its id
app.delete("/api/v1/todo/deletetask/:id", async (req, res) => {
  await db.query("delete from actions where id = $1 ", [req.params.id]);
  res.status(200).json({
    status: "success",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
