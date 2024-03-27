const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("../webpack.config");
const path = require("path");
const fs = require("fs");

const app = express();
const compiler = webpack(webpackConfig);

if (process.env.NODE_ENV === "development") {
    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath,
        })
    );
    app.use(webpackHotMiddleware(compiler));
    app.use(express.static("app/public"));
    app.get("/Apps/:filepath(*)", (req, res) => {
        const filepath = req.params.filepath;
        const filePathInAppsDir = path.join(__dirname, "./src/apps", filepath);
        fs.access(filePathInAppsDir, fs.constants.F_OK, (err) => {
            if (err) return res.status(404).send("File not found");
            res.sendFile(filePathInAppsDir);
        });
    });
    app.get("/", (req, res) => {
        res.sendFile(__dirname + "/public/index.html");
    });
}

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "app/build")));
    app.get("/:filepath(*)", (req, res) => {
        res.sendFile(path.join(__dirname, "/build", req.params.filepath));
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
});
