exports.getUser = (req, res) => {
	const id = req.params.id;
	res.send(id);
};
