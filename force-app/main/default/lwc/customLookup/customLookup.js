import { LightningElement,wire} from 'lwc';
import searchRecords from '@salesforce/apex/customLookupController.searchRecords';
export default class CustomLookup extends LightningElement {

    apiName="Account"; //to define static parameter use =>  this.apiName
    searchValue="T";
    objectLabel="Account";
    //to define reactive perameter use =>  $
    @wire (searchRecords,
        {
            ObjectApiName:'$apiName', //both value is changed then it will call apex class
            Searchkey:'$searchValue'
        })
        outputs;
}