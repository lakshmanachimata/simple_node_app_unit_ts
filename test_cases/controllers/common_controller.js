const swaggerDocs = require("../swagger");

module.exports = function (app) {
 /**
 * @swagger
 * /api/v1/healthcheck:
 *   get:
 *     summary: Get Health Check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Is Service is good
 * 
 * 
 */
    app.route('/api/v1/healthcheck').all(async (req, res) => {
        return res.status(200).json({status : 'OK'});
    })
}