export class ProjectDetail extends HTMLElement {
    async connectedCallback() {
        const res = await fetch('./partials/project-detail.html');
        this.innerHTML = await res.text();

        const PROJECTS = {
            'amsterdam-apartment': {
                title: 'Квартира в Амстердаме',
                category: 'Ремонт под ключ',
                description: 'Полный ремонт трёхкомнатной квартиры в центре Амстердама. Работы включали демонтаж, выравнивание стен, укладку напольного покрытия, монтаж сантехники и электрики.',
                image: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&q=80',
            },
            'hilversum-house': {
                title: 'Частный дом в Хилверсюме',
                category: 'Строительство',
                description: 'Строительство частного дома площадью 180 м² под ключ. Фундамент, каркас, кровля, фасад, внутренняя отделка и ландшафтные работы.',
                image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
            },
            'villa-reconstruction': {
                title: 'Реконструкция виллы',
                category: 'Реконструкция',
                description: 'Полная реконструкция виллы 1970-х годов: усиление несущих конструкций, замена кровли, утепление фасада, обновление всех инженерных систем.',
                image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
            },
            'rotterdam-office': {
                title: 'Офис в Роттердаме',
                category: 'Ремонт под ключ',
                description: 'Ремонт офисного помещения 350 м² в деловом центре Роттердама. Open-space планировка, переговорные комнаты, кухня и зона отдыха.',
                image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
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

        el.innerHTML = `
            <div class="project-detail-inner">
                <span class="project-category">${project.category}</span>
                <h1 class="project-detail-title">${project.title}</h1>
                <img class="project-detail-img" src="${project.image}" alt="${project.title}">
                <p class="project-detail-desc">${project.description}</p>
            </div>
        `;
    }
}