// build your `/api/projects` router here
const express = require("express")
const router = express.Router();

const project_model = require("./model") //Project-model

router.get("/", async (req, res) => {
    const result = await project_model.getProjects()

    res.json(result)
})

router.post("/", (req, res, next) => {
    if (!req.body || !req.body.project_name || req.body.project_name.trim() <= 0) {
        next({
            status: 400,
            message: "PROJECT_NAME is required for creating projects."
        })
    }

    project_model.createPost(req.body)
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

})


module.exports = router;