console.log(recipes);

// Fonction d'initialisation de la page index.html
function initialisation() {
  //Création de l'en-tête de la page index.html
  let enteteindex = "";

  enteteindex += `<header>`
  enteteindex += `  <img src="assets/logo.png" id="logo" alt="Les petits plats">`
  //enteteindex += `  <h1>Nos photographes</h1>`
  enteteindex += `</header>`
  enteteindex += `<section id="recherche">`
  //enteteindex += `  <label for="site-search">Recherche</label>`
  enteteindex += `  <input type="search" id="barre-de-recherche" name="recherche" placeholder="Rechercher une recette">`
  enteteindex += `  <button id="loupe"><i class="fa fa-search" aria-hidden="true"></i></button>`
  enteteindex += `</section>`
  enteteindex += `<nav>`
  enteteindex += `  <div id="menu">`
  enteteindex += `    <button tabindex="0" id="ingredients" class="bouton"><p class="valeurIngredient"> Ingrédients <em class="fa fa-angle-down"></em></p></button>`
  enteteindex += `    <button tabindex="0" id="appareils" class="bouton"><p class="valeurAppareil"> Appareils <em class="fa fa-angle-down"></em></p></button>`
  enteteindex += `    <button tabindex="0" id="ustensiles" class="bouton"><p class="valeurUstensiles"> Ustensiles <em class="fa fa-angle-down"></em></p></button>`
  enteteindex += `  </div>`
  enteteindex += `</nav>`
  enteteindex += `<main id="main">`
  enteteindex += `  <div id="recettes_section"></div>`
  enteteindex += `</main>`
  enteteindex += `<div id="lightbox" class="modal-lightbox">`
  enteteindex += `  <div id="contenu-lightbox"></div>`
  enteteindex += `</div>`

  // Injection du code html dans le body
  document.querySelector("#body").innerHTML = enteteindex;

  recette();
}
initialisation();