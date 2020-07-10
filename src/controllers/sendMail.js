import nodemailer from "nodemailer";

const controller = {
    send: async(req, res, next) => {
        const html = `<h1>¡Hola, tengo una consulta!</h1> <hr> <p>${req.body.consulta}</p>`;
        (async () => {
          let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: process.env.SENDERMAIL,
              pass: process.env.SENDERPASS,
            },
            tls: {
              rejectUnauthorized: false,
            },
          });
          console.log(req.body.email);
          await transporter
            .sendMail({
              from: req.body.email,
              to: "Actiar <proyecto.actiar@gmail.com>",
              subject: "Consulta Actiar",
              html
            })
            
            .then((info) => {
              res.send({ message: "¡Mail enviado!" });
            })
            .catch((err) => res.send(err.message));
        })();
    }
    
}

export default controller;