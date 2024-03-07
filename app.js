import express from "express";
import cors from "cors";
import mysql from "mysql2";

// Настроечки
const app = express(),
      PORT = 5678 || null,
      jsonParser = express.json();

// CORS - штука, чтобы к моему серверу могли обращаться все
app.use(cors());



//MYSQL - настроечки
const pool = mysql.createPool({
  host: "127.0.0.1", // a.k.a localhost
  user: "user",
  password: "2861",
  database: 'newbd'
}).promise();

//При POST запросе на /users
app.post("/user", jsonParser, (req, res)=> {
    const reqText = req.body;
    if(!reqText) return res.sendStatus(400);
    const name = reqText.name,
          surname = reqText.surname,
          email = reqText.email,
          password = reqText.password;
    const fullName = name + " " + surname;

    const responseText = `Тут написано, что вас зовут: ${name+ " " +surname}`;
    console.log("Мы вернули: " + query(fullName));


    // res.status(200);
    // res.json({
    //     answer: responseText,
    //     fullName: reqText.name + " " +reqText.surname,
    //     name,
    //     surname,
    //     email,
    //     password
    // }); 
})

//ПОРТ
app.listen(PORT, () => {
  console.log(`[server]: Вот URL: http://localhost:${PORT}`);
})


//Запрос в бд
function query(fullName) {
  return pool.query(`SELECT * FROM saveme WHERE fullName='${fullName}';`)
         .then(data => data[0])
}