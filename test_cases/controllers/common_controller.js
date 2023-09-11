module.exports = function (app) {
    app.route('/api/v1/healthcheck').all(async (req, res) => {
        return res.status(200).json({status : 'OK'});
    })
}