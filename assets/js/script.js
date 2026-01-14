document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    const stickyNav = document.querySelector('.sticky-nav');
    const header = document.querySelector('.header-logo');
    if (stickyNav && header) {
        window.addEventListener('scroll', () => {
            const stickyThreshold = stickyNav.offsetTop;
            const scrollY = window.scrollY;

            if (scrollY > stickyThreshold) {
                stickyNav.classList.add('scrolled');
            } else {
                stickyNav.classList.remove('scrolled');
            }
            // Ensure background is transparent when not scrolled
            if (!stickyNav.classList.contains('scrolled')) {
                stickyNav.style.backgroundColor = 'transparent';
            } else {
                stickyNav.style.backgroundColor = ''; // Use CSS default for .scrolled
            }
        });
    }

    // Inline search functionality
    const searchToggle = document.getElementById('searchToggle');
    const inlineSearch = document.getElementById('inlineSearch');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Define searchable pages/content
    const searchableContent = [
        { title: '醫師介紹', url: 'main.html', keywords: '醫師 介紹 黃易欣 皮膚科 Esheen' },
        { title: '皮膚疾病', url: '#', keywords: '皮膚 疾病 治療 青春痘 濕疹 乾癬' },
        { title: '醫學美容', url: '#', keywords: '醫學 美容 雷射 注射 拉提' },
        { title: '預約掛號', url: '#', keywords: '預約 掛號 門診 時間' },
        { title: '聯絡我', url: 'contact.html', keywords: '聯絡 聯繫 email 電話' },
        { title: '經歷', url: 'main.html#experience', keywords: '經歷 長庚 皮膚科 專科醫師' },
        { title: '學會', url: 'main.html#societies', keywords: '學會 會員 美容 皮膚科' },
        { title: '專長', url: 'main.html#specialty', keywords: '專長 青春痘 痘疤 落髮 雷射' },
        { title: '門診時間', url: 'main.html#schedule', keywords: '門診 時間 桃園長庚 雲林長庚 台北長庚 林口長庚' }
    ];

    if (searchToggle) {
        searchToggle.addEventListener('click', (e) => {
            e.preventDefault();
            inlineSearch.classList.toggle('active');
            if (inlineSearch.classList.contains('active')) {
                searchInput.focus();
            } else {
                searchInput.value = '';
                searchResults.innerHTML = '';
                searchResults.classList.remove('active');
            }
        });
    }

    // Close search when clicking outside
    document.addEventListener('click', (e) => {
        if (inlineSearch && !inlineSearch.contains(e.target) && !searchToggle.contains(e.target)) {
            inlineSearch.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
        }
    });

    // Search input handler
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            if (query.length < 1) {
                searchResults.innerHTML = '';
                searchResults.classList.remove('active');
                return;
            }

            const results = searchableContent.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.keywords.toLowerCase().includes(query)
            );

            if (results.length > 0) {
                searchResults.innerHTML = results.map(item => `
                    <div class="search-result-item">
                        <a href="${item.url}">
                            <span class="search-result-title">${item.title}</span>
                        </a>
                    </div>
                `).join('');
                searchResults.classList.add('active');
            } else {
                searchResults.innerHTML = '<div class="search-no-results">找不到相關內容</div>';
                searchResults.classList.add('active');
            }
        });
    }
});
