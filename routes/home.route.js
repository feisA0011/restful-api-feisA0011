module.exports = function (router) {
	router.get("/", function (req, res) {
		res.send({
			message: "Hello, World!"
		});
		// res.json({message: "taufeeq is a wasteman"})
	});
};