import { Req, Res, Router, WebApp } from "https://deno.land/x/denorest@v3.1/mod.ts";

const app = new WebApp();

// create router
const router = new Router();

// define the home page route
router.get("/", (_req: Req, res: Res) => {
  res.reply = {
    page: "Home",
  };
});

// define the about page route
router.get("/about", (_req: Req, res: Res) => {
  res.reply = {
    page: "About",
  };
});

// assign router
app.set(router);

app.listen(8080);
