import { createElement } from 'lwc';
import DynamicSearchLWC from 'c/dynamicSearchLWC';
import fetchResults from '@salesforce/apex/DynamicSearchController.fetchResults';
// Mocking the Apex method
jest.mock(
    '@salesforce/apex/DynamicSearchController.fetchResults',
    () => {
        return {
            default: jest.fn()
        };
    },
    { virtual: true }
);

describe('c-dynamic-search-lwc', () => {
    afterEach(() => {
        // Clean up DOM changes after each test
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // Reset any mocks to prevent test leakage
        jest.clearAllMocks();
    });

    it('renders the input element correctly', () => {
        // Create initial element
        const element = createElement('c-dynamic-search-lwc', {
            is: DynamicSearchLWC
        });
        document.body.appendChild(element);

        // Query for the input element in the shadow DOM
        const inputElement = element.shadowRoot.querySelector('lightning-input');
        expect(inputElement).not.toBeNull();
        expect(inputElement.label).toBe('Search');
    });

    it('calls the Apex method with input value change', () => {
        const SEARCH_QUERY = 'Test Account';
        fetchResults.mockResolvedValue([{ Id: '12345', Name: 'Test Account', url: '/some-url' }]);

        // Create initial element
        const element = createElement('c-dynamic-search-lwc', {
            is: DynamicSearchLWC
        });
        document.body.appendChild(element);

        // Trigger input change
        const inputElement = element.shadowRoot.querySelector('lightning-input');
        inputElement.value = SEARCH_QUERY;
        inputElement.dispatchEvent(new CustomEvent('change'));

        // Verify that fetchResults is called
        expect(fetchResults).toHaveBeenCalledWith({
            objectName: 'Account',
            searchQuery: SEARCH_QUERY,
            searchField: 'Name'
        });
    });

    it('renders results after fetching data', async () => {
        // Mock the Apex call to return data
        fetchResults.mockResolvedValue([
            { Id: '12345', value: 'Test Account', url: '/lightning/r/Account/12345/view' }
        ]);

        // Create initial element
        const element = createElement('c-dynamic-search-lwc', {
            is: DynamicSearchLWC
        });
        document.body.appendChild(element);

        // Trigger input change
        const inputElement = element.shadowRoot.querySelector('lightning-input');
        inputElement.value = 'Test';
        inputElement.dispatchEvent(new CustomEvent('change'));

        // Await rerender after fetch
        await Promise.resolve();

        // Check for rendered list items
        const listItem = element.shadowRoot.querySelector('li');
        expect(listItem).not.toBeNull();
        expect(listItem.textContent).toContain('Test Account');
    });
});
