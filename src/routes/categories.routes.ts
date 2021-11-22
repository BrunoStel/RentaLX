/* eslint-disable prettier/prettier */
import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/createCategoryController";
import { ListCategoryController } from "../modules/cars/useCases/listCategories/ListCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";


const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});


const createCategoryController = new CreateCategoryController;
categoriesRoutes.post("/", createCategoryController.handle);


const listCategoryController = new ListCategoryController;
categoriesRoutes.get("/", listCategoryController.handle);



const importCategoryController = new ImportCategoryController;
categoriesRoutes.post("/import", upload.single("file"),(request, response) => {
   return importCategoryController.handle;
});

export { categoriesRoutes };

