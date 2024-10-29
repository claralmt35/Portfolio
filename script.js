const docs = [
    {
        title: "Transmilenio, un réseau sécurisant",
        description:
            "Etude de l'offre de transport de Transmilenio à Bogotá et des données issues de l'application SafetiPin, permettant aux femmes d'évaluer la sécurité des lieux qu'elles visitent selon divers critères tels que la présence mixte, la présence d'agents de sécurité ou encore le niveau d'éclairage",
        url: "https://github.com/claralmt35/portefolio/blob/main/GTFS.png?raw=true",
        tags: ["Infographies et posters"]
    },
    {
        title: "Qu'en est-il de la démographie française ?",
        description:
            "Etude des taux de natalité et de mortalité des départements français au travers de l'anamorphose, réalisée avec Morgan ALLICE",
        url: "https://github.com/claralmt35/portefolio/blob/main/Anamorphose.png?raw=true",
        tags: ["Cartographies"]
    },
    {
        title: "Le temps de trajet domicile-travail influence t-il la qualité de l'air ?",
        description:
            "Analyse bivariée du temps moyen de trajet domicile-travail et de la pollution de l'air par les particules fines dans les comtés américains",
        url: "https://github.com/claralmt35/portefolio/blob/main/carte_biv.png?raw=true",
        tags: ["Cartographies"]
    },
    {
        title: "La bière monte en pression",
        description:
            "Infographie sur la bière dans le monde, réalisée avec Jonas CONSTANT et Tristan LERAY",
        url: "https://github.com/claralmt35/portefolio/blob/main/info-biere.jpg?raw=true",
        tags: ["Infographies et posters"]
    },
    {
        title: "Répartition de la population rennaise",
        description:
            "Ventilation spatiale de la population rennaise à l'échelle du bâtiment",
        url: "https://github.com/claralmt35/portefolio/blob/main/vent_spat_rennes.jpg?raw=true",
        tags: ["Cartographies"]
    },
   {
        title: "Plongée dans le Box Office en France",
        description:
            "Infographie sur le cinema en France",
        url: "https://github.com/claralmt35/portefolio/blob/main/info-cine.png?raw=true",
        tags: ["Infographies et posters"]
    },   {
        title: "La géomatique pour le suivi de la montée des eaux",
        description:
            "Poster sur la révolution du satellite SWOT et de KaRIn",
        url: "https://github.com/claralmt35/portefolio/blob/main/poster-montee.png?raw=true",
        tags: ["Infographies et posters"]
    }
];


const docContainer = document.querySelector(".docs");

const tagColors = {
    "Tous mes travaux": "grey",
    Cartographies: "blue",
    "Infographies et posters": "green",
    Code: "yellow",
    "Télédétection": "pink"
};

const docSelection = document.querySelector(".tag-selection");

// Création du modal pour l'affichage de l'image en plein écran
const modal = document.createElement('div');
modal.classList.add('modal');
document.body.appendChild(modal);

// Création du contenu du modal
modal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <img id="modal-image" src="" alt="Document Image">
    <p id="modal-text" class="modal-text"></p>
  </div>
`;

// Sélection des éléments du modal
const modalImage = modal.querySelector('#modal-image');
const modalText = modal.querySelector('#modal-text');
const closeModal = modal.querySelector('.close');

// Fermeture du modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fermeture du modal en cliquant en dehors du contenu
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Affichage immédiat des documents au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    filterDocs(); // Affiche tous les documents au chargement
});

// Gestion de l'événement de clic sur le conteneur des documents
docContainer.addEventListener("click", function (e) {
    const tagItem = e.target.closest(".docs__tag");
    if (!tagItem) return;
    const tag = tagItem.textContent;
    highlightTag(tag);
    filterDocs(tag);
});

// Gestion de l'événement de clic sur la sélection de tags
docSelection.addEventListener("click", function (e) {
    const tagItem = e.target.closest(".docs__tag");
    if (!tagItem) return;
    const tag = tagItem.textContent;
    if (tagItem.classList.contains("tag-inactive")) {
        highlightTag(tag);
        filterDocs(tag);
    } else {
        highlightTag();
        filterDocs();
    }
});

// Fonction pour filtrer les documents
function filterDocs(tag = "Tous mes travaux") {
    if (tag === "Tous mes travaux") return printDocs(docs);
    const filteredDocs = docs.filter((doc) => doc.tags.includes(tag));
    printDocs(filteredDocs);
}

// Fonction pour mettre en évidence le tag sélectionné
function highlightTag(tag = "Tous mes travaux") {
    docSelection.querySelectorAll("p").forEach((tagSelect) => {
        if (tagSelect.textContent === tag) tagSelect.classList.remove("tag-inactive");
        else tagSelect.classList.add("tag-inactive");
    });
}

// Fonction pour afficher les documents
function printDocs(docArray) {
    docContainer.innerHTML = ""; // Réinitialise le conteneur

    docArray.forEach((doc) => {
        let tags = "";
        doc.tags.forEach((tag) => {
            const tagHTML = `
                <p class="docs__tag docs__tag--${tagColors[tag] ? tagColors[tag] : "grey"}">${tag}</p>
            `;
            tags += tagHTML;
        });

        const html = `
            <div class="docs__item">
                <img src="${doc.url}" alt="${doc.title}" data-title="${doc.title}" data-description="${doc.description}">
                <div>
                    <h3>${doc.title}</h3>
                </div>
                <div class="docs__tags">
                    ${tags}
                </div>
            </div>
        `;

        docContainer.insertAdjacentHTML("beforeend", html);
    });

    // Ajout d'un gestionnaire d'événements pour les images
    const docImages = document.querySelectorAll(".docs__item img");
    docImages.forEach((img) => {
        img.addEventListener("click", (e) => {
            const target = e.target;
            modalImage.src = target.src;
            modalText.textContent = target.dataset.description;
            modal.style.display = 'block';
        });
    });
}
// Sélectionnez tous les tags
const tags = document.querySelectorAll('.docs__tag');

// Ajoutez un événement de clic à chaque tag
tags.forEach(tag => {
    tag.addEventListener('click', () => {
        // Retirez la classe "active" de tous les tags
        tags.forEach(t => t.classList.remove('active'));
        
        // Ajoutez la classe "active" au tag cliqué
        tag.classList.add('active');
        
        // Filtrer les documents par tag
        const tagText = tag.textContent;
        filterDocs(tagText); // Appelez votre fonction pour filtrer les documents
    });
});