require("dotenv").config();
const { resolve } = require("path");

module.exports = {
    TOKEN: process.env.TOKEN || "OTAyMTM2NTc4NzM3MDc4Mjkz.GB9tlO.zbr24thdWMV7dFe2MP6h_fDIw8-b_7vqHlB-0I",  // bot token
    EMBED_COLOR: process.env.EMBED_COLOR || "#FDD175", //<= default is "#000001"
    FOOTER: process.env.FOOTER || "https://i.imgur.com/qHp10Ft.png",

    SEARCH_DEFAULT: ["meyou", "three man dowm", "jeff satur", "keshi", "qler"],


    OWNER_ID: process.env.OWNER_ID || "487940627086966796", //id เจ้าของbot

    NP_REALTIME: process.env.NP_REALTIME || "BOOLEAN", // "true" = realtime, "false" = not realtime :3 // WARNING: on set to "true" = laggy and bot will ratelimit if you have a lot of servers
    LEAVE_TIMEOUT: parseInt(process.env.LEAVE_TIMEOUT || "120000"), // leave timeout default "120000" = 2 minutes // 1000 = 1 seconds

    LANGUAGE: {
      defaultLocale: process.env.LANGUAGE || "th", // "th" = ค่าเริ่มต้น(Default)
      directory: resolve("languages"), // <= ที่อยู่ของภาษา(location of language)
    },

    DEV_ID: [], // หากคุณต้องการใช้ command bot เท่านั้น คุณสามารถใส่ id ของคุณที่นี่

    MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0", // mongo uri
    LIMIT_TRACK: parseInt(process.env.LIMIT_TRACK || "200"),  //<= ค่าสูงสุดของเพลงที่อยู่ในคิว(limit track in playlist)
    LIMIT_PLAYLIST: parseInt(process.env.LIMIT_PLAYLIST || "100"), //<= ค่าสูงสุดของplaylistที่สร้างได้(limit can create playlist per user)

    DEFAULT_SEARCH: "ytmsearch", // ตัวค้นหาเพลงเริ่มต้น(default search engine) & "ytmsearch" / "ytsearch" / "scsearch" / "spsearch"
    NODES: [
      { 
        identifier: "Lavalink",
        host: process.env.NODE_HOST || "lavalink.lexnet.cc",
        port: parseInt(process.env.NODE_PORT || "433"),
        password: process.env.NODE_PASSWORD || "lexn3tl@val!nk",
        retryAmount: 10,
        retryDelay: 7500,
        secure: true
      } 
    ],
}