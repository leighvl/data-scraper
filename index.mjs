import fs from "fs";
import cheerio from "cheerio";
import axios from "axios";

const url = "https://carnaldish.com/recipes/roasted-sweet-potatoes-with-savory-cider-caramel/" //Page being scraped

let page
try {
  page = fs.readFileSync("page.html", "utf8");
} catch (e) {
  //Fetch using axios
  page = await axios(url).then((res) => res.data);
  fs.writeFileSync("page.html", page, {});
}

//Load Cheerio to manage page

const $ = cheerio.load(page);

// //Using the html page, identify what classes(.) or Ids(#) can be used to identify the pieces of page that

const recipes = $('#tasty-recipes-6510')
  .map((__, row) => {
    const title = $(row).find('h2').text();

    console.log({ title });
  }).get();

// const rows = $('#content .container')
//   .map((i, row) => {
//     const title = $(row).find('h4').text();

//     const verseRow = $(row).find('div.row.text.verse-group'); //Based on identfiers in html of page in example

//     const verses = verseRow.map((__, verseRow) => {
//       const who = $(verseRow).find('span3')
//         .map((___, span) => {
//           const verse = $(span).find('strong').text();

//           //console.log({ verse });

//           const sups = $(span).find('sup').map((____, sup) => {
//             return parseInt($(sup).text(), 10);
//           }).get();
//           //console.log({ sups });

//           //Format using templating
//           const supText = sups.length ? `:${sups[0]}-${sups[sups.length - 1]}` : '';

//           return `${verse}${supText}`.trim();
//         }).get();
//     }).get();

//     console.log({ title });

//     return { title: title, verses: verses };
//   }).get();

// fs.writeFileSync('data.json', JSON.stringify(rows), {});

//Can then convert JSON to CSV to get format