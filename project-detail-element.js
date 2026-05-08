export class ProjectDetail extends HTMLElement {
    async connectedCallback() {
        const res = await fetch('./partials/project-detail.html');
        this.innerHTML = await res.text();

        const PROJECTS = {
            'amsterdam-apartment': {
                title: 'Квартира в Амстердаме',
                category: 'Ремонт под ключ',
                description: 'Полный ремонт трёхкомнатной квартиры в центре Амстердама. Работы включали демонтаж, выравнивание стен, укладку напольного покрытия, монтаж сантехники и электрики.',
                images: [
                    'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&q=80',
                    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
                    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
                ],
            },
            'hilversum-house': {
                title: 'Частный дом в Хилверсюме',
                category: 'Строительство',
                description: 'Строительство частного дома площадью 180 м² под ключ. Фундамент, каркас, кровля, фасад, внутренняя отделка и ландшафтные работы.',
                images: [
                    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
                    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
                ],
            },
            'villa-reconstruction': {
                title: 'Реконструкция виллы',
                category: 'Реконструкция',
                description: 'Полная реконструкция виллы 1970-х годов: усиление несущих конструкций, замена кровли, утепление фасада, обновление всех инженерных систем.',
                images: [
                    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
                    'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&q=80',
                    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
                ],
            },
            'rotterdam-office': {
                title: 'Офис в Роттердаме',
                category: 'Ремонт под ключ',
                description: 'Ремонт офисного помещения 350 м² в деловом центре Роттердама. Open-space планировка, переговорные комнаты, кухня и зона отдыха.',
                images: [
                    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
                    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80',
                    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
                ],
            },
        };

        const id = new URLSearchParams(location.search).get('id');
        const project = PROJECTS[id];
        const el = this.querySelector('#project-content');

        if (!project) {
            el.innerHTML = '<p>Проект не найден.</p>';
            return;
        }

        document.title = project.title + ' — North Builders';

        // Build carousel slides — first image loads eagerly, rest use data-src for lazy loading
        const slides = project.images.map((src, i) => {
            if (i === 0) {
                return `<div class="carousel-slide"><img class="carousel-img" src="${src}" alt="${project.title} — фото ${i + 1}"></div>`;
            }
            return `<div class="carousel-slide"><img class="carousel-img" data-src="${src}" alt="${project.title} — фото ${i + 1}"></div>`;
        }).join('');

        const dots = project.images.map((_, i) =>
            `<button class="carousel-dot${i === 0 ? ' active' : ''}" aria-label="Фото ${i + 1}"></button>`
        ).join('');

        el.innerHTML = `
            <div class="project-detail-inner">
                <span class="project-category">${project.category}</span>
                <h1 class="project-detail-title">${project.title}</h1>
                <div class="carousel">
                    <div class="carousel-track">${slides}</div>
                    <div class="carousel-dots">${dots}</div>
                </div>
                <p class="project-detail-desc">${project.description}</p>
            </div>
        `;

        // Lazy-load images as their slide scrolls into view
        const track = el.querySelector('.carousel-track');
        const lazyImgs = el.querySelectorAll('img[data-src]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, { root: track, threshold: 0.1 });

        lazyImgs.forEach(img => observer.observe(img));

        // Update active dot on scroll
        const dotsEls = el.querySelectorAll('.carousel-dot');
        const slides2 = el.querySelectorAll('.carousel-slide');
        const slideObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = Array.from(slides2).indexOf(entry.target);
                    dotsEls.forEach((d, i) => d.classList.toggle('active', i === idx));
                }
            });
        }, { root: track, threshold: 0.5 });

        slides2.forEach(slide => slideObserver.observe(slide));

        // Dot click scrolls to slide
        dotsEls.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                slides2[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            });
        });
    }
}
