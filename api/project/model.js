// build your `Project` model here
const db = require("../../data/dbConfig")

module.exports = {

    getProjects() {
        return db("projects").then(res => {
            let projects = []

            for (let i = 0; i < res.length; i++) {
                if (res[i].project_completed == 0) {
                    res[i].project_completed = false
                } else {
                    res[i].project_completed = true
                }

                projects.push(res[i])
            }

            return projects
        })
    },

    async createPost(body) {

        let project = {
            project_name: body.project_name,
            project_description: body.project_description,
            project_completed: body.project_completed
        }

        if (project.project_completed === undefined) {
            project.project_completed = 0
        } else {
            project.project_completed = 1
        }

        if (project.project_description === undefined) {
            project.project_description = null
        }

        return db("projects").insert(project)
            .then(() => {

                return db("projects").where("project_name", project.project_name).first()
            })

    }



}

