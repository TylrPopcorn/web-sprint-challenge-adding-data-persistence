// build your `Resource` model here
const db = require("../../data/dbConfig")

module.exports = {

    getResources() {
        return db("resources")
    },

    async postResource(body) {
        let resource = {
            resource_name: body.resource_name,
            resource_description: body.resource_description,
        }


        if (resource.resource_description === undefined) {
            resource.resource_description = null
        }

        return db("resources").insert(resource)
            .then(() => {

                return db("resources").where("resource_name", resource.resource_name).first()
            })

    }
}


