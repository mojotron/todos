# TO-DO List

This project is part of [The Odin Project](https://www.theodinproject.com/) Curriculum.

Try [todos](https://mojotron.github.io/todos/) and organize your tasks, app hosted with the Github Pages.

## Todos user guide

This is a simple application for keeping track of the tasks. User can create a new task or a new project.

When creating 'new task', user can set title, deadline, priority, task type and group it to an existing project. Task type creates a specific task body.

There are three possible task types.

1. Text task, user describes the task with a block of text.
2. List task, user describes tasks with a list of short descriptions in form of bullet points.
3. And finally, checkbox task, similar to the list with addition of having a checkbox to keep track of progress. User can cross out the list item clicking on checkbox.

After creating the task, it is displayed in the tasks display view. The task can be updated multiple ways, by changing deadline, project id, or priority. The task can be deleted. Body of the task can be edited depending on the task type.

In addition to task creation, user can create project. Project is a container for group of tasks with specific project id. By selecting project in navigation view, application will render all tasks grouped in selected project. Deleting project will not delete all tasks in that project.

User can view all tasks with selecting 'all task' navigation item or filter task by due date. There are two options for due date filtering. Tasks that have due date today and this week. Tasks are automatically sorted by the due date.

## What have I learned

- SOLID principles.
- BEM - naming methodology.
- Deeper understanding of callback functions, closure, and reference type objects. Passing handlers to event listeners through coordinator class.
