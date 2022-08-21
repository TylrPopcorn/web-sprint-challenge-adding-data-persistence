// build your `/api/resources` router here
const express = require("express");

const router = express.Router();

const resouce_model = require("./model")

router.post("/", (req, res, next) => {
    if (!req.body || !req.body.resource_name || req.body.resource_name.trim() <= 0) {
        next({
            status: 400,
            message: "RESOURCE_NAME is required for creating resources."
        })
    }

    resouce_model.postResource(req.body)
        .then(result => {
            res.status(201).json(result)

        })
        .catch(next);


    /* REFERENCE:::::
    resouce_model.createPost(req.body)
        .then(result => {
            // console.log(result, " <----")
            const data = {
                project_id: result.project_id,
                project_name: result.project_name,
                project_description: result.project_description,
                project_completed: result.project_completed == 0 ? false : true
            }
            //  console.log(data)

            res.status(201).json(data)
        })
        .catch(next);
*/

})

router.get("/", async (req, res) => {
    const result = await resouce_model.getResources()

    res.json(result)
})

module.exports = router;