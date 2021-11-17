# TO-DO List

This project is part of The Odin Project Curriculum.

Try this todo app here.

inspiration

how to use
arhitecture

## What have i learned

- SOLID principles
- BEM

## Roadblocks

Updateing tasks from controller file without impotring tasks and project files to
the taskDom file.

## Useful resources

Connect class with controller by passing handler functions as params new Navigation(switchHandler, deleteHandler)

Adding new project. User clicks create new project button.
Inserts name and submit button. Form class takes handler function
and gives object with project title back. With this object controller creates new project in th projects class. After thet takes all projects form project class and pass it ass hadler to navigation class to render all user projects to the page.
Navigation class is initialize in the controller and controller pass 2 handler functios as arguments. For switching projects and deleteing projects. Both handlers recive project id from event listeners in Navigation class asscoiete with clicks.
Switch handlers updates display by changing main headins and display tasks of that project.
Delete handler removes project form projects class and displays all clears display if deleted project is currently displayed.

Adding new task. User opens new form, inputs data, submit form.
Form class takes handler for create buton. Handler pass Task object to controller which pass it to Task class and create new task in array. Controller update display.
