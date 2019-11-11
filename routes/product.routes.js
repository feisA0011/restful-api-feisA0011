const {
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    createProduct,
    updateProduct
} = require("../controllers/product.controller")


module.exports = function (router) {
    router.options("/products", function (req, res) {
        res.header("Allow", "OPTION, GET, POST");
        res.status(204);
        res.end();
    });

    router.get("/products", getAllProducts)

    router.get("/products/:sku", getSingleProduct)

    router.delete("/products/:sku", deleteProduct)

    router.patch("/products/:sku", updateProduct)

    router.post("/products", createProduct)
};