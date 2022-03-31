let express = require("express");
let csv = require("csv");
let app = express();
const fs = require("fs");

const PORT = process.env.PORT || 3000;

let colleges;

fs.readFile("db/database.csv", (err, data) => {
  console.log("[cAPi] : File read !");

  csv.parse(data, function (err, data) {
    colleges = data;

    console.log("[cAPi] : CSV Loaded !");
  });
});

app.get("/", function (req, res) {
  res.send("Colleges API : SriGuru Institute of Technology, Coimbatore");
});

app.post("/colleges/total", function (req, res) {
  const str = {
    total: colleges.length,
  };

  res.json(str).end();
});

app.post("/colleges/search", function (req, res) {
  let keyword = req.headers.keyword.toLowerCase();
  let result = [];

  for (let i = 0; i < colleges.length; i++) {
    if (colleges[i][2].toLowerCase().indexOf(keyword) >= 0) {
      colleges[i][2] = colleges[i][2].replace(/\:[^>]*\)/gi, "");
      colleges[i][2] = colleges[i][2].replace(/(\(Id)/gi, "");

      colleges[i][1] = colleges[i][1].replace(/\:[^>]*\)/gi, "");
      colleges[i][1] = colleges[i][1].replace(/(\(Id)/gi, "");

      const clg = {
        id: colleges[i][0],
        university: colleges[i][1],
        name: colleges[i][2],
        type: colleges[i][3],
        state: colleges[i][4],
        city: colleges[i][5],
      };

      result.push(clg);
    }
  }

  res.json(result).end();
});

app.post("/colleges/state", function (req, res) {
  let state = req.headers.state.toLowerCase();
  let offset = req.headers.offset;
  console.log(offset);
  let result = [];

  for (let i = 0; i < colleges.length; i++) {
    if (colleges[i][4].toLowerCase().indexOf(state) >= 0) {
      colleges[i][2] = colleges[i][2].replace(/\:[^>]*\)/gi, "");
      colleges[i][2] = colleges[i][2].replace(/(\(Id)/gi, "");

      colleges[i][1] = colleges[i][1].replace(/\:[^>]*\)/gi, "");
      colleges[i][1] = colleges[i][1].replace(/(\(Id)/gi, "");

      const clg = {
        id: colleges[i][0],
        university: colleges[i][1],
        name: colleges[i][2],
        type: colleges[i][3],
        state: colleges[i][4],
        city: colleges[i][5],
      };

      result.push(clg);
    }
  }

  let limitResult = [];
  let count = 0;

  let limit = Number(offset) + 10;

  for (i = offset; i < limit; i++) {
    limitResult.push(result[i]);
  }

  res.json(limitResult).end();
});

app.post("/colleges/district", function (req, res) {
  let district = req.headers.district.toLowerCase();
  let offset = req.headers.offset;
  console.log(offset);
  let result = [];

  for (let i = 0; i < colleges.length; i++) {
    if (colleges[i][5].toLowerCase().indexOf(district) >= 0) {
      colleges[i][2] = colleges[i][2].replace(/\:[^>]*\)/gi, "");
      colleges[i][2] = colleges[i][2].replace(/(\(Id)/gi, "");

      colleges[i][1] = colleges[i][1].replace(/\:[^>]*\)/gi, "");
      colleges[i][1] = colleges[i][1].replace(/(\(Id)/gi, "");

      const clg = {
        id: colleges[i][0],
        university: colleges[i][1],
        name: colleges[i][2],
        type: colleges[i][3],
        state: colleges[i][4],
        city: colleges[i][5],
      };

      result.push(clg);
    }
  }

  let limitResult = [];
  let count = 0;

  if (offset == -1) {
    res.json(result).end();
  } else {
    let limit = Number(offset) + 10;

    for (i = offset; i < limit; i++) {
      limitResult.push(result[i]);
    }

    res.json(limitResult).end();
  }
});

Array.prototype.contains = function (obj) {
  let i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
};

app.post("/allstates", function (req, res) {
  let result = [];

  for (let i = 1; i < colleges.length; i++) {
    if (result.indexOf(colleges[i][4]) < 0) {
      result.push(colleges[i][4]);
    } else {
    }
  }

  res.send(JSON.stringify(result));
});

app.post("/districts", function (req, res) {
  let state = req.headers.state.toLowerCase();
  let result = [];

  for (let i = 0; i < colleges.length; i++) {
    if (colleges[i][4].toLowerCase().indexOf(state) >= 0) {
      if (result.indexOf(colleges[i][5]) < 0) {
        result.push(colleges[i][5]);
      }
    }
  }

  res.send(JSON.stringify(result));
});

app.listen(PORT, function () {
  console.log("Example app listening at " + PORT);
});
