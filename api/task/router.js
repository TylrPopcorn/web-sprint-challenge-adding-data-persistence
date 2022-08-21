// build your `/api/tasks` router here
const express = require("express")

const router = express.Router();

const tasks_model = require("./model") //Tasks model.

router.post("/", (req, res, next) => {
    if (req.body && req.body.task_description && req.body.project_id) {

        tasks_model.createTask(req.body)
            .then(result => {

                if (result.task_completed == 0) {
                    result.task_completed = false
                } else if (result.task_completed == 1) {
                    result.task_completed = true
                }

                console.log(result, " <----")

                res.status(201).json(result)
            })
            .catch(res => {
                console.log(res.message, "TESGFS")
                next()
            });
    } else {
        next({
            status: 400,
            message: "DESCRIPTION & PROJECT_ID are required for creating tasks."
        })
    }

})

router.get("/", async (req, res) => {
    const result = await tasks_model.getTasks()
    //  console.log(result, " <----------")

    for (let i = 0; i < result.length; i++) {
        if (result[i]) {
            if (result[i].task_completed == 0 || result[i].task_completed == undefined) {
                result[i].task_completed = false
            } else {
                result[i].task_completed = true
            }
        }
    }
    res.status(201).json(result)
})

module.exports = router;