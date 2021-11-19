# TO-DO List

This project is part of [The Odin Project](https://www.theodinproject.com/) Curriculum.

Try [todos](https://mojotron.github.io/todos/) and organize you tasks, app hosted with Github Pages.

## Todos user guide

This is simple application for keeping track of the tasks. User can create a new task or a new project. When creating new task, user can set title, deadline, priority, type of task and group it to an existing project. Type of task creates specific task body. There are three possible types of tasks. Text task, user describes the task with block of text. List task, user describes tasks with list of short descriptions in form of bullet points. And finally checkbox task, similar to the list with addition of having checkbox to keep track of progress. User can cross out the list item clicking on checkbox.
After creation of the task, task is display in the tasks display view. Task can be updated multiple way. Changing deadline, project id, or priority. Task can be deleted. Body of the task can be edited depending on the task type.

In addition to task creation, user can create project. Project is container for group of tasks with specific projectId. By selecting project in navigation view app will render all tasks grouped in targeted project. Deleting project will not delete all tasks in that project.

User can view all tasks with selecting all task navigation item or filter task by due date. There are two options for due date filtering. Tasks that have due date today and this week. Tasks are automatically sorted by due date.

## What have I learned

- SOLID principles.
- BEM - naming methodology.
- Deeper understanding of callback functions, closure, and reference type objects. Passing handlers for event listeners through coordinator class.
