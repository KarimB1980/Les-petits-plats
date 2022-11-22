//-------------------------------------------------------------------------------------------------------------------------------------------//
// FONCTIONS POUR LES INGREDIENTS //
// Fonction pour la création de la liste des ingrédients
function listeIngredients(tableauRecettes = recipes) { 
  let ingredients = document.querySelector("#ingredients");
  ingredients.addEventListener("click", () =>
    {
      document.querySelector("#ingredients-recherche").value = "";
      document.querySelector(".tableau-des-ingredients").innerHTML = "";

      // Création de la liste ingrédients
      let listeIngredientsRecettes = [];
      let IngredientsRecettes = document.querySelectorAll(".ingredientRecette");
      IngredientsRecettes.forEach((IngredientRecettes) =>
        {
          listeIngredientsRecettes.push(IngredientRecettes.getAttribute("name"));          
        }
      )
      // Tri par ordre alphabétique des valeurs
      listeIngredientsRecettes.sort();
      // Supression des doublons du tableau "listeIngredientsRecettes"
      let listeDesIngredients = [...new Set(listeIngredientsRecettes)];

      for (let j = 0; j < listeDesIngredients.length; j++) {
        let tableauIngredientsFiltres = document.createElement("button");
        tableauIngredientsFiltres.setAttribute("class", "tableau-ingredients-filtres");
        tableauIngredientsFiltres.setAttribute("name",listeDesIngredients[j]);
        document.querySelector(".tableau-des-ingredients").appendChild(tableauIngredientsFiltres);
        tableauIngredientsFiltres.innerText = listeDesIngredients[j];
      }

      // Supression des boutons du tableau des ingrédients déjà sélectionnés
      let boutonsIngredientsFiltres = document.querySelectorAll(".bouton-ingredient-filtre");
      boutonsIngredientsFiltres.forEach((boutonIngredientFiltre) =>
        {
          let boutonsIngredientsTableau = document.querySelectorAll(".tableau-ingredients-filtres");
          boutonsIngredientsTableau.forEach((boutonIngredientTableau) =>
            {
              if (boutonIngredientTableau.name == boutonIngredientFiltre.name) {
                boutonIngredientTableau.remove();
              }
            }
          )
        }
      )

      document.querySelector("#ingredients-recherche").style.display = "block";
      document.querySelector(".tableau-des-ingredients").style.display = "block";
      document.querySelector("#menu > div.boutons-ingredients-recherche-angle-up-liste > div > div.ingredients-recherche-angle-up > button").style.display = "block";
      document.querySelector("#ingredients").style.display = "none";

      document.querySelector("#appareils-recherche").style.display = "none";
      document.querySelector(".tableau-des-appareils").style.display = "none";
      document.querySelector("#menu > div.boutons-appareils-recherche-angle-up-liste > div > div.appareils-recherche-angle-up > button").style.display = "none";
      document.querySelector("#appareils").style.display = "block";

      document.querySelector("#ustensiles-recherche").style.display = "none";
      document.querySelector(".tableau-des-ustensiles").style.display = "none";
      document.querySelector("#menu > div.boutons-ustensiles-recherche-angle-up-liste > div > div.ustensiles-recherche-angle-up > button").style.display = "none";
      document.querySelector("#ustensiles").style.display = "block";

      saisieIngredient();
      clicBoutonlisteIngredients();
    }
  )
}
listeIngredients();

// Fonction de création des boutons d'ingrédients sélectionnés et création d'un tableau des recettes restantes
function clicBoutonlisteIngredients(tableauRecettes = recipes) {
  let clicBoutonIngredients = document.querySelectorAll(".tableau-ingredients-filtres");
  clicBoutonIngredients.forEach((clicBoutonIngredient) =>
    clicBoutonIngredient.addEventListener("click", () =>
      {
        document.querySelector("#ingredients-recherche").value = clicBoutonIngredient.name;

        // Création du bouton de l'ingrédient choisi
        let boutonIngredientFiltre = document.createElement("button");
        boutonIngredientFiltre.setAttribute("class", "bouton-ingredient-filtre");
        boutonIngredientFiltre.setAttribute("name", document.querySelector("#ingredients-recherche").value);
        let croixIngredientFiltre = document.createElement("i");
        croixIngredientFiltre.setAttribute("class", "fa-regular fa-circle-xmark");
        document.querySelector(".buttonsIngredientsRecherches").prepend(boutonIngredientFiltre);
        boutonIngredientFiltre.textContent = document.querySelector("#ingredients-recherche").value, croixIngredientFiltre;
        document.querySelector(".bouton-ingredient-filtre").appendChild(croixIngredientFiltre);

        // Création d'un bouton à supprimer pour le lancement de la fonction suppressionBoutonFiltreIngredient()
        let boutonIngredientASupprimer = document.createElement("button");
        boutonIngredientASupprimer.setAttribute("class", "bouton-ingredient-filtre");
        document.querySelector(".buttonsIngredientsRecherches").prepend(boutonIngredientASupprimer);

        // Masquage de la liste des ingrédients
        document.querySelector("#ingredients-recherche").style.display = "none";
        document.querySelector(".tableau-des-ingredients").style.display = "none";
        document.querySelector("#menu > div.boutons-ingredients-recherche-angle-up-liste > div > div.ingredients-recherche-angle-up > button").style.display = "none";
        document.querySelector("#ingredients").style.display = "block";

        // Lancement de la fonction suppressionBoutonFiltreIngredient() et suppressiion du bouton à supprimer
        suppressionBoutonFiltreIngredient(tableauRecettes = recipes);
        boutonIngredientASupprimer.click();
      }
    )
  )
};

// Fonction de recherche d'un ingrédient par saisie dans le champ "Rechercher un ingrédient"
function saisieIngredient() {
  let listeTableauIngredients = [];
  let clicBoutonIngredients = document.querySelectorAll(".tableau-ingredients-filtres");
  clicBoutonIngredients.forEach((clicBoutonIngredient) =>
    {
      // Recherche des ingrédients par saisie d'un valeur supérieure ou égale à trois caractères dans le champ de recherche
      let champDeRechercheIngredients = document.querySelector("#ingredients-recherche");
      champDeRechercheIngredients.addEventListener("keyup", () =>
        {
          if (champDeRechercheIngredients.value.length >= 3) {
            listeTableauIngredients.push(clicBoutonIngredient.name);
            document.querySelector(".tableau-des-ingredients").innerHTML = "";
            let ingredientsTrouves = [];

            for(let i = 0; i < listeTableauIngredients.length; i++) {
              let champDeRechercheEnMinuscules = champDeRechercheIngredients.value.toLowerCase();
              let resultatIngredients = listeTableauIngredients[i].toLowerCase().includes(champDeRechercheEnMinuscules);
              if (resultatIngredients==true) {
                ingredientsTrouves.push(listeTableauIngredients[i]);
              }
            }
            // Supression des doublons du tableau "ingredientsTrouves"
            ingredientsTrouves = [...new Set(ingredientsTrouves)];

            for (let j = 0; j < ingredientsTrouves.length; j++) {
              let tableauIngredientsFiltres = document.createElement("button");
              tableauIngredientsFiltres.setAttribute("class", "tableau-ingredients-filtres");
              tableauIngredientsFiltres.setAttribute("name", ingredientsTrouves[j]);

              document.querySelector(".tableau-des-ingredients").appendChild(tableauIngredientsFiltres);
              tableauIngredientsFiltres.innerText = ingredientsTrouves[j];
            }
          } 
          else 
          {
            document.querySelector(".tableau-des-ingredients").innerHTML = "";
            // Création de la liste ingrédients
            let listeIngredientsRecettes = [];
            let IngredientsRecettes = document.querySelectorAll(".ingredientRecette");
            IngredientsRecettes.forEach((IngredientRecettes) =>
              {
                listeIngredientsRecettes.push(IngredientRecettes.getAttribute("name"));          
              }
            )

            // Tri par ordre alphabétique des valeurs
            listeIngredientsRecettes.sort();
            // Supression des doublons du tableau "listeIngredientsRecettes"
            let listeDesIngredients = [...new Set(listeIngredientsRecettes)];

            for (let j = 0; j < listeDesIngredients.length; j++) {
              let tableauIngredientsFiltres = document.createElement("button");
              tableauIngredientsFiltres.setAttribute("class", "tableau-ingredients-filtres");
              tableauIngredientsFiltres.setAttribute("name",listeDesIngredients[j]);
              document.querySelector(".tableau-des-ingredients").appendChild(tableauIngredientsFiltres);

              tableauIngredientsFiltres.innerText = listeDesIngredients[j];
            }
            // Supression des boutons du tableau des ingrédients déjà sélectionnés
            let boutonsIngredientsFiltres = document.querySelectorAll(".bouton-ingredient-filtre");
            boutonsIngredientsFiltres.forEach((boutonIngredientFiltre) =>
              {
                let boutonsIngredientsTableau = document.querySelectorAll(".tableau-ingredients-filtres");
                boutonsIngredientsTableau.forEach((boutonIngredientTableau) =>
                  {
                      if (boutonIngredientTableau.name == boutonIngredientFiltre.name) {
                      boutonIngredientTableau.remove();
                    }
                  }
                )
              }
            )
          }
          clicBoutonlisteIngredients(tableauRecettes = recipes);
        }
      )
    }
  )
}

// Fonction d'affichage des recettes restantes suite à la sélection d'ingrédients
function listeDesRecettesIngredients(tableauRecettes = recipes) {
  let elementsTrouves = [];
  let listeBoutonsIngredient = document.querySelectorAll(".bouton-ingredient-filtre");
  listeBoutonsIngredient.forEach((boutonIngredient) => 
    {
      for (let i = 0; i < tableauRecettes.length; i++) {
        let ingredientRecette = tableauRecettes[i].ingredients;
        for (j= 0; j < ingredientRecette.length; j++) {
          if (ingredientRecette[j].ingredient == boutonIngredient.name) {
            elementsTrouves.push(tableauRecettes[i]);
          }
        }
      }
    }
  )
  let ElementsTrouvesSansDoublons = [...new Set(elementsTrouves)];
  let listeRecette = '';
  let recetteLightBox = '';

  for (let i = 0; i < ElementsTrouvesSansDoublons.length; i++) {

    // Affichage des recettes et création du contenu de la lightbox
    listeRecette += `  <button class="detailsRecette" onclick="ouvrirModal();imageActuelle(${1+i})" role="button" aria-pressed="true">`
    listeRecette += `    <div class="vide"></div>`
    listeRecette += `    <div class="nomTempsIngredientsRecette">`
    listeRecette += `      <div class="nomTemps">`
    listeRecette += `        <h3 class="nomRecette">${ElementsTrouvesSansDoublons[i].name}</h3>`;
    listeRecette += `        <h3 class="tempsRecette"><i class="fa-regular fa-clock"></i> ${ElementsTrouvesSansDoublons[i].time} min</h3>`
    listeRecette += `      </div>`
    listeRecette += `      <div class="ingredientsDescription">`
    listeRecette += `        <div class="Ingredients">`

    let ingredientRecette = ElementsTrouvesSansDoublons[i].ingredients;
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
    listeRecette += `          <h3 class="description">${ElementsTrouvesSansDoublons[i].description}</h3>`
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
    recetteLightBox += `        <h2 class="titre-lightbox">${ElementsTrouvesSansDoublons[i].name}</h2>`
    recetteLightBox += `        <h3 class="temps-lightbox"><i class="fa-regular fa-clock"></i> ${ElementsTrouvesSansDoublons[i].time} min</h3>`
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
    recetteLightBox += `        <h3 class="appareils-lightbox" name="${ElementsTrouvesSansDoublons[i].appliance}">Appareils : ${ElementsTrouvesSansDoublons[i].appliance}</h3>`
    recetteLightBox += `        <h3 class="ustensiles-lightbox" name="${ElementsTrouvesSansDoublons[i].ustensils}">Ustensiles : ${ElementsTrouvesSansDoublons[i].ustensils}</h3>`
    recetteLightBox += `        <h3 class="recette-lightbox">Recette : ${ElementsTrouvesSansDoublons[i].description}</h3>`
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

// fonction de suppression d'un ingrédient sélectionné
function suppressionBoutonFiltreIngredient(tableauRecettes = recipes) {
  let boutonsFiltreIngredients = document.querySelectorAll(".bouton-ingredient-filtre");
  boutonsFiltreIngredients.forEach((boutonFiltreIngredient) =>
    boutonFiltreIngredient.addEventListener("click", () =>
      {
        // Suppression du bouton de l'ingrédient cliqué
        boutonFiltreIngredient.remove();

        // Création du tableau de la liste des ingrédients
        document.querySelector("#ingredients-recherche").value = "";
        document.querySelector(".tableau-des-ingredients").innerHTML = "";
        let listeIngredientsRecettes = [];
        for (let i = 0; i < tableauRecettes.length; i++) {
          let ingredientRecette = tableauRecettes[i].ingredients;
          for (let j= 0; j < ingredientRecette.length; j++) {
            listeIngredientsRecettes.push(ingredientRecette[j].ingredient);
          }
        }
        // Tri par ordre alphabétique des ingrédients
        listeIngredientsRecettes.sort();
        // Supression des doublons du tableau "listeIngredientsRecettes"
        let listeDesIngredients = [...new Set(listeIngredientsRecettes)];
        // Création de l'affichage de la liste des ingrédients
        for (let l = 0; l <listeDesIngredients.length; l++) {
          let tableauIngredientsFiltres = document.createElement("button");
          tableauIngredientsFiltres.setAttribute("class", "tableau-ingredients-filtres");
          tableauIngredientsFiltres.setAttribute("name", listeDesIngredients[l]);
          document.querySelector(".tableau-des-ingredients").appendChild(tableauIngredientsFiltres);
          tableauIngredientsFiltres.innerText = listeDesIngredients[l];
        }
        tableauRecettes = recipes;



        // Si tous les ingrédients ont été supprimés, alors affichage de toutes les recettes
        if (document.querySelector(".buttonsIngredientsRecherches").children.length == 0) {
          recette();
        }
        // Sélection de tous les boutons des ingrédients filtrés sauf celui cliqué
        let boutonsIngredient = document.querySelectorAll(".bouton-ingredient-filtre");
        boutonsIngredient.forEach((boutonIngredient) => 
          {
            // Sélection de tous les boutons dans la liste des ingrédients
            let BoutonIngredients = document.querySelectorAll(".tableau-ingredients-filtres");
            BoutonIngredients.forEach((BoutonIngredient) =>
              {
                // Si le nom de l'ingrédient dans le tableau des ingrédients est égal à celui du nom du bouton ingrédient filtré restant alors on injecte cet ingrédient dans "elementsTrouves"
                if(BoutonIngredient.name == boutonIngredient.name) {
                  document.querySelector("#ingredients-recherche").value = boutonIngredient.name;
                  let elementsTrouves = [];
                  let champDeRecherche = document.querySelector("#ingredients-recherche");
                  for(let i = 0; i < tableauRecettes.length; i++) {
                    // Recherche de la valeur dans les ingrédients de la recette
                    let ingredientRecette = tableauRecettes[i].ingredients;
                    //console.log(ingredientRecette);
                    for (let j= 0; j < ingredientRecette.length; j++) {
                      let NomIngredientRecetteActuelle = ingredientRecette[j].ingredient;
                      // Injection des recettes contenant l'ingrédient sélectionné dans le tableau "elementsTrouves"
                      if (NomIngredientRecetteActuelle == champDeRecherche.value) {
                        elementsTrouves.push(tableauRecettes[i]);
                      }
                    }
                  }
                  // Appel de la fonction listeDesRecettesIngredients() pour l'affichage des recettes restantes
                  listeDesRecettesIngredients(tableauRecettes = elementsTrouves);

                  // Simulation d'un clic sur la flèche vers le haut dans le champs de recherche d'un ingrédient
                  let faAngleUps = document.querySelectorAll(".fa-angle-up");
                  faAngleUps.forEach((faAngleUp) => 
                    {
                      faAngleUp.click();
                    }
                  )
                }
              }
            )
          }
        )
      }
    )
  )
}