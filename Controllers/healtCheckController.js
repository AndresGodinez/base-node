const healthCheck = (req, res) => {
    res.json({simple: 'test'});
};

module.exports = {
    healthCheck
};
