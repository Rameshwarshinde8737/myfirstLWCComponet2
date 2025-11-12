import { LightningElement,api} from 'lwc';

export default class EmbedFlowInLWC extends LightningElement {
   @api recordId;
   get inputVariables() {
        return [
            {       
                name: 'AccountId',
                type: 'String',
                value: this.recordId
            },
            {
                name: 'operationType',
                type: 'String',
                value: 'Create record from LWC'
            }
        ];
    }      
    handleStatusChange(event) 
    {
        if(event.detail.status==='FINISHED')
        {
            let outputvalues=event.detail.outputVariables;
            for(let i=0;i<outputvalues.length;i++)
            {
                let outputItem=outputvalues[i];
                if(outputItem.name=='outputAccountId')
                {
                    console.log('Output Account Id: ' + outputItem.value);
                }
                if(outputItem.name=='outputoperationType')
                {
                    console.log('Operation Type: ' + outputItem.value);
                }

            }

        }
    }
}