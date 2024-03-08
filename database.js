import mysql from "mysql2";


// БАЗУ ДАННЫЙ НАСТРАИВАТЬ ЗДЕСЬ ↓↓↓
const HOST = "127.0.0.1", // a.k.a. localhost
      USER = "user", //Имя пользователя
      PASSWORD = "2861", //Пароль пользователя
      DATABASE = "newbd"; //Конкретная бд





// Это игнорируем  смотрим выше
const dbSetting = {
    HOST,
    USER,
    PASSWORD,
    DATABASE
}

export default dbSetting;