const router = require("express").Router();
const dataRoutes = require("./data.routes");

router.post('/light', dataRoutes.light);
router.post('/lightAlarm', dataRoutes.lightAlarm);
router.post('/gas', dataRoutes.gas);

module.exports = router;
