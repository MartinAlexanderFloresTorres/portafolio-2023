//===== variables =====
const loader = document.querySelector("#loader")
const menuToggle = document.querySelector("#menu");
const navegacion = document.querySelector("#navegacion");
const itemLinks = document.querySelectorAll(".menu_link-toggle");
const moonToggle = document.querySelector(".menu__moon");
const sunToggle = document.querySelector(".menu__sun");
const body = document.querySelector("body");

//===== quitar logo al cargar el documento =====
document.addEventListener("DOMContentLoaded", () => {
    loader.style.display = "none"
    body.style.overflow = "auto"
})

//===== funciones =====
function Llamarswiper() {
    let swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
                slidesPerGroup: 1,
            },
            780: {
                slidesPerView: 2,
                spaceBetween: 40,
                slidesPerGroup: 1,
            },
            920: {
                slidesPerView: 3,
                spaceBetween: 40,
                slidesPerGroup: 1,
            },
        },
    });
}

//===== eventos =====

menuToggle.addEventListener("click", () => {
    navegacion.classList.toggle("active");
});
itemLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navegacion.classList.remove("active");
    });
});
sunToggle.addEventListener("click", () => {
    body.classList.add("sun");
    localStorage.setItem("modo-portafolio2023", "sun");
});
moonToggle.addEventListener("click", () => {
    if (body.classList.contains("sun")) {
        body.classList.remove("sun");
    }
    localStorage.setItem("modo-portafolio2023", "");
});

//===== cargar tema =====
let getModo = localStorage.getItem("modo-portafolio2023");
if (getModo) {
    body.classList.add(getModo);
}
//===== proyectos__contenedor =====
const modal = document.querySelector("#modal");
const modalHablidades = modal.querySelector("#modal-hablidades");

body.addEventListener("click", (e) => {
    if (e.target.classList.contains("proyectos__imagen")) {
        limpiarHtml(modalHablidades);

        modal.classList.add("active");
        body.style.overflow = "hidden";

        const id = parseInt(e.target.getAttribute("data-id") - 1);
        const {
            titulo,
            url,
            source,
            descripcion1,
            descripcion2,
            tecnologias,
        } = proyectos[id];

        modal.querySelector("#modal-imagen").src = e.target.src;
        modal.querySelector("#modal-titulo").textContent = titulo;
        modal.querySelector("#parrafo-1").textContent = descripcion1;
        modal.querySelector("#parrafo-2").textContent = descripcion2;
        modal.querySelector("#modal-url").href = url;
        modal.querySelector("#modal-source").href = source;

        for (let i = 0; i < tecnologias[0]; i++) {
            const { titulo, src } = tecnologias[1][i];

            const div = document.createElement("div");
            div.classList.add("habilidades__item");

            const img = document.createElement("img");
            img.classList.add("habilidades__logo");
            img.alt = titulo;
            img.src = src;

            const divP = document.createElement("DIV");
            divP.classList.add("habilidades__texto");
            divP.textContent = titulo;

            div.appendChild(img);
            div.appendChild(divP);

            modalHablidades.appendChild(div);
        }
    }
});

//===== eliminar html =====
function limpiarHtml(contenedor) {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}
modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
        modal.classList.remove("active");
        body.style.overflow = "auto";
    }
    if (e.target.classList.contains("modal__close")) {
        modal.classList.remove("active");
        body.style.overflow = "auto";
    }
});

//===== proyectos =====
const contenedorUno = document.querySelector("#contenedor-1");
const contenedorDos = document.querySelector("#contenedor-2");
proyectos.forEach((proyecto, index) => {
    const { imagen, titulo, id } = proyecto;

    const div = document.createElement("div");
    const img = document.createElement("IMG");
    img.classList.add("proyectos__imagen");
    img.dataset.id = id;
    img.src = imagen;
    img.alt = titulo;

    if (index < 6) {
        div.appendChild(img);
        contenedorUno.appendChild(div);
    } else {
        div.classList.add("swiper-slide");
        div.appendChild(img);
        contenedorDos.appendChild(div);
    }
});
Llamarswiper();
