import { LightningElement } from 'lwc';

export default class DynamicCss extends LightningElement {
    pColor = 'chocolate-color';


    AddCsshandleClick(event)
    {
        let element = this.template.querySelector('p');
        element.classList.add('green-border');
                
    }

    removeCsshandleClick(event)
    {
          let element = this.template.querySelector('p');
          element.classList.remove('green-border');
          

    }
    toggleCsshandleClick(event)
    {
        let element = this.template.querySelector('p');
        element.classList.toggle('green-border');


    }

}