function recette() {
  let listeRecette = '';
  let recetteLightBox = '';

  for (let i = 0; i < recipes.length; i++) {

    // Affichage des recettes et création du contenu de la lightbox
    listeRecette += `  <button class="detailsRecette" onclick="ouvrirModal();imageActuelle(${1+i})" role="button" aria-pressed="true">`
    listeRecette += `    <div class="vide"></div>`
    listeRecette += `    <div class="nomTempsIngredientsRecette">`
    listeRecette += `      <div class="nomTemps">`
    listeRecette += `        <h3 class="nomRecette">${recipes[i].name}</h3>`;
    listeRecette += `        <h3 class="tempsRecette"><i class="fa-regular fa-clock"></i> ${recipes[i].time} min</h3>`
    listeRecette += `      </div>`
    listeRecette += `      <div class="ingredientsDescription">`
    listeRecette += `        <div class="Ingredients">`

    let ingredientRecette = recipes[i].ingredients;
    for (j= 0; j < ingredientRecette.length; j++) {
      if (ingredientRecette[j].ingredient != undefined && ingredientRecette[j].quantity != undefined && ingredientRecette[j].unit != undefined) {
        listeRecette += `    <h3 class="ingredientRecette" name="${ingredientRecette[j].ingredient}"> ${ingredientRecette[j].ingredient} : ${ingredientRecette[j].quantity} ${ingredientRecette[j].unit}</h3>`
      }
      if (ingredientRecette[j].ingredient != undefined && ingredientRecette[j].quantity != undefined && ingredientRecette[j].unit == undefined) {
        listeRecette += `    <h3 class="ingredientRecette" name="${ingredientRecette[j].ingredient}"> ${ingredientRecette[j].ingredient} : ${ingredientRecette[j].quantity}</h3>`
      }
      if (ingredientRecette[j].ingredient != undefined && ingredientRecette[j].quantity == undefined && ingredientRecette[j].unit == undefined) {
        listeRecette += `    <h3 class="ingredientRecette" name="${ingredientRecette[j].ingredient}"> ${ingredientRecette[j].ingredient}</h3>`
      }
    }

    listeRecette += `        </div>`
    listeRecette += `        <div class="descriptionContenant">`
    listeRecette += `          <h3 class="description">${recipes[i].description}</h3>`
    listeRecette += `        </div>`
    listeRecette += `      </div>`
    listeRecette += `    </div>`
    listeRecette += `  </button>`

    recetteLightBox += `<div class="image-lightbox">`
    recetteLightBox += `  <button class="fermer" aria-label="close dialog" onclick="fermerModal()">&times;</button>`
    recetteLightBox += `  <div class="imagetitre">`
    recetteLightBox += `    <div class="imagePrecSuiv">`
    recetteLightBox += `      <button class="precedant" aria-label="Previous image" onclick="plusImages(-1)">&#10094;</button>`
    recetteLightBox += `      <div class="RecetteDuPlat">`
    recetteLightBox += `        <h2 class="titre-lightbox">${recipes[i].name}</h2>`
    recetteLightBox += `        <h3 class="temps-lightbox"><i class="fa-regular fa-clock"></i> ${recipes[i].time} min</h3>`
    recetteLightBox += `        <h3 class="ListeDesIngredients">Liste des ingrédients :</h3>`
    for (j= 0; j < ingredientRecette.length; j++) {
      if (ingredientRecette[j].ingredient != undefined && ingredientRecette[j].quantity != undefined && ingredientRecette[j].unit != undefined) {
        recetteLightBox += `    <h3 class="ingredientRecetteLightbox"> ${ingredientRecette[j].ingredient} : ${ingredientRecette[j].quantity} ${ingredientRecette[j].unit}</h3>`
      }
      if (ingredientRecette[j].ingredient != undefined && ingredientRecette[j].quantity != undefined && ingredientRecette[j].unit == undefined) {
        recetteLightBox += `    <h3 class="ingredientRecetteLightbox"> ${ingredientRecette[j].ingredient} : ${ingredientRecette[j].quantity}</h3>`
      }
      if (ingredientRecette[j].ingredient != undefined && ingredientRecette[j].quantity == undefined && ingredientRecette[j].unit == undefined) {
        recetteLightBox += `    <h3 class="ingredientRecetteLightbox"> ${ingredientRecette[j].ingredient}</h3>`
      }
    }
    recetteLightBox += `        <h3 class="appareils-lightbox" name="${recipes[i].appliance}">Appareils : ${recipes[i].appliance}</h3>`
    recetteLightBox += `        <h3 class="ustensiles-lightbox" name="${recipes[i].ustensils}">Ustensiles : ${recipes[i].ustensils}</h3>`
    recetteLightBox += `        <h3 class="recette-lightbox">Recette : ${recipes[i].description}</h3>`
    recetteLightBox += `      </div>`
    recetteLightBox += `      <button class="suivant" aria-label="Next image" onclick="plusImages(1)">&#10095;</button>`
    recetteLightBox += `    </div>`
    recetteLightBox += `  </div>`
    recetteLightBox += `</div>`
  }
  // Injection du nouveau code html dans le DOM
  let idRealisations = document.querySelector('#recettes_section');
  idRealisations.innerHTML = listeRecette;

  let contenuLightbox = document.querySelector("#contenu-lightbox");
  contenuLightbox.innerHTML= recetteLightBox;
}


//Fonction de reconnaissance des touches flèche gauche, flèche droite et esc pour l'utilisation au clavier de la lightbox
function clavierLightboxFormulaire() {
  document.onkeydown = (evenement) => {
    evenement = evenement || window.event;
    if (evenement.key === 'ArrowLeft') {
      plusImages(-1);
    } else if (evenement.key === 'ArrowRight') {
      plusImages(1);
    } else if (evenement.key === 'Escape') {
      fermerModal();
    }
  }
}
clavierLightboxFormulaire();