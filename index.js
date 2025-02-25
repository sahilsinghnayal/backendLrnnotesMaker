const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const { log } = require("console");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); //  sari static file yhain milegi
app.set("view engine", "ejs"); // Set the view engine to ejs

app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    // console.log(files);
    res.render("index", { files: files });
  });
});
app.get("/files/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf8", (err, data) => {
    res.render("show", { filename: req.params.filename, data: data });
    console.log(data);
  });
  
});
app.get("/edit/:filename", (req, res) => {
  res.render("edit",{filename:req.params.filename});
  
});
app.post("/create", (req, res) => {
  // console.log(req.body);

  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    }
  );
});
app.post("/update", (req, res) => {
  fs.rename(`./files/${req.body.previous}`,`./files/${req.body.New}`,(err)=>{
    res.redirect("/");
  }

)});

app.listen(3000);
