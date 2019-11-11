const ProductRef = require("../models/product.model");


//update product
exports.updateProduct = function (req, res) {
    if (req.fields.price) {
        req.fields.price = parseFloat(req.fields.price)
    }
    if (req.fields.weight) {
        req.fields.weight = parseFloat(req.fields.weight)
    }

    ProductRef.where("sku", "==", req.params.sku)
        .get()
        .then(docs => {
            docs.forEach(doc => doc.ref.update({
                    ...req.fields
                }).get()
                .then(doc => res.json(doc.data()))
            );
        })
}

exports.createProduct = function (req, res) {
    req.fields.price = parseFloat(req.fields.price)
    req.fields.weight = parseFloat(req.fields.weight)

    ProductRef.add({
            ...req.fields
        })
        .then(ref => {
            ref.get().then(doc => res.status(201).json(doc.data()))
        })
        .catch(error => res.json(error));
}


exports.getAllProducts = function (req, res) {
    ProductRef.get().then(docs => {
        const result = [];
        docs.forEach(doc => result.push(doc.data()));
        res.json(result)
    });
};

exports.getSingleProduct = function (req, res) {
    ProductRef.where('sku', '==', req.params.sku) //.limit(1)
        .get()
        .then(
            docs => {
                let output = []
                docs.forEach(doc => output.push(doc.data()))
                res.json(output)

                // docs.forEach(doc => res.json(doc.data()))

            })


    // const result = products.find(product => product.sku == req.params.sku);
    // res.json(result);
};

exports.deleteProduct = function (req, res) {
    ProductRef.where('sku', '==', req.params.sku)
        .get()
        .then(docs => {
            docs.forEach(doc => doc.ref.delete())
        })
        .catch(err => res.status(500).json({
            message: err
        }));
    res.status(204).end();

}