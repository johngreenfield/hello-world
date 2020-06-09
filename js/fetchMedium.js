// Fetch Medium Articles Script by John Greenfield: https://johngreenfield.dev

document.addEventListener('DOMContentLoaded', () => {
    // Let's fetch the RSS feed, converted into JSON
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@johngreenfield')
    .then((res) => res.json())
    .then((data) => {
        //Filter through array
        const res = data.items;
        const posts = res.filter(item => item.categories.length > 0);
        
        //Convert to plain text
        function toPlainText(node) {
            let tag = document.createElement('div');
            tag.innerHTML = node;
            node = tag.innerText;
            return node;
        }

        //Condense the text to fit preview box
        function condenseText(text,startPoint,maxLength) {
            return text.length > maxLength?
            text.slice(startPoint, maxLength):
            text;
        }

        //Create variable to hold posts, properly formatted in HTML
        let output = '';
        posts.forEach((item => {
            output += `
            <li class="writing_post">
                <a href="${item.link}" target="_blank">
                <img src="${item.thumbnail}" class="writing_topImg"></img>
                <div class="writing_content">
                    <div class="writing_preview">
                        <h2 class="writing_title">${item.title}</h2>
                        <p class="writing_intro">${condenseText(toPlainText(item.content),60, 300)}</p>
                    </div>
                    <hr>
                    <div class="writing_info">
                        <span class="writing_author">${item.author}</span>
                        <span class="writing_date">${condenseText(item.pubDate,0 ,10)}</span>
                    </div>
                </div>
                <a/>
            </li>`;
        }));

        //Insert into DOM
        document.querySelector('.writing_slider').innerHTML = output;
    });
});