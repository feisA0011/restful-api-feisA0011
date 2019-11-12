const ProductRef = require("../models/product.model");
const {
    log
} = require("../middleware/logger");


// Controller functions
// * Update product to data *

exports.updateProduct = async function (req, res) {
    if (req.fields.price) {
        req.fields.price = parseFloat(req.fields.price)
    }
    if (req.fields.weight) {
        req.fields.weight = parseFloat(req.fields.weight)
    }
    try {
        const docs = await ProductRef.where("sku", "==", req.params.sku).limit(1).get();
        docs.forEach(async doc => {
            try {
                doc.ref.update({
                    ...req.fields
                });
                const result = await doc.ref.get();
                res.json(result.data());
            } catch (error) {
                log.error(error.stack);
                res.status(500).end();
            }

        })
    } catch (error) {
        log.error(error.stack);
        res.status(500).end();
    }
}

// exports.updateProduct = function (req, res) {
//     if (req.fields.price) {
//         req.fields.price = parseFloat(req.fields.price)
//     }
//     if (req.fields.weight) {
//         req.fields.weight = parseFloat(req.fields.weight)
//     }

//     ProductRef.where("sku", "==", req.params.sku)
//         .get()
//         .then(docs => {
//             docs.forEach(doc => doc.ref.update({
//                     ...req.fields
//                 }).get()
//                 .then(doc => res.json(doc.data()))
//             );
//         })
// }


// Create and add new product to data 
exports.createProduct = async function (req, res) {
    try {
        req.fields.price = parseFloat(req.fields.price)
        req.fields.weight = parseFloat(req.fields.weight)
        const docs = await ProductRef.add({
            ...req.fields
        })
        const ref = docs.get();
        res.status(201).json(ref.data());
    } catch (error) {
        res.status(201).end();
        log.error(error);

    }

}

// exports.createProduct = function (req, res) {
//     req.fields.price = parseFloat(req.fields.price)
//     req.fields.weight = parseFloat(req.fields.weight)

//     ProductRef.add({
//             ...req.fields
//         })
//         .then(ref => {
//             ref.get().then(doc => res.status(201).json(doc.data()))
//         })
//         .catch(error => res.json(error));
// }

// Print out all products from data

exports.getAllProducts = async function (req, res) {
    try {
        const result = []
        const docs = await ProductRef
            .get()
        docs.forEach(doc => result.push(doc.data()))
        res.json(result);

    } catch (error) {
        res.status(500).end();
        log.error(error);

    }

}

// exports.getAllProducts = function (req, res) {
//     ProductRef.get().then(docs => {
//         const result = [];
//         docs.forEach(doc => result.push(doc.data()));
//         res.json(result)
//     });
// };

// Print out single products from data 



exports.getSingleProduct = async function (req, res) {
    try {
        const docs = await ProductRef
            .where('sku', '==', req.params.sku).limit(1)
            .get()
        docs.forEach(doc => res.json(doc.data()));

    } catch (error) {
        res.status(500).end();
        log.error(error);
    }
}

// exports.getSingleProduct = function (req, res) {
//     ProductRef.where('sku', '==', req.params.sku) //.limit(1)
//         .get()
//         .then(
//             docs => {
//                 let output = []
//                 docs.forEach(doc => output.push(doc.data()))
//                 res.json(output)

//                 // docs.forEach(doc => res.json(doc.data()))

//             })


//     // const result = products.find(product => product.sku == req.params.sku);
//     // res.json(result);
// };


// Delete a single products from data
exports.deleteProduct = async function (req, res) {
    try {
        const docs = await ProductRef.where('sku', '==', req.params.sku).get()
        docs.forEach(doc => doc.ref.delete())
        res.status(204).end()
    } catch (error) {
        res.status(500).end();
        log.error(error.stack);
    }


}
// exports.deleteProduct = function (req, res) {
//     ProductRef.where('sku', '==', req.params.sku)
//         .get()
//         .then(docs => {
//             docs.forEach(doc => doc.ref.delete())
//         })
//         .catch(err => res.status(500).json({
//             message: err
//         }));
//     res.status(204).end();

// }