"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./src/data-source");
const Products_1 = require("./src/entity/Products");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const port = 3000;
data_source_1.AppDataSource.initialize().then(async (connection) => {
    const app = (0, express_1.default)();
    app.set('view engine', 'ejs');
    app.set('views', './src/views');
    app.use(body_parser_1.default.json());
    app.use(express_1.default.json());
    const ProductRepo = connection.getRepository(Products_1.Product);
    app.get('/product/create', (req, res) => {
        res.render("create");
    });
    app.post('/product/create', upload.none(), async (req, res) => {
        const productData = {
            name: req.body.name,
            avatar: req.body.avatar,
            author: req.body.author,
            price: req.body.price
        };
        const product = await ProductRepo.save(productData);
        res.render('success');
    });
    app.get("/product/list", async (req, res) => {
        const product = await ProductRepo.find();
        res.render("list", { products: product });
    });
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});
//# sourceMappingURL=index.js.map