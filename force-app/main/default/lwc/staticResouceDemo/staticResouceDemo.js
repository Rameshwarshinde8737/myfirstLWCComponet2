import { LightningElement, wire } from 'lwc';
import LOGO from '@salesforce/resourceUrl/MY_LOGO';
import GREETING from '@salesforce/label/c.greeting';
import USER_ID from '@salesforce/user/Id';
import SALESFORCE_PLATFORM from '@salesforce/label/c.Salesforceplatform';
import CONTETNT_ASSET from '@salesforce/contentAssetUrl/My_Asset_LOGO';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import NAME from '@salesforce/schema/User.Name'
import DISPLAY_TEXT from '@salesforce/customPermission/displayText';
import { loadStyle,loadScript} from 'lightning/platformResourceLoader';
import ANIMATE from '@salesforce/resourceUrl/ThirdPartyCSS';
import MOMENT from '@salesforce/resourceUrl/ThirdPartyJS';

export default class StaticResouceDemo extends LightningElement 
{
    isFirstLoad=true;
    name="";
    displayDate="";
    myLogo=LOGO;
    myLogoAsset=CONTETNT_ASSET;
    label={
    greeting:GREETING,
    platform:SALESFORCE_PLATFORM
    };
    @wire(getRecord,{ 
        recordId: USER_ID,
        fields: [NAME] 
    })wired_user_output({data,error})
    {
        if(data)
        {
        console.log('Data',data);
        this.name=getFieldValue(data,NAME);
        
    }
    else if(error)
    {
        console.log('Error',error);
    }
 
    //
}
renderedCallback()
{
    if(this.isFirstLoad)
    {
        this.isFirstLoad=false;

       Promise.all([loadStyle(this,ANIMATE),loadScript(this,MOMENT)]).then(()=>
    {
        console.log('style loaded');
        this.fetchDate();

        
    })
    .catch((error)=>
    {
        console.log('Error while loading the style',error);
    });
    }

}
get checkPermission()
{
    return DISPLAY_TEXT;
}
fetchDate()
{
 this.displayDate=moment().format('LLLL');
}
}