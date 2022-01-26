const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const express = require("express");
var cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

var corsOptions = {
  origin: "*",
};

app.get("/search_menu/:query", async (req, res) => {
  const query = req.params.query;

  (async = (req, response) => {
    (async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
      );

      await page.goto(`https://you.com/api/ac?q=${query}`);

      const html = await page.evaluate(() => {
        return {
          html: document.documentElement.innerHTML,
        };
      });

      const $ = cheerio.load(html.html);

      only_arr = JSON.parse($("body > pre")[0].children[0].data).filter((r) => {
        return typeof r === "object";
      });

      res.send(only_arr[0]);

      await browser.close();
    })();
  })();

  // https://you.com/api/ac?q=amazon
});

app.get(
  "/you",
  cors(corsOptions),
  (async = (req, response) => {
    (async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
      );

      await page.goto("https://you.com");

      const html = await page.evaluate(() => {
        return {
          html: document.documentElement.innerHTML,
        };
      });

      const $ = cheerio.load(html.html);

      const media_press_blogs = [];
      const developers_apps = [];
      const app_store = [];

      $(".sc-bXRjm.eGthUT > div.app_content__Tr2HC > ul > li").each(function (
        index
      ) {
        let id = index + 1;
        let title = $(this).find("a p").text();
        let link = $(this).find("a").attr("href");
        let link_img = "https://you.com" + $(this).find("a img").attr("src");
        let name = $(this).find("span").text();

        media_press_blogs.push({
          id: id,
          title: title,
          link: link,
          link_img: link_img,
          name: name,
        });
      });

      $("div:nth-child(4) > div.app_content__Tr2HC > ul > li").each(function (
        index
      ) {
        let id = index + 1;
        let title = $(this).find("a p").text();
        let link = $(this).find("a").attr("href");
        let link_img = "https://you.com" + $(this).find("a img").attr("src");
        let sub_title = $(this).find("p").text();

        developers_apps.push({
          id: id,
          title: title,
          link: link,
          link_img: link_img,
          sub_title: sub_title,
        });
      });

      $(".hJvpcn > div.app_content__Tr2HC > ul > li").each(function (index) {
        let id = index + 1;
        let img = $(this).find("img").attr("src");
        let name = $(this).find("span").text();

        app_store.push({
          id: id,
          img: `https://you.com${img}`,
          name: name,
        });
      });

      response.send({
        media_press_blogs: media_press_blogs,
        developers_apps: developers_apps,
        app_store: app_store,
      });

      await browser.close();
    })();
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
