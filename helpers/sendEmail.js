import nodemailer from "nodemailer";
import "dotenv/config";

const { UKRNET_NET_PASSWORD, UKRNET_NET_FROM } = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
        user: UKRNET_NET_FROM,
        pass: UKRNET_NET_PASSWORD,
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = data => {
    const email = { ...data, from: UKRNET_NET_FROM };
    return transport.sendMail(email);
}

export default sendEmail;
