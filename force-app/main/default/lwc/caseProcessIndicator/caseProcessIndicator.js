import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { LightningElement ,wire,api} from 'lwc';
import CASE_OBJECT from '@salesforce/schema/Case';
import STATUS_FIELD from '@salesforce/schema/Case.Status';
import CASE_ID_FIELD from '@salesforce/schema/Case.Id';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import {
    subscribe,
    unsubscribe,
    onError,
    setDebugFlag,
    isEmpEnabled,
} from 'lightning/empApi';
export default class CaseProcessIndicator extends LightningElement 
{
    statusOptions;
    @api recordId;
    caseStatusValue;
    channelName = '/event/Case_Detail__e';
    subscription = {};
    //1. get the picklist values for case status
    @wire(getObjectInfo, { 
        objectApiName: CASE_OBJECT
    })
    objectInfo;
    @wire(getPicklistValues,{
        recordTypeId:'$objectInfo.data.defaultRecordTypeId',
        fieldApiName:STATUS_FIELD
    })
    pickListFunction({data,error})
    {
        if(data)
        {
            console.log('picklist data-->',data);
            this.statusOptions=data.values;
        }
    else if(error)
        {
            console.error('error in picklist-->',error);
        }

    }
    //2. get the current status of the case record
    @wire(getRecord,{
        recordId:'$recordId',
        fields:[STATUS_FIELD]
    })
    getRecordOutput({data,error})
    {
        if(data)
        {
        this.caseStatusValue=getFieldValue(data,STATUS_FIELD);

        }
        else if(error)
        {
            console.error('error in record-->',error);
        }
    }
     // Initializes the component
    connectedCallback() {
        // Register error listener
        this.handleSubscribe();
        this.registerErrorListener();
    }
     // Handles subscribe button click
    handleSubscribe() {
        // Callback invoked whenever a new event message is received
        const messageCallback =  (response)=>{
            console.log('New message received: ', JSON.stringify(response));
            this.handleEventResponse(response);
        }
           

        // Invoke subscribe method of empApi. Pass reference to messageCallback
        subscribe(this.channelName, -1, messageCallback).then((response) => {
            // Response contains the subscription information on subscribe call
            console.log(
                'Subscription request sent to: ',
                JSON.stringify(response.channel)
            );
            this.subscription = response;
           
        });
    }
    disconnectedCallback()
    {
        // Invoke unsubscribe method of empApi
        unsubscribe(this.subscription, (response) => {
            console.log('unsubscribe() response: ', JSON.stringify(response));
            // Response is true for successful unsubscribe
        });
    }
    handleEventResponse(response)
    {
        console.log('Response From Postman ', JSON.stringify(response));
        if(response.hasOwnProperty('Key'));
    } 
    registerErrorListener() {
        // Invoke onError empApi method
        onError((error) => {
            console.log('Received error from server: ', JSON.stringify(error));
            // Error contains the server-side error
        });
    }

}