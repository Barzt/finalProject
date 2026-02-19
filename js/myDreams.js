// Load and display dreams from the database 
document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("dreamsContainer");

    // Fetch dreams from server
    fetch('https://barzi.mtacloud.co.il/finalProject/includes/getDreams.php')
        .then(response => response.json())
        .then(data => {
            // Clear container and check if dreams exist
            container.innerHTML = "";

            if (data.length === 0) {
                container.innerHTML = '<div class="no-dreams">עדיין לא שמרת חלומות. <a href="form.html">לחצי כאן להוספה</a></div>';
                return;
            }

            // Loop through each dream and create cards
            data.forEach(dream => {
                // Create HTML article element for dream
                const dreamCard = document.createElement("article");
                dreamCard.className = "dream-card";
                
                // Add clarity level as data attribute for CSS styling
                dreamCard.setAttribute("data-clarity", dream.dream_level);

                // Format date to Hebrew locale
                const dateObj = new Date(dream.dream_date);
                const dateStr = dateObj.toLocaleDateString('he-IL');

                // Process tags from comma-separated string to HTML spans
                const tagsArray = dream.dream_tags ? dream.dream_tags.split(',') : [];
                let tagsHTML = '';
                tagsArray.forEach(tag => {
                    const cleanTag = tag.trim();
                    if(cleanTag !== "") {
                        // Add hashtag if not already present
                        const displayTag = cleanTag.startsWith('#') ? cleanTag : `#${cleanTag}`;
                        tagsHTML += `<span class="dream-tag">${displayTag}</span>`;
                    }
                });

                // Build dream card HTML content
                dreamCard.innerHTML = `
                    <div class="dream-header">
                        <div class="dream-date">📅 ${dateStr}</div>
                        <div class="dream-meta">
                            <span>⏰ ${dream.wake_time.slice(0, 5)}</span>
                            <span>✨ בהירות: ${dream.dream_level}/5</span>
                        </div>
                    </div>
                    <div class="dream-body">
                        ${dream.dream_description}
                    </div>
                    <div class="dream-tags">
                        ${tagsHTML}
                    </div>
                `;

                // Add card to page
                container.appendChild(dreamCard);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            container.innerHTML = '<p class="error">Error loading dreams</p>';
        });
});