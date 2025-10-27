// カードの遅延アニメーション
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.app-card');

    // カードにスタッガードアニメーションを適用
    cards.forEach((card, index) => {
        card.style.animation = `fadeIn 0.6s ease-out ${index * 0.1}s both`;
    });

    // Intersection Observerでスクロール時のアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });
});

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// アプリを動的に追加する関数（将来的な拡張用）
function addApp(app) {
    const grid = document.getElementById('apps-grid');
    const card = document.createElement('div');
    card.className = 'app-card';

    card.innerHTML = `
        <div class="app-icon">${app.icon}</div>
        <h2 class="app-title">${app.title}</h2>
        <p class="app-description">${app.description}</p>
        <div class="app-tags">
            ${app.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <a href="${app.link}" class="app-link">アプリを開く →</a>
    `;

    grid.appendChild(card);
}

// 使用例（コメントアウト）
/*
addApp({
    icon: '🎨',
    title: 'New MR App',
    description: '新しいMRアプリケーションの説明',
    tags: ['WebXR', 'AR'],
    link: './new-app'
});
*/
