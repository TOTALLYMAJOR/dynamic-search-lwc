Dynamic Search Component for Salesforce LWC

Description:
This component will enable users to perform real-time searches on any Salesforce object (like Accounts, Contacts, or Custom Objects). It will update the search results dynamically as the user types their query, providing a quick and responsive user experience.

Features:

	Dynamic Search Input: As the user types, the component updates the search results.
	
	Debouncing: To minimize performance impact, the component will use debouncing to delay the search trigger until the user 	has stopped typing for a preset duration.
	
	Customizable Object and Fields: The component can be configured to search through any object and its fields.
	
	Error Handling: Robust error handling to manage API limits and other potential issues.
	Accessible Design: Implement accessibility standards to ensure the component is usable for all users.

Code Specifications:
	LWC Structure: Utilize standard LWC lifecycle hooks and modular design.
	Apex Controller: Secure, efficient Apex methods to handle search queries, adhering to best practices like SOQL query 		optimizations and security enforcement.
	Styling: Use Salesforce Lightning Design System (SLDS) for styling to ensure consistent look and feel with the Salesforce 	platform.

Development Best Practices
	Code Reusability: Design components and Apex classes to be reusable across different LWCs.
	Security: Apply Salesforce security best practices, including checking user permissions and field-level security.
	Testing: Include Jest tests for LWC and Apex tests to ensure code reliability and cover edge cases.

Files Structure
	dynamicSearchLWC.html - The HTML template for the component.
	dynamicSearchLWC.js - The JavaScript controller to handle UI logic and interactions.
	dynamicSearchLWC.css - CSS file for component-specific styling.
	dynamicSearchController.apex - Apex class for backend logic.
	dynamicSearchControllerTest.apex - Test class for the Apex controller.
