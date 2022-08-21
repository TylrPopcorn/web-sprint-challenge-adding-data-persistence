/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema
        .createTable("projects", tbl => {
            tbl.increments("project_id") //primary key
            tbl.string("project_name", 200).notNullable() //*required* project name
            tbl.string("project_description") //optional project description
            tbl.integer("project_completed").defaultTo(0) //boolean defaulted to false
        })

        .createTable("resources", tbl => {
            tbl.increments("resource_id") //primary key
            tbl.string("resource_name").notNullable().unique() //unique non-nullable resource name
            tbl.string("resource_description") //optional resource description
        })

        .createTable("tasks", tbl => {
            tbl.increments("task_id") //primary key
            tbl.string("task_description").notNullable() //required task description
            tbl.string("task_notes") //optional notes
            tbl.integer("task_completed").defaultTo(0) //optional task completed
            tbl.integer("project_id").unsigned().references("project_id").inTable("projects").onDelete('CASCADE');
        })


};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema
        .dropTableIfExists("projects")
        .dropTableIfExists("resources")
        .dropTableIfExists("tasks")
};
