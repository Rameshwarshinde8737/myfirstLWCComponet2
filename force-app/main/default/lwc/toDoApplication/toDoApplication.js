import { LightningElement } from 'lwc';

export default class ToDoApplication extends LightningElement {
    taskaname="";
    taskdate=null; // date is type of Object in JS
    incompleteTask = [];
    completedTasks = [];
changeHandler(event)
{
    //destructuring
    let { name, value } = event.target;
    if(name === 'taskname') {
       this.taskaname = value;
    }
    else if(name === 'taskdate') {
       this.taskdate = value;
    }
}
resetHandler() {
    this.taskname = " ";
    this.taskdate = null;
    // Reset the input fields
  
}

addtaskHandler() {
    //if end date is not selected, set it to today
    if(!this.taskdate) {
    this.taskdate = new Date().toTSOString().slice(0, 10);
    }
    if(this.validateTask()) {
        //create a task object
        this.incompleteTask = [
            ...this.incompleteTask,
        {
            name: this.taskname,
            date: this.taskdate,
        }
        ];
      this.resetHandler();
      this.sortedArray = this.sortTask(this.incompleteTask);
      this.incompleteTask=[...this.sortedArray];
      console.log(this.incompleteTask);
    }
}
validateTask() {
    let isValid = false;
    //condition 1 check if task is empty
    //condition 2 - if task name is not empty then check for duplicate
    let elements = this.template.querySelectorAll('.taskname');
    if(!this.taskname) {
        isValid = false;
        alert('Task name cannot be empty');
    }
    else{
        //if find method ,will find an item in array it will return task if not found it will return undefined
       let taskItems = this.uncompletedTasks.find(
        (currItem)=>
            currItem.taskname===this.taskname &&
            currItem.taskdate===this.taskdate
        );
    }
    if(taskItems) {
        isValid = false;
        elements.forEach((item) => {
            item.setCustomValidity('Task already exists');
      
        });
        
    }
    if(isValid)
    {
        elements.setCustomValidity('');
        
    }
    elements.reportValidity();
   
       
}
sortTask(inputArr){
  let sortedArray=  inputArr.sort((a,b) =>
        {
            const dateA=new Date(a.taskdate);
            const dateB=new Date(b.taskdate);
            return dateA - dateB;

    });
    return sortedArray;
}
}