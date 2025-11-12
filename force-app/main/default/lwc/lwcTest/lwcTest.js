import { LightningElement ,track} from 'lwc';

export default class LwcTest extends LightningElement {
     localName = 'ram';
     @track apiname ='sita';

     handleClick(event)
     { 
          this.localName = 'sita';
          this.apiname = 'ram';
     }

  
}