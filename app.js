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
app.post("/user", jsonParser, async (req, res)=> {
    const reqText = req.body;
    if(!reqText) return res.sendStatus(400);

    // Объект с данными
    const user = {
      fullName: reqText.surname + " " + reqText.name,
      name: reqText.name,
      surname:reqText.surname,
      email:  reqText.email,
      password: reqText.password
    }


    //Если пользователь существует
    if(await isUserExist(user.fullName)) {
      res.status(409);
      res.json({
        response: `Пользователь с именем "${user.fullName}" уже существует` 
      });
    } else {
      await addUser(user);
      res.status(200);
      res.json({
        response: `Пользователь "${user.fullName}" зарегистрирован`
      })
    }
    
})

//ПОРТ
app.listen(PORT, () => {
  console.log(`[server]: Вот URL: http://localhost:${PORT}`);
})


//Операции с БД
async function isUserExist(fullName) {
  try {
    const res = await pool.query(`SELECT fullName FROM saveme WHERE fullName = '${fullName}'`);
    return Boolean(res[0].length); 
  } catch (error) {
    console.log(error);
    return false;
  }
  
}
//                     ↓user - объект
async function addUser(user) {
  try {
    const res = await pool.query(`INSERT INTO saveme(fullName, name, surname, email, password)
                        VALUES ('${user.fullName}', '${user.name}', '${user.surname}', '${user.email}','${user.password}');`);
    return true;
  } catch {
    return false;
  }
}



