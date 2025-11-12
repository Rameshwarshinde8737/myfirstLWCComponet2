import { LightningElement,api } from 'lwc';

export default class Child extends LightningElement
 {
    @api message;
    displayuser;

    set user(value) {
        let cloneuser={...value};//cloning the obect
        this.displayuser=cloneuser.firstname.toUpperCase();
     }
     @api
     get user() {
        return this.displayuser;

     }
    }
    /*@track userList=[];
    name = 'LWC';
   
    @api
    get users()
    {
        return this.userList;
    }
    set users(value)
    {
        console.log(JSON.stringify(value));
        this.userList = value;
    }
    handleClick(event)
    {
        event.preventDefault();
        this.name = 'shyam'; // This will not work as 'name' is a
        this.users=[{}];
    }*/