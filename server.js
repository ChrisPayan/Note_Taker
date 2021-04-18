const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 7500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("db"));

app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "public/index.html"))
);

app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("/api/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/db/db.json"))
);

app.post("/api/notes", (req, res) => {
    fs.readFile(__dirname, "/db/db.json", "utf8", (err, savedNotes) => {
        if(err) {
            console.log(err);
        } else {
            savedNotes = JSON.parse(savedNotes);

            const viewNewNote = {
                title: req.body.title,
                text: req.body.text,
                id: listNotes.length + 1,
            };
            const viewNote = savedNotes.concat(viewNewNote);

            fs.writeFile(
                __dirname + "/db/db.json",
                JSON.stringify(viewNote),
                function (error, input) {
                    if (!error) {
                        res.json(viewNote);
                    } else {
                        return error;
                    }
                }
            );
        } 
    });
});

app.get("/api/notes", (req, res) => {
    
})