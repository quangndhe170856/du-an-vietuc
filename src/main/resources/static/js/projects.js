
const BASE_URL = window.location.origin;
const API = `${BASE_URL}/api/projects`;

fetch(API)
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("project-list");
        container.innerHTML = "";

        data.forEach(p => {
            container.innerHTML += `
                <div class="col-md-4 mb-4">
                    <div class="card h-100 shadow-sm">
                        <img src="${p.heroImage || 'https://via.placeholder.com/400x250'}"
                             class="card-img-top"
                             style="height:220px;object-fit:cover">

                        <div class="card-body">
                            <h5 class="card-title">${p.name}</h5>
                            <p class="text-muted">${p.location}</p>
                            <p class="small">${p.companyName}</p>

                            <a href="project-detail.html?id=${p.id}"
                               class="btn btn-outline-primary btn-sm">
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
    })
    .catch(() => alert("Không tải được dự án"));
