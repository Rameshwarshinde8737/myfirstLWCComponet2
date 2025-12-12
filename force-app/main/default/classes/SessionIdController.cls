public with sharing class SessionIdController {
            @AuraEnabled 
            //this class is used to get session id from visualforce page
            public static String getSessionIdFromVFPage() {
            PageReference vfPage = Page.sessionId; // Replace with your VF page name
            String content = vfPage.getContent().toString();
            Integer startIndex = content.indexOf('SESSION_ID_START') + 'SESSION_ID_START'.length();
            Integer endIndex = content.indexOf('SESSION_ID_END');
            return content.substring(startIndex, endIndex);
        }
    }