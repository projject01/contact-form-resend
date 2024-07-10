import express, { Response, Request } from "express";
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

var app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get("/", function (req: Request, res: Response) {
  res.send("Contact form API");
});

app.post("/", async function (req: Request, res: Response) {

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL as string,
    to: process.env.RESEND_TO_EMAIL as string,
    subject: `${req.body.email} - ${req.body.subject}`,
    text: req.body.message,
  });
  res.redirect('/success.html');
});

if (!module.parent) {
  app.listen(3000);
  console.log("Express started on port 3000");
}

export default app;
