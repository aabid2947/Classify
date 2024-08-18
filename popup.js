document.addEventListener('DOMContentLoaded', function () {
    // Get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // Extract the URL of the active tab
        var activeTabUrl = tabs[0].url;

        // Display the URL in the popup
        document.getElementById('urlDisplay').textContent = activeTabUrl;
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://example.com/api/data'; // Replace with your API URL

    // Function to fetch data from the API
    async function fetchData() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Function to display data on the page
    function displayData(data) {
        const summarySection = document.getElementById('summary-section');

        // Function to create and append data to the summary section
        function appendData(title, dataArray) {
            const sectionTitle = document.createElement('h3');
            sectionTitle.className = 'text-2xl text-purple-500 font-bold mt-4';
            sectionTitle.textContent = title;

            const list = document.createElement('ul');
            list.className = 'list-disc ml-5 mt-2';

            dataArray.forEach(item => {
                const listItem = document.createElement('li');
                listItem.className = 'mb-2';
                listItem.textContent = item;
                list.appendChild(listItem);
            });

            summarySection.appendChild(sectionTitle);
            summarySection.appendChild(list);
        }

        // Append data to the section
        appendData('Comments D (Exam Related)', data.d);
        appendData('Comments F (General Feedback)', data.f);
        appendData('Potential Exam Questions (PD)', data.pd);
        appendData('Potential Feedback (PF)', data.pf);
    }

    // Fetch and display the data
    fetchData();
});
