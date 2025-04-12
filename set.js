const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'BELTAH-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUdibUdKME93a21NSkRoR012bzhYcFkxVm9rSWdLenVxRE0zRm9NUzVHRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicVBHdFlFcyt5OS9jVEVvczN5UGNMTE5zYmpJVEY0RXNZcEdtN1hJYzJ4UT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3T3NGOUEzNkE4S3J5RTA0QndRWCtSR3VlVGR4SVExVXB5WkM5TFArM25NPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkVmVqcUJycXpkWjNyanFScHB6ajF4OWsvbzcxUHlDNWlid2VGRnZhd3l3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNJdkR1NG8rRnVRWkZZMCt0Ym5sdG9hQVRobmFsWlU5NXQxVTZLNmR2Mkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhNeUZLTHNxOVJjMU1naXV6MjFEalJzSFNhM3BFdjlISFBWay9OMmZhSGs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0dZUmVQeFdyYmpEanJsUGZ0aGdPaW02QmdCQmtlZEpzMStZdVQ5VDFIdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNUJsUHNyaitYd29HYTdxaEdhQnViZ3J6MDVqSU4ycGt1TDdscm5VTEJsdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlN1RHdxVHVVWkM4S1BNSkdpMWlPY0NGcGRqcmsxTDIyaEQrMkxsQ0dCOUlpQTk0ZisvaVBEZnpKVzQ1YVhZK2ZVYzhKYzhUWllnNXFpZ1A0ZzFZdmhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIwLCJhZHZTZWNyZXRLZXkiOiIzdVhQVFNlWkxLZjBiN2p3aG40SDU3K2ptQ29zRkJ1aHNsekR1QVN0Mjk4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJSblBiTmFXMVJCZU92Q2JwZUoxMEV3IiwicGhvbmVJZCI6IjdjMGQ1MjkwLWUyZWItNDNlMi1iNjA2LTU3MTE4NmViMDhmYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiUFk3U0pzbDBFaGRJbWNmbHlIcnZkdjZMTHc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUXBxZTFoQy9Sc0pQcmNlTDhkYmw5Z2RTaUhJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik02QjJKWjFSIiwibWUiOnsiaWQiOiIyMzQ5MTIyOTY5MTY4OjMzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkplcnJ5IERjIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOSGk2T29IRU5HVDY3OEdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJrWlVhUFVDYVVYanZkM3AycUc2U0lIQUJzMzdsN1JEWjB6TVpOL1lKOFZJPSIsImFjY291bnRTaWduYXR1cmUiOiJTanFZQlJ2VWY3L2dnaW4wMkh1c3JhNDNmQW1QSkU2MVowWHdNRkVObkNtcnkxRlNpU28rMW03RzhvVVFOSjRpaTRlaUZFTzEweGUyK1g1ZGFaNGVEQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiK0lEdzB5b2kvSzZ3Vng0SDJlZC9mMXkzZUgwbG92cUhnVTEzLytwRlYvbVAyOGt1emthWUQzRzNNVlcvWFZkSm50dVh1ZDhPSEFiYld4Y3hBM3J3aUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTIyOTY5MTY4OjMzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlpHVkdqMUFtbEY0NzNkNmRxaHVraUJ3QWJOKzVlMFEyZE16R1RmMkNmRlMifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDQ0ODg5Mjd9',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Beltah254/BELTAH-MD',
    OWNER_NAME : process.env.OWNER_NAME || "Beltah254",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254114141192",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    URL: process.env.URL || "https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'non',              
    EMOJIS: process.env.EMOJIS || "👻,☺️,❤️,🦚",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_CONTROL || 'no', 
    GREET : process.env.GREET || "no",            
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || 'viewed by Beltah md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTOBIO: process.env.AUTOBIO || 'yes',       
    ANTICALL_MSG : process.env.ANTICALL_MESSAGE || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VAUSV0PFCCOSB5TX9C1F",
    EVENTS :process.env.EVENTS || "yes",
    CAPTION : process.env.CAPTION || "BELTAH-MD",
    BOT : process.env.BOT_NAME || '𝗕𝗘𝗟𝗧𝗔𝗛-𝗠𝗗',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL: process.env.ANTICALL || 'yes',              
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
