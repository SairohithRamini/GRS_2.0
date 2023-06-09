public with sharing class RefreshDemoController {
    @AuraEnabled(cacheable=true)
    public static String performServerUpdate() {
        // Perform your server-side logic here, such as querying data from the database or making updates
        // This is just a dummy example, you should replace it with your actual logic
        
        // Simulating a server update with a random string
        String updatedData = 'Updated data: ' + String.valueOf(Math.random());
        
        // Return the updated data to the client-side
        return updatedData;
    }
}