// build your `Task` model here
const db = require("../../data/dbConfig")

module.exports = {

    async getTasks() {

        return await db("tasks")
            .leftJoin("projects", "projects.project_id", "tasks.project_id")
            .select('task_id', 'task_description', 'task_notes', 'task_completed', 'project_name', 'project_description')
    },

    createTask(body) {
        const task = {
            task_description: body.task_description,
            task_notes: body.task_notes == undefined ? null : body.task_notes,
            task_completed: body.task_completed == undefined ? false : true,
            project_id: body.project_id,
        }

        return db("tasks").insert(task)
            .then(() => {
                return db("tasks").where("task_description", task.task_description).first()
            })

    }

}



