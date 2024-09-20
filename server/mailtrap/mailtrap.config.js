import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();  

const TOKEN = process.env.MAILTRAP_TOKEN;
console.log(TOKEN);



export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};


