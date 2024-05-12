/**
 * @description       : This component will enable users to perform real-time searches on any Salesforce object (like Accounts, Contacts, or Custom Objects).
 *                      It will update the search results dynamically as the user types their query, providing a quick and responsive user experience.
 * @author            : MichaelMajor
 * @group             : 
 * @last modified on  : 05-12-2024
 * @last modified by  : MichaelMajor
**/
public with sharing class DynamicSearchController {

    @AuraEnabled(cacheable=true)
    public static List<SObject> fetchResults(String objectName, String searchQuery, String searchField) {
        try {
            // Generate dynamic SOQL query string
            String queryString = 'SELECT Id, ' + searchField + ' FROM ' + objectName +
                                 ' WHERE ' + searchField + ' LIKE \'%' + String.escapeSingleQuotes(searchQuery) + '%\' LIMIT 10';
            return Database.query(queryString);
        } catch (Exception e) {
            // Handle and log the exception appropriately
            System.debug('Error fetching search results: ' + e.getMessage());
            throw new AuraHandledException('Unable to fetch results: ' + e.getMessage());
        }
    }
}
