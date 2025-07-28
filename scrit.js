document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YOUR_API_KEY'; // మీ GNews API కీని ఇక్కడ చేర్చండి
    const newsContainer = document.getElementById('news-container');

    // మీరు ఏ అంశంపై వార్తలు కావాలో ఇక్కడ మార్చుకోవచ్చు. ఉదా: 'technology', 'sports', 'telangana'
    const query = 'current affairs india telugu';
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=te&country=in&token=${apiKey}`;

    async function getNews() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`An error occurred: ${response.statusText}`);
            }
            const data = await response.json();
            displayNews(data.articles);
        } catch (error) {
            console.error("Failed to fetch news:", error);
            newsContainer.innerHTML = '<p>వార్తలను తీసుకురావడంలో లోపం జరిగింది. దయచేసి మళ్ళీ ప్రయత్నించండి.</p>';
        }
    }

    function displayNews(articles) {
        newsContainer.innerHTML = ''; // పాత లోడింగ్ సందేశాన్ని తొలగించండి

        if (!articles || articles.length === 0) {
            newsContainer.innerHTML = '<p>ప్రస్తుతానికి వార్తలు అందుబాటులో లేవు.</p>';
            return;
        }

        articles.forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.classList.add('news-article');

            const title = `<h2><a href="${article.url}" target="_blank">${article.title}</a></h2>`;
            const image = article.image ? `<img src="${article.image}" alt="${article.title}">` : '';
            const description = `<p>${article.description || ''}</p>`;
            const source = `<p><strong>మూలం:</strong> ${article.source.name}</p>`;

            articleElement.innerHTML = image + title + description + source;
            newsContainer.appendChild(articleElement);
        });
    }

    getNews();
});
