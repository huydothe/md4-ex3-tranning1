import {AppDataSource} from "./src/data-source";
import {Product} from "./src/entity/Products";
import multer from 'multer';
import ejs from "ejs";
const upload = multer();
import express from "express";
import bodyParser from "body-parser";
const port = 3000;

AppDataSource.initialize().then(async connection =>{
    const app =express();
    app.set('view engine','ejs');
    app.set('views','./src/views');
    app.use(bodyParser.json());
    app.use(express.json());
    const ProductRepo = connection.getRepository(Product);

    app.get('/product/create',(req,res)=>{
        res.render("create");
    })

    app.post('/product/create',upload.none(),async (req,res)=>{
        const productData = {
            name : req.body.name,
            avatar: req.body.avatar,
            author: req.body.author,
            price: req.body.price
        };

        const product = await ProductRepo.save(productData);
        res.render('success');
    })

    app.get("/product/list", async (req,res)=>{
        const product = await ProductRepo.find();
        res.render("list",{products : product})
    })

    app.listen(port,()=>{
        console.log(`Server is running at http://localhost:${port}`);
    });

})