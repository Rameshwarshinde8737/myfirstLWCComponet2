import { LightningElement } from 'lwc';

export default class Calculator extends LightningElement {
number1="";
number2="";
result=0;
displayResult=false;
changeHandler(event)
{
    
    if(event.target.name === 'number1')
        this.number1 = event.target.value;
    else if (event.target.name === 'number2')
        this.number2 = event.target.value;
}
calculateInput(event)
{
    this.displayResult=true;
    if(event.target.label=='Add')
    {
        this.result=parseInt(this.number1)+parseInt(this.number2);
    }
    else if(event.target.label=='div')
    {
        this.result=parseInt(this.number1)/parseInt(this.number2);
    }
    else if(event.target.label=='Sub')
    {
        this.result=parseInt(this.number1)-parseInt(this.number2);
    }
    else if(event.target.label=='Mul')
    {
        this.result=parseInt(this.number1)*parseInt(this.number2);
    }

//reset
this.number1=" ";
this.number2=" ";

}
}