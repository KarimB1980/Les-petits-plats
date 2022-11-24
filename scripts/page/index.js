console.log(recipes);
// FONCTIONS GENERALES //
// Fonction d'initialisation de la page index.html
function initialisation() {
  //Création de l'en-tête de la page index.html
  let enteteindex = "";

  enteteindex += `<header>`
  enteteindex += `  <img src="assets/logo.png" id="logo" alt="Les petits plats">`
  enteteindex += `</header>`
  enteteindex += `<section id="recherche">`
  enteteindex += `  <div id="barre-de-recherche-loupe">`
  enteteindex += `    <input type="search" id="barre-de-recherche" name="recherche" placeholder="Rechercher une recette" minlength="3">`
  //enteteindex += `    <button id="loupe"><i class="fa fa-search" aria-hidden="true"></i></button>`
  enteteindex += `    <div id="loupe"><i class="fa fa-search"></i></div>`
  enteteindex += `  </div>`
  enteteindex += `  <div id="messageErreurRecherche"></div>`
  enteteindex += `</section>`
  enteteindex += `<nav>`
  enteteindex += `  <div id="menu">`

  enteteindex += `    <div class="boutons-ingredients-recherche-angle-up-liste">`
  enteteindex += `      <div class="ingredients-recherche-angle-up-liste">`
  enteteindex += `        <div class="buttonsIngredientsRecherches"></div>`
  enteteindex += `        <div class="ingredients-recherche-angle-up">`
  enteteindex += `          <input type="search" id="ingredients-recherche" name="ingredients-recherche" placeholder="Rechercher un ingrédient" minlength="3" style="display: none;">`
  enteteindex += `          <button class="fa fa-angle-up" style="display: none"></button>`
  enteteindex += `        </div>`
  enteteindex += `        <div class="tableau-des-ingredients"></div>`
  enteteindex += `      </div>`
  enteteindex += `      <button tabindex="0" id="ingredients" class="bouton"><p class="valeurIngredients"> Ingrédients <em class="fa fa-angle-down"></em></p></button>`
  enteteindex += `    </div>`

  enteteindex += `    <div class="boutons-appareils-recherche-angle-up-liste">`
  enteteindex += `      <div class="appareils-recherche-angle-up-liste">`
  enteteindex += `        <div class="buttonsAppareilsRecherches"></div>`
  enteteindex += `        <div class="appareils-recherche-angle-up">`
  enteteindex += `          <input type="search" id="appareils-recherche" name="appareils-recherche" placeholder="Rechercher un appareil" minlength="3" style="display: none;">`
  enteteindex += `          <button class="fa fa-angle-up" tabindex="0" style="display: none;"></button>`
  enteteindex += `        </div>`
  enteteindex += `        <div class="tableau-des-appareils"></div>`
  enteteindex += `      </div>`
  enteteindex += `      <button tabindex="0" id="appareils" class="bouton"><p class="valeurAppareils"> Appareils <em class="fa fa-angle-down"></em></p></button>`
  enteteindex += `    </div>`

  enteteindex += `    <div class="boutons-ustensiles-recherche-angle-up-liste">`
  enteteindex += `      <div class="ustensiles-recherche-angle-up-liste">`
  enteteindex += `        <div class="buttonsUstensilesRecherches"></div>`
  enteteindex += `        <div class="ustensiles-recherche-angle-up">`
  enteteindex += `          <input type="search" id="ustensiles-recherche" name="ustensiles-recherche" placeholder="Rechercher un ustensile" minlength="3" style="display: none;">`
  enteteindex += `          <button class="fa fa-angle-up" tabindex="0" style="display: none;"></button>`
  enteteindex += `        </div>`
  enteteindex += `        <div class="tableau-des-ustensiles"></div>`
  enteteindex += `      </div>`
  enteteindex += `      <button tabindex="0" id="ustensiles" class="bouton"><p class="valeurUstensiles"> Ustensiles <em class="fa fa-angle-down"></em></p></button>`
  enteteindex += `    </div>`

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

// Fonction pour la barre de recherche principale
function barreDeRecherche() {
  //let loupe = document.querySelector("#loupe");
  let champDeRecherche = document.querySelector("#barre-de-recherche");
  //loupe.addEventListener("click", () =>
  champDeRecherche.addEventListener("keyup", () =>
    {
      if (champDeRecherche.value.length >= 3) {
        let elementsTrouves = [];
        for(let i = 0; i < recipes.length; i++) {
          let champDeRechercheEnMinuscules = champDeRecherche.value.toLowerCase();
          let NomRecetteActuelleEnMinuscules = recipes[i].name.toLowerCase();
          let DescriptionRecetteActuelleEnMinuscules = recipes[i].description.toLowerCase();

          // Recherche de la valeur dans le nom de la recette
          let resultatNom = NomRecetteActuelleEnMinuscules.includes(champDeRechercheEnMinuscules);
          if (resultatNom==true) {
            elementsTrouves.push(recipes[i]);
          }
          // Recherche de la valeur dans la description de la recette
          let resultatDescription = DescriptionRecetteActuelleEnMinuscules.includes(champDeRechercheEnMinuscules);
          if (resultatDescription==true) {
            elementsTrouves.push(recipes[i]);
          }
          // Recherche de la valeur dans les ingrédients de la recette
          let ingredientRecette = recipes[i].ingredients;
          for (j= 0; j < ingredientRecette.length; j++) {
            let NomIngredientRecetteActuelleEnMinuscules = ingredientRecette[j].ingredient.toLowerCase();
            let resultatIngredients = NomIngredientRecetteActuelleEnMinuscules.includes(champDeRechercheEnMinuscules);

            if (resultatIngredients==true) {
              elementsTrouves.push(recipes[i]);
            }
          }
        }
        let ElementsTrouvesSansDoublons = [...new Set(elementsTrouves)];

        if (ElementsTrouvesSansDoublons == "") {
          // Affichage du message d'erreur sous le champ "Rechercher une recette"
          document.querySelector("#messageErreurRecherche").innerHTML = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc";
          // Contour de couleur bleue du champ "Rechercher une recette"
          document.getElementById('barre-de-recherche').style.border="2px solid red";
        } else {
          document.querySelector("#messageErreurRecherche").innerHTML = "";
          // Contour de couleur bleue du champ "Rechercher une recette"
          document.getElementById('barre-de-recherche').style.border="0px solid red";
        }

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
          recetteLightBox += `        <h3 class="appareils-lightbox">Appareils : ${ElementsTrouvesSansDoublons[i].appliance}</h3>`
          recetteLightBox += `        <h3 class="ustensiles-lightbox">Ustensiles : ${ElementsTrouvesSansDoublons[i].ustensils}</h3>`
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

        listeIngredients(tableauRecettes = ElementsTrouvesSansDoublons);
        listeAppareils(tableauRecettes = ElementsTrouvesSansDoublons);
        listeUstensiles(tableauRecettes = ElementsTrouvesSansDoublons);
      } else {
        recette();
        listeIngredients();
        listeAppareils();
        listeUstensiles();
      }
    }
  )
}
barreDeRecherche();

// Fonction pour le clic sur la flèche du haut dans les champs de recherche des ingrédients, appareils et ustensiles
function clickFaAngleUp() {
  let faAngleUps = document.querySelectorAll(".fa-angle-up");
  faAngleUps.forEach((faAngleUp) => 
    faAngleUp.addEventListener("click", () =>
      {
        document.querySelector("#ingredients-recherche").style.display = "none";
        document.querySelector(".tableau-des-ingredients").style.display = "none";
        document.querySelector("#menu > div.boutons-ingredients-recherche-angle-up-liste > div > div.ingredients-recherche-angle-up > button").style.display = "none";
        document.querySelector("#ingredients").style.display = "block";

        document.querySelector("#appareils-recherche").style.display = "none";
        document.querySelector(".tableau-des-appareils").style.display = "none";
        document.querySelector("#menu > div.boutons-appareils-recherche-angle-up-liste > div > div.appareils-recherche-angle-up > button").style.display = "none";
        document.querySelector("#appareils").style.display = "block";

        document.querySelector("#ustensiles-recherche").style.display = "none";
        document.querySelector(".tableau-des-ustensiles").style.display = "none";
        document.querySelector("#menu > div.boutons-ustensiles-recherche-angle-up-liste > div > div.ustensiles-recherche-angle-up > button").style.display = "none";
        document.querySelector("#ustensiles").style.display = "block";

        //suppressionBoutonFiltreIngredient(tableauRecettes = recipes);
      }
    )
  )
}
clickFaAngleUp();

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
        /*let boutonIngredientASupprimer = document.createElement("button");
        boutonIngredientASupprimer.setAttribute("class", "bouton-ingredient-filtre");
        document.querySelector(".buttonsIngredientsRecherches").prepend(boutonIngredientASupprimer);*/

        // Masquage de la liste des ingrédients
        document.querySelector("#ingredients-recherche").style.display = "none";
        document.querySelector(".tableau-des-ingredients").style.display = "none";
        document.querySelector("#menu > div.boutons-ingredients-recherche-angle-up-liste > div > div.ingredients-recherche-angle-up > button").style.display = "none";
        document.querySelector("#ingredients").style.display = "block";

        // Lancement de la fonction suppressionBoutonFiltreIngredient() et suppressiion du bouton à supprimer
        /*suppressionBoutonFiltreIngredient(tableauRecettes = recipes);
        boutonIngredientASupprimer.click();*/


        //------------------------------------------------------------------------------------------------------------------------------------------//
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

        let elementsTrouves = [];
        // Si aucun appareil et aucun ustensile sont sélectionnés, alors on reprend le tableau des 50 recettes
        if (document.querySelector(".buttonsAppareilsRecherches").children.length == 0 && document.querySelector(".buttonsUstensilesRecherches").children.length == 0) {
          tableauRecettes = recipes;
        // Sinon on reprend la liste des recettes affichée à l'écran
        } else {
          let titresRecettes = document.querySelectorAll(".nomRecette")
          titresRecettes.forEach((titreRecette) =>
            {
              for (let m = 0; m < tableauRecettes.length; m++){
                if (titreRecette.textContent == tableauRecettes[m].name ) {
                  elementsTrouves.push(tableauRecettes[m])
                }
              }
            }
          )
          tableauRecettes = elementsTrouves;
        }
        console.log(tableauRecettes);

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
        suppressionBoutonFiltreIngredient(tableauRecettes = recipes)        //------------------------------------------------------------------------------------------------------------------------------------------//

      }
    )
  )
}

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
  /*console.log(boutonsFiltreIngredients);*/
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

        console.log(tableauRecettes);

        tableauRecettes = recipes;

        // Si tous les ingrédients, appareils et ustensiles ont été supprimés, alors affichage de toutes les recettes
        if (document.querySelector(".buttonsIngredientsRecherches").children.length == 0 && document.querySelector(".buttonsAppareilsRecherches").children.length == 0 && document.querySelector(".buttonsUstensilesRecherches").children.length == 0 && document.querySelector("#barre-de-recherche").value == "") {
          recette();
        }

        if (document.querySelector(".buttonsIngredientsRecherches").children.length != 0) {
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

        if (document.querySelector(".buttonsAppareilsRecherches").children.length != 0) {
          // Sélection de tous les boutons des appareils filtrés sauf celui cliqué
          let boutonsAppareil = document.querySelectorAll(".bouton-appareil-filtre");
          boutonsAppareil.forEach((boutonAppareil) => 
            {
              // Sélection de tous les boutons dans la liste des appareils
              let BoutonAppareils = document.querySelectorAll(".tableau-appareils-filtres");
              BoutonAppareils.forEach((BoutonAppareil) =>
                {
                  // Si le nom de l'appareil dans le tableau des appareils est égal à celui du nom du bouton appareil filtré restant alors on injecte cet appareil dans "elementsTrouves"
                  if(BoutonAppareil.name == boutonAppareil.name) {
                    document.querySelector("#appareils-recherche").value = boutonAppareil.name;
                    let elementsTrouves = [];
                    let champDeRecherche = document.querySelector("#appareils-recherche");
                    for(let i = 0; i < tableauRecettes.length; i++) {
                      // Recherche de la valeur dans les appareils de la recette
                      let appareilRecette = tableauRecettes[i].appliance;
                      // Injection des recettes contenant l'appareil sélectionné dans le tableau "elementsTrouves"
                      if (appareilRecette == champDeRecherche.value) {
                        elementsTrouves.push(tableauRecettes[i]);
                      }
                    }

                    console.log(elementsTrouves);
                    //elementsTrouves = [...new Set(elementsTrouves)];

                    // Appel de la fonction listeDesRecettesIngredients() pour l'affichage des recettes restantes
                    listeDesRecettesAppareils(tableauRecettes = elementsTrouves);

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

        if (document.querySelector(".buttonsUstensilesRecherches").children.length != 0) {
          // Sélection de tous les boutons des ustensiles filtrés sauf celui cliqué
          let boutonsUstensile = document.querySelectorAll(".bouton-ustensile-filtre");
          boutonsUstensile.forEach((boutonUstensile) => 
            {
              // Sélection de tous les boutons dans la liste des ustensiles
              let BoutonUstensiles = document.querySelectorAll(".tableau-ustensiles-filtres");
              BoutonUstensiles.forEach((BoutonUstensile) =>
                {
                  // Si le nom de l'ustensile dans le tableau des ustensiles est égal à celui du nom du bouton ustensile filtré restant alors on injecte cet ustensile dans "elementsTrouves"
                  if(BoutonUstensile.name == boutonUstensile.name) {
                    document.querySelector("#ustensiles-recherche").value = boutonUstensile.name;
                    let elementsTrouves = [];
                    let champDeRecherche = document.querySelector("#ustensiles-recherche");
                    for(let i = 0; i < tableauRecettes.length; i++) {
                      // Recherche de la valeur dans les ustensiles de la recette
                      let ustensileRecette = tableauRecettes[i].ustensils;
                      for (j= 0; j < ustensileRecette.length; j++) {
                        let NomUstensileRecetteActuelle = ustensileRecette[j];
                        // Injection des recettes contenant l'ustensile sélectionné dans le tableau "elementsTrouves"
                        if (NomUstensileRecetteActuelle == champDeRecherche.value) {
                          elementsTrouves.push(tableauRecettes[i]);
                        }
                      }
                    }
                    console.log(elementsTrouves);
                    //elementsTrouves = [...new Set(elementsTrouves)];

                    // Appel de la fonction listeDesRecettesIngredients() pour l'affichage des recettes restantes
                    listeDesRecettesUstensiles(tableauRecettes = elementsTrouves);

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
      }
    )
  )
}

//-------------------------------------------------------------------------------------------------------------------------------------------//
// FONCTIONS POUR LES APPAREILS //
// Fonction pour la création de la liste des appareils
function listeAppareils(tableauRecettes = recipes) { 
  let appareils = document.querySelector("#appareils");
  appareils.addEventListener("click", () =>
    {
      document.querySelector("#appareils-recherche").value = "";
      document.querySelector(".tableau-des-appareils").innerHTML = "";

      // Création de la liste appareils
      let listeAppareilsRecettes = [];
      let AppareilsRecettes = document.querySelectorAll(".appareils-lightbox");
      //console.log(AppareilsRecettes);
      AppareilsRecettes.forEach((AppareilRecettes) =>
        {
          listeAppareilsRecettes.push(AppareilRecettes.getAttribute("name"));
        }
      )

      // Tri par ordre alphabétique des valeurs
      listeAppareilsRecettes.sort();
      // Supression des doublons du tableau "listeAppareilsRecettes"
      let listeDesAppareils = [...new Set(listeAppareilsRecettes)];

      for (let j = 0; j < listeDesAppareils.length; j++) {
        let tableauAppareilsFiltres = document.createElement("button");
        tableauAppareilsFiltres.setAttribute("class", "tableau-appareils-filtres");
        tableauAppareilsFiltres.setAttribute("name",listeDesAppareils[j]);
        document.querySelector(".tableau-des-appareils").appendChild(tableauAppareilsFiltres);
        tableauAppareilsFiltres.innerText = listeDesAppareils[j];
      }

      // Supression des boutons du tableau des appareils déjà sélectionnés
      let boutonsAppareilsFiltres = document.querySelectorAll(".bouton-appareil-filtre");
      boutonsAppareilsFiltres.forEach((boutonAppareilFiltre) =>
        {
          let boutonsAppareilsTableau = document.querySelectorAll(".tableau-appareils-filtres");
          boutonsAppareilsTableau.forEach((boutonAppareilTableau) =>
            {
                if (boutonAppareilTableau.name == boutonAppareilFiltre.name) {
                boutonAppareilTableau.remove();
              }
            }
          )
        }
      );


      document.querySelector("#appareils-recherche").style.display = "block";
      document.querySelector(".tableau-des-appareils").style.display = "block";
      document.querySelector("#menu > div.boutons-appareils-recherche-angle-up-liste > div > div.appareils-recherche-angle-up > button").style.display = "block";
      document.querySelector("#appareils").style.display = "none";

      document.querySelector("#ingredients-recherche").style.display = "none";
      document.querySelector(".tableau-des-ingredients").style.display = "none";
      document.querySelector("#menu > div.boutons-ingredients-recherche-angle-up-liste > div > div.ingredients-recherche-angle-up > button").style.display = "none";
      document.querySelector("#ingredients").style.display = "block";

      document.querySelector("#ustensiles-recherche").style.display = "none";
      document.querySelector(".tableau-des-ustensiles").style.display = "none";
      document.querySelector("#menu > div.boutons-ustensiles-recherche-angle-up-liste > div > div.ustensiles-recherche-angle-up > button").style.display = "none";
      document.querySelector("#ustensiles").style.display = "block";

      saisieAppareil();
      clicBoutonlisteAppareils();
    }
  )
}
listeAppareils();

// Fonction de création des boutons d'appareils sélectionnés et création d'un tableau des recettes restantes
function clicBoutonlisteAppareils(tableauRecettes = recipes) {
  let clicBoutonAppareils = document.querySelectorAll(".tableau-appareils-filtres");
  clicBoutonAppareils.forEach((clicBoutonAppareil) =>
    clicBoutonAppareil.addEventListener("click", () =>
      {
        document.querySelector("#appareils-recherche").value = clicBoutonAppareil.name;

        // Création du bouton de l'appareil choisi
        let boutonAppareilFiltre = document.createElement("button");
        boutonAppareilFiltre.setAttribute("class", "bouton-appareil-filtre");
        boutonAppareilFiltre.setAttribute("name", document.querySelector("#appareils-recherche").value);
        let croixAppareilFiltre = document.createElement("i");
        croixAppareilFiltre.setAttribute("class", "fa-regular fa-circle-xmark");
        document.querySelector(".buttonsAppareilsRecherches").prepend(boutonAppareilFiltre);
        boutonAppareilFiltre.textContent = document.querySelector("#appareils-recherche").value, croixAppareilFiltre;
        document.querySelector(".bouton-appareil-filtre").appendChild(croixAppareilFiltre);

        // Création d'un bouton à supprimer pour le lancement de la fonction suppressionBoutonFiltreAppareil()
        /*let boutonAppareilASupprimer = document.createElement("button");
        boutonAppareilASupprimer.setAttribute("class", "bouton-appareil-filtre");
        document.querySelector(".buttonsAppareilsRecherches").prepend(boutonAppareilASupprimer);*/

        // Masquage de la liste des appareils
        document.querySelector("#appareils-recherche").style.display = "none";
        document.querySelector(".tableau-des-appareils").style.display = "none";
        document.querySelector("#menu > div.boutons-appareils-recherche-angle-up-liste > div > div.appareils-recherche-angle-up > button").style.display = "none";
        document.querySelector("#appareils").style.display = "block";

        // Suppressiion du bouton à supprimer et lancement de la fonction suppressionBoutonFiltreAppareil()
        //suppressionBoutonFiltreAppareil(tableauRecettes = recipes);
        //boutonAppareilASupprimer.click();


        // Création du tableau de la liste des appareils
        document.querySelector("#appareils-recherche").value = "";
        document.querySelector(".tableau-des-appareils").innerHTML = "";
        let listeAppareilsRecettes = [];
        for (let i = 0; i < tableauRecettes.length; i++) {
          let appareilRecette = tableauRecettes[i].appliance;
          //for (j= 0; j < appareilRecette.length; j++) {
            listeAppareilsRecettes.push(appareilRecette);
          //}
        }
        // Tri par ordre alphabétique des appareils
        listeAppareilsRecettes.sort();
        // Supression des doublons du tableau "listeAppareilsRecettes"
        let listeDesAppareils = [...new Set(listeAppareilsRecettes)];
        // Création de l'affichage de la liste des appareils
        for (let l = 0; l <listeDesAppareils.length; l++) {
          let tableauAppareilsFiltres = document.createElement("button");
          tableauAppareilsFiltres.setAttribute("class", "tableau-appareils-filtres");
          tableauAppareilsFiltres.setAttribute("name", listeDesAppareils[l]);
          document.querySelector(".tableau-des-appareils").appendChild(tableauAppareilsFiltres);
          tableauAppareilsFiltres.innerText = listeDesAppareils[l];
        }

        //tableauRecettes = recipes;
        let elementsTrouves = [];
        // Si aucun ingrédient et aucun ustensile sont sélectionnés, alors on reprend le tableau des 50 recettes
        if (document.querySelector(".buttonsIngredientsRecherches").children.length == 0 && document.querySelector(".buttonsUstensilesRecherches").children.length == 0) {
          tableauRecettes = recipes;
        } else {
          let titresRecettes = document.querySelectorAll(".nomRecette")
          titresRecettes.forEach((titreRecette) =>
            {
              for (let m = 0; m < tableauRecettes.length; m++){
                if (titreRecette.textContent == tableauRecettes[m].name ) {
                  elementsTrouves.push(tableauRecettes[m])
                }
              }
            }
          )
          tableauRecettes = elementsTrouves;
        }
        console.log(tableauRecettes);

        // Si tous les appareils ont été supprimés, alors affichage de toutes les recettes
        if (document.querySelector(".buttonsAppareilsRecherches").children.length == 0) {
          recette();
        }
        // Sélection de tous les boutons des appareils filtrés sauf celui cliqué
        let boutonsAppareil = document.querySelectorAll(".bouton-appareil-filtre");
        boutonsAppareil.forEach((boutonAppareil) => 
          {
            // Sélection de tous les boutons dans la liste des appareils
            let BoutonAppareils = document.querySelectorAll(".tableau-appareils-filtres");
            BoutonAppareils.forEach((BoutonAppareil) =>
              {
                // Si le nom de l'appareil dans le tableau des appareils est égal à celui du nom du bouton appareil filtré restant alors on injecte cet appareil dans "elementsTrouves"
                if(BoutonAppareil.name == boutonAppareil.name) {
                  document.querySelector("#appareils-recherche").value = boutonAppareil.name;
                  let elementsTrouves = [];
                  let champDeRecherche = document.querySelector("#appareils-recherche");
                  for(let i = 0; i < tableauRecettes.length; i++) {
                    // Recherche de la valeur dans les appareils de la recette
                    let appareilRecette = tableauRecettes[i].appliance;
                    // Injection des recettes contenant l'appareil sélectionné dans le tableau "elementsTrouves"
                    if (appareilRecette == champDeRecherche.value) {
                      elementsTrouves.push(tableauRecettes[i]);
                    }
                  }
                  // Appel de la fonction listeDesRecettesAppareils() pour l'affichage des recettes restantes
                  listeDesRecettesAppareils(tableauRecettes = elementsTrouves);

                  // Simulation d'un clic sur la flèche vers le haut dans le champs de recherche d'un appareil
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
        suppressionBoutonFiltreAppareil(tableauRecettes = recipes);      
      }
    )
  )
}

// Fonction de recherche d'un appareil par saisie dans le champ "Rechercher un appareil"
function saisieAppareil() {
  let listeTableauAppareils = [];
  let clicBoutonAppareils = document.querySelectorAll(".tableau-appareils-filtres");
  clicBoutonAppareils.forEach((clicBoutonAppareil) =>
    {
      // Recherche des appareils par saisie d'un valeur supérieure ou égale à trois caractères dans le champ de recherche
      let champDeRechercheAppareils = document.querySelector("#appareils-recherche");
      champDeRechercheAppareils.addEventListener("keyup", () =>
        {
          if (champDeRechercheAppareils.value.length >= 3) {
            listeTableauAppareils.push(clicBoutonAppareil.name);
            document.querySelector(".tableau-des-appareils").innerHTML = "";
            let appareilsTrouves = [];

            for(let i = 0; i < listeTableauAppareils.length; i++) {
              let champDeRechercheEnMinuscules = champDeRechercheAppareils.value.toLowerCase();
              let resultatAppareils = listeTableauAppareils[i].toLowerCase().includes(champDeRechercheEnMinuscules);
              if (resultatAppareils==true) {
                appareilsTrouves.push(listeTableauAppareils[i]);
              }
            }
            // Supression des doublons du tableau "appareilsTrouves"
            appareilsTrouves = [...new Set(appareilsTrouves)];

            for (let j = 0; j < appareilsTrouves.length; j++) {
              let tableauAppareilsFiltres = document.createElement("button");
              tableauAppareilsFiltres.setAttribute("class", "tableau-appareils-filtres");
              tableauAppareilsFiltres.setAttribute("name", appareilsTrouves[j]);

              document.querySelector(".tableau-des-appareils").appendChild(tableauAppareilsFiltres);
              tableauAppareilsFiltres.innerText = appareilsTrouves[j];
            }
          } 
          else 
          {
            document.querySelector(".tableau-des-appareils").innerHTML = "";
            // Création de la liste appareils
            let listeAppareilsRecettes = [];
            let AppareilsRecettes = document.querySelectorAll(".appareilRecette");
            AppareilsRecettes.forEach((AppareilRecettes) =>
              {
                listeAppareilsRecettes.push(AppareilRecettes.getAttribute("name"));          
              }
            )

            // Tri par ordre alphabétique des valeurs
            listeAppareilsRecettes.sort();
            // Supression des doublons du tableau "listeAppareilsRecettes"
            let listeDesAppareils = [...new Set(listeAppareilsRecettes)];

            for (let j = 0; j < listeDesAppareils.length; j++) {
              let tableauAppareilsFiltres = document.createElement("button");
              tableauAppareilsFiltres.setAttribute("class", "tableau-appareils-filtres");
              tableauAppareilsFiltres.setAttribute("name",listeDesAppareils[j]);
              document.querySelector(".tableau-des-appareils").appendChild(tableauAppareilsFiltres);

              tableauAppareilsFiltres.innerText = listeDesAppareils[j];
            }

            // Supression des boutons du tableau des appareils déjà sélectionnés
            let boutonsAppareilsFiltres = document.querySelectorAll(".bouton-appareil-filtre");
            boutonsAppareilsFiltres.forEach((boutonAppareilFiltre) =>
              {
                //console.log(boutonAppareilFiltre.name);
                let boutonsAppareilsTableau = document.querySelectorAll(".tableau-appareils-filtres");
                boutonsAppareilsTableau.forEach((boutonAppareilTableau) =>
                  {
                      if (boutonAppareilTableau.name == boutonAppareilFiltre.name) {
                      boutonAppareilTableau.remove();
                    }
                  }
                )
              }
            )
          }
          clicBoutonlisteAppareils(tableauRecettes = recipes);
        }
      )
    }
  )
}

// Fonction d'affichage des recettes restantes suite à la sélection d'appareils
function listeDesRecettesAppareils(tableauRecettes = recipes) {
  let elementsTrouves = [];
  let listeBoutonsAppareil = document.querySelectorAll(".bouton-appareil-filtre");
  listeBoutonsAppareil.forEach((boutonAppareil) => 
    {
      for (let i = 0; i < tableauRecettes.length; i++) {
        let appareilRecette = tableauRecettes[i].appliance;
        for (j= 0; j < appareilRecette.length; j++) {
          if (appareilRecette == boutonAppareil.name) {
            elementsTrouves.push(tableauRecettes[i]);
          }
        }
      }
    }
  )
  let ElementsTrouvesSansDoublons = [...new Set(elementsTrouves)];
  //console.log(ElementsTrouvesSansDoublons);

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

// fonction de suppression d'un appareil sélectionné
function suppressionBoutonFiltreAppareil(tableauRecettes = recipes) {
  let boutonsFiltreAppareils = document.querySelectorAll(".bouton-appareil-filtre");
  boutonsFiltreAppareils.forEach((boutonFiltreAppareil) =>
    boutonFiltreAppareil.addEventListener("click", () =>
      {
        // Suppression du bouton de l'appareil cliqué
        boutonFiltreAppareil.remove();

        // Création du tableau de la liste des appareils
        document.querySelector("#appareils-recherche").value = "";
        document.querySelector(".tableau-des-appareils").innerHTML = "";
        let listeAppareilsRecettes = [];
        for (let i = 0; i < tableauRecettes.length; i++) {
          let appareilRecette = tableauRecettes[i].appliance;
          //for (j= 0; j < appareilRecette.length; j++) {
            listeAppareilsRecettes.push(appareilRecette);
          //}
        }
        // Tri par ordre alphabétique des appareils
        listeAppareilsRecettes.sort();
        // Supression des doublons du tableau "listeAppareilsRecettes"
        let listeDesAppareils = [...new Set(listeAppareilsRecettes)];
        // Création de l'affichage de la liste des appareils
        for (let l = 0; l <listeDesAppareils.length; l++) {
          let tableauAppareilsFiltres = document.createElement("button");
          tableauAppareilsFiltres.setAttribute("class", "tableau-appareils-filtres");
          tableauAppareilsFiltres.setAttribute("name", listeDesAppareils[l]);
          document.querySelector(".tableau-des-appareils").appendChild(tableauAppareilsFiltres);
          tableauAppareilsFiltres.innerText = listeDesAppareils[l];
        }

        console.log(tableauRecettes);

        tableauRecettes = recipes;

        // Si tous les ingrédients, appareils et ustensiles ont été supprimés, alors affichage de toutes les recettes
        if (document.querySelector(".buttonsIngredientsRecherches").children.length == 0 && document.querySelector(".buttonsAppareilsRecherches").children.length == 0 && document.querySelector(".buttonsUstensilesRecherches").children.length == 0 && document.querySelector("#barre-de-recherche").value == "") {
          recette();
        }

        if (document.querySelector(".buttonsIngredientsRecherches").children.length != 0) {
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

        if (document.querySelector(".buttonsAppareilsRecherches").children.length != 0) {
          // Sélection de tous les boutons des appareils filtrés sauf celui cliqué
          let boutonsAppareil = document.querySelectorAll(".bouton-appareil-filtre");
          boutonsAppareil.forEach((boutonAppareil) => 
            {
              // Sélection de tous les boutons dans la liste des appareils
              let BoutonAppareils = document.querySelectorAll(".tableau-appareils-filtres");
              BoutonAppareils.forEach((BoutonAppareil) =>
                {
                  // Si le nom de l'appareil dans le tableau des appareils est égal à celui du nom du bouton appareil filtré restant alors on injecte cet appareil dans "elementsTrouves"
                  if(BoutonAppareil.name == boutonAppareil.name) {
                    document.querySelector("#appareils-recherche").value = boutonAppareil.name;
                    let elementsTrouves = [];
                    let champDeRecherche = document.querySelector("#appareils-recherche");
                    for(let i = 0; i < tableauRecettes.length; i++) {
                      // Recherche de la valeur dans les appareils de la recette
                      let appareilRecette = tableauRecettes[i].appliance;
                      // Injection des recettes contenant l'appareil sélectionné dans le tableau "elementsTrouves"
                      if (appareilRecette == champDeRecherche.value) {
                        elementsTrouves.push(tableauRecettes[i]);
                      }
                    }

                    console.log(elementsTrouves);
                    //elementsTrouves = [...new Set(elementsTrouves)];

                    // Appel de la fonction listeDesRecettesIngredients() pour l'affichage des recettes restantes
                    listeDesRecettesAppareils(tableauRecettes = elementsTrouves);

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

        if (document.querySelector(".buttonsUstensilesRecherches").children.length != 0) {
          // Sélection de tous les boutons des ustensiles filtrés sauf celui cliqué
          let boutonsUstensile = document.querySelectorAll(".bouton-ustensile-filtre");
          boutonsUstensile.forEach((boutonUstensile) => 
            {
              // Sélection de tous les boutons dans la liste des ustensiles
              let BoutonUstensiles = document.querySelectorAll(".tableau-ustensiles-filtres");
              BoutonUstensiles.forEach((BoutonUstensile) =>
                {
                  // Si le nom de l'ustensile dans le tableau des ustensiles est égal à celui du nom du bouton ustensile filtré restant alors on injecte cet ustensile dans "elementsTrouves"
                  if(BoutonUstensile.name == boutonUstensile.name) {
                    document.querySelector("#ustensiles-recherche").value = boutonUstensile.name;
                    let elementsTrouves = [];
                    let champDeRecherche = document.querySelector("#ustensiles-recherche");
                    for(let i = 0; i < tableauRecettes.length; i++) {
                      // Recherche de la valeur dans les ustensiles de la recette
                      let ustensileRecette = tableauRecettes[i].ustensils;
                      for (j= 0; j < ustensileRecette.length; j++) {
                        let NomUstensileRecetteActuelle = ustensileRecette[j];
                        // Injection des recettes contenant l'ustensile sélectionné dans le tableau "elementsTrouves"
                        if (NomUstensileRecetteActuelle == champDeRecherche.value) {
                          elementsTrouves.push(tableauRecettes[i]);
                        }
                      }
                    }
                    console.log(elementsTrouves);
                    //elementsTrouves = [...new Set(elementsTrouves)];

                    // Appel de la fonction listeDesRecettesIngredients() pour l'affichage des recettes restantes
                    listeDesRecettesUstensiles(tableauRecettes = elementsTrouves);

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
      }
    )
  )
}

//-------------------------------------------------------------------------------------------------------------------------------------------//
// FONCTIONS POUR LES USTENSILES //
// Fonction pour la création de la liste des ustensiles
function listeUstensiles(tableauRecettes = recipes) { 
  let ustensiles = document.querySelector("#ustensiles");
  ustensiles.addEventListener("click", () =>
    {
      document.querySelector("#ustensiles-recherche").value = "";
      document.querySelector(".tableau-des-ustensiles").innerHTML = "";

      // Création de la liste ustensiles
      //let listeUstensilesRecettes = [];
      let listeUstensilesRecettes1 = [];
      let UstensilesRecettes = document.querySelectorAll(".ustensiles-lightbox");
      UstensilesRecettes.forEach((UstensileRecettes) =>
        {
          //console.log("UstensileRecettes ça marche");
          //console.log(UstensileRecettes.getAttribute("name"));
          listeUstensilesRecettes1.push(UstensileRecettes.getAttribute("name").split(','));
          //console.log(listeUstensilesRecettes);
        }
      )

      let listeUstensilesRecettes = []
      let listeUstensilesRecettes2 = "";

      console.log(listeUstensilesRecettes1);
      for (let k = 0; listeUstensilesRecettes1.length; k++) {
        let y = listeUstensilesRecettes1[k];
        //console.log(y);

        if (y != undefined) {
          for(let i = 0; i < y.length; i++) {
            listeUstensilesRecettes.push(y[i]);
          }
        } else {
          break;
        }
        listeUstensilesRecettes2 = [...new Set(listeUstensilesRecettes)];
        listeUstensilesRecettes2.sort();

        //console.log(listeUstensilesRecettes2);
      }

      // Tri par ordre alphabétique des valeurs
      listeUstensilesRecettes2.sort();
      // Supression des doublons du tableau "listeUstensilesRecettes"
      let listeDesUstensiles = [...new Set(listeUstensilesRecettes2)];
      //console.log(listeDesUstensiles);


      for (let j = 0; j < listeDesUstensiles.length; j++) {
        let tableauUstensilesFiltres = document.createElement("button");
        tableauUstensilesFiltres.setAttribute("class", "tableau-ustensiles-filtres");
        tableauUstensilesFiltres.setAttribute("name",listeDesUstensiles[j]);
        document.querySelector(".tableau-des-ustensiles").appendChild(tableauUstensilesFiltres);

        tableauUstensilesFiltres.innerText = listeDesUstensiles[j];
      }

      // Supression des boutons du tableau des ustensile déjà sélectionnés
      let boutonsUstensilesFiltres = document.querySelectorAll(".bouton-ustensile-filtre");
      boutonsUstensilesFiltres.forEach((boutonUstensileFiltre) =>
        {
          //console.log(boutonUstensileFiltre.name);
          let boutonsUstensilesTableau = document.querySelectorAll(".tableau-ustensiles-filtres");
          boutonsUstensilesTableau.forEach((boutonUstensileTableau) =>
            {
              //console.log(boutonUstensileTableau.getAttribute("name"));
                if (boutonUstensileTableau.name == boutonUstensileFiltre.name) {
                //console.log(boutonUstensileTableau.name);
                boutonUstensileTableau.remove();
              }
            }
          )
        }
      );

      document.querySelector("#ustensiles-recherche").style.display = "block";
      document.querySelector(".tableau-des-ustensiles").style.display = "block";
      document.querySelector("#menu > div.boutons-ustensiles-recherche-angle-up-liste > div > div.ustensiles-recherche-angle-up > button").style.display = "block";
      document.querySelector("#ustensiles").style.display = "none";

      document.querySelector("#appareils-recherche").style.display = "none";
      document.querySelector(".tableau-des-appareils").style.display = "none";
      document.querySelector("#menu > div.boutons-appareils-recherche-angle-up-liste > div > div.appareils-recherche-angle-up > button").style.display = "none";
      document.querySelector("#appareils").style.display = "block";

      document.querySelector("#ingredients-recherche").style.display = "none";
      document.querySelector(".tableau-des-ingredients").style.display = "none";
      document.querySelector("#menu > div.boutons-ingredients-recherche-angle-up-liste > div > div.ingredients-recherche-angle-up > button").style.display = "none";
      document.querySelector("#ingredients").style.display = "block";

      saisieUstensile();
      clicBoutonlisteUstensiles();
    }
  )
}
listeUstensiles();

// Fonction de création des boutons d'ustensiles sélectionnés et création d'un tableau des recettes restantes
function clicBoutonlisteUstensiles(tableauRecettes = recipes) {
  let clicBoutonUstensiles = document.querySelectorAll(".tableau-ustensiles-filtres");
  clicBoutonUstensiles.forEach((clicBoutonUstensile) =>
    clicBoutonUstensile.addEventListener("click", () =>
      {
        document.querySelector("#ustensiles-recherche").value = clicBoutonUstensile.name;

        // Création du bouton de l'ustensile choisi
        let boutonUstensileFiltre = document.createElement("button");
        boutonUstensileFiltre.setAttribute("class", "bouton-ustensile-filtre");
        boutonUstensileFiltre.setAttribute("name", document.querySelector("#ustensiles-recherche").value);
        let croixUstensileFiltre = document.createElement("i");
        croixUstensileFiltre.setAttribute("class", "fa-regular fa-circle-xmark");
        document.querySelector(".buttonsUstensilesRecherches").prepend(boutonUstensileFiltre);
        boutonUstensileFiltre.textContent = document.querySelector("#ustensiles-recherche").value, croixUstensileFiltre;
        document.querySelector(".bouton-ustensile-filtre").appendChild(croixUstensileFiltre);

        // Création d'un bouton à supprimer pour le lancement de la fonction suppressionBoutonFiltreUstensile()
        /*let boutonUstensileASupprimer = document.createElement("button");
        boutonUstensileASupprimer.setAttribute("class", "bouton-ustensile-filtre");
        document.querySelector(".buttonsUstensilesRecherches").prepend(boutonUstensileASupprimer);*/

        // Masquage de la liste des ustensiles
        document.querySelector("#ustensiles-recherche").style.display = "none";
        document.querySelector(".tableau-des-ustensiles").style.display = "none";
        document.querySelector("#menu > div.boutons-ustensiles-recherche-angle-up-liste > div > div.ustensiles-recherche-angle-up > button").style.display = "none";
        document.querySelector("#ustensiles").style.display = "block";

        // Suppressiion du bouton à supprimer et lancement de la fonction suppressionBoutonFiltreUstensile()
        //suppressionBoutonFiltreUstensile(tableauRecettes = recipes);
        //boutonUstensileASupprimer.click();

        // Création du tableau de la liste des ustensiles
        document.querySelector("#ustensiles-recherche").value = "";
        document.querySelector(".tableau-des-ustensiles").innerHTML = "";
        let listeUstensilesRecettes = [];
        for (let i = 0; i < tableauRecettes.length; i++) {
          let ustensileRecette = tableauRecettes[i].ustensils;
          for (j= 0; j < ustensileRecette.length; j++) {
            listeUstensilesRecettes.push(ustensileRecette[j]);
          }
        }
        // Tri par ordre alphabétique des ustensiles
        listeUstensilesRecettes.sort();
        // Supression des doublons du tableau "listeUstensilesRecettes"
        let listeDesUstensiles = [...new Set(listeUstensilesRecettes)];
        console.log(listeDesUstensiles);
        // Création de l'affichage de la liste des ustensiles
        for (let l = 0; l <listeDesUstensiles.length; l++) {
          let tableauUstensilesFiltres = document.createElement("button");
          tableauUstensilesFiltres.setAttribute("class", "tableau-ustensiles-filtres");
          tableauUstensilesFiltres.setAttribute("name", listeDesUstensiles[l]);
          document.querySelector(".tableau-des-ustensiles").appendChild(tableauUstensilesFiltres);
          tableauUstensilesFiltres.innerText = listeDesUstensiles[l];
        }

        //tableauRecettes = recipes;
        let elementsTrouves = [];
        // Si aucun ingrédient et aucun appareil sont sélectionnés, alors on reprend le tableau des 50 recettes
        if (document.querySelector(".buttonsIngredientsRecherches").children.length == 0 && document.querySelector(".buttonsAppareilsRecherches").children.length == 0) {
          tableauRecettes = recipes;
        } else {
          let titresRecettes = document.querySelectorAll(".nomRecette")
          titresRecettes.forEach((titreRecette) =>
            {
              for (let m = 0; m < tableauRecettes.length; m++){
                if (titreRecette.textContent == tableauRecettes[m].name ) {
                  elementsTrouves.push(tableauRecettes[m])
                }
              }
            }
          )
          tableauRecettes = elementsTrouves;
        }
        console.log(tableauRecettes);

        // Si tous les ustensiles ont été supprimés, alors affichage de toutes les recettes
        if (document.querySelector(".buttonsUstensilesRecherches").children.length == 0) {
          recette();
        }
        // Sélection de tous les boutons des ustensiles filtrés sauf celui cliqué
        let boutonsUstensile = document.querySelectorAll(".bouton-ustensile-filtre");
        boutonsUstensile.forEach((boutonUstensile) => 
          {
            // Sélection de tous les boutons dans la liste des ustensiles
            let BoutonUstensiles = document.querySelectorAll(".tableau-ustensiles-filtres");
            BoutonUstensiles.forEach((BoutonUstensile) =>
              {
                // Si le nom de l'ustensile dans le tableau des ustensiles est égal à celui du nom du bouton ustensile filtré restant alors on injecte cet ustensile dans "elementsTrouves"
                if(BoutonUstensile.name == boutonUstensile.name) {
                  document.querySelector("#ustensiles-recherche").value = boutonUstensile.name;
                  let elementsTrouves = [];
                  let champDeRecherche = document.querySelector("#ustensiles-recherche");
                  for(let i = 0; i < tableauRecettes.length; i++) {
                    // Recherche de la valeur dans les ustensiles de la recette
                    let ustensileRecette = tableauRecettes[i].ustensils;
                    for (j= 0; j < ustensileRecette.length; j++) {
                      let NomUstensileRecetteActuelle = ustensileRecette[j];
                      // Injection des recettes contenant l'ustensile sélectionné dans le tableau "elementsTrouves"
                      if (NomUstensileRecetteActuelle == champDeRecherche.value) {
                        elementsTrouves.push(tableauRecettes[i]);
                      }
                    }
                  }
                  console.log(elementsTrouves);
                  //elementsTrouves = [...new Set(elementsTrouves)];

                  // Appel de la fonction listeDesRecettesUstensiles() pour l'affichage des recettes restantes
                  listeDesRecettesUstensiles(tableauRecettes = elementsTrouves);

                  // Simulation d'un clic sur la flèche vers le haut dans le champs de recherche d'un ustensile
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
        suppressionBoutonFiltreUstensile(tableauRecettes = recipes);
      }
    )
  )
}

// Fonction de recherche d'un ustensile par saisie dans le champ "Rechercher un ustensile"
function saisieUstensile() {
  let listeTableauUstensiles = [];
  let clicBoutonUstensiles = document.querySelectorAll(".tableau-ustensiles-filtres");
  clicBoutonUstensiles.forEach((clicBoutonUstensile) =>
    {
      // Recherche des ustensiles par saisie d'un valeur supérieure ou égale à trois caractères dans le champ de recherche
      let champDeRechercheUstensiles = document.querySelector("#ustensiles-recherche");
      champDeRechercheUstensiles.addEventListener("keyup", () =>
        {
          if (champDeRechercheUstensiles.value.length >= 3) {
            listeTableauUstensiles.push(clicBoutonUstensile.name);
            document.querySelector(".tableau-des-ustensiles").innerHTML = "";
            let ustensilesTrouves = [];

            for (let i = 0; i < listeTableauUstensiles.length; i++) {
              let champDeRechercheEnMinuscules = champDeRechercheUstensiles.value.toLowerCase();
              let resultatUstensiles = listeTableauUstensiles[i].toLowerCase().includes(champDeRechercheEnMinuscules);
              if (resultatUstensiles==true) {
                ustensilesTrouves.push(listeTableauUstensiles[i]);
              }
            }
            // Supression des doublons du tableau "ustensilesTrouves"
            ustensilesTrouves = [...new Set(ustensilesTrouves)];

            for (let j = 0; j < ustensilesTrouves.length; j++) {
              let tableauUstensilesFiltres = document.createElement("button");
              tableauUstensilesFiltres.setAttribute("class", "tableau-ustensiles-filtres");
              tableauUstensilesFiltres.setAttribute("name", ustensilesTrouves[j]);
              document.querySelector(".tableau-des-ustensiles").appendChild(tableauUstensilesFiltres);
              tableauUstensilesFiltres.innerText = ustensilesTrouves[j];
            }
          } else {
            document.querySelector(".tableau-des-ustensiles").innerHTML = "";
            // Création de la liste ustensiles
            let listeUstensilesRecettes = [];
            let listeUstensilesRecettes1 = [];
            let UstensilesRecettes = document.querySelectorAll(".ustensiles-lightbox");
            UstensilesRecettes.forEach((UstensileRecettes) =>
              {
                listeUstensilesRecettes.push(UstensileRecettes.getAttribute("name").split(','));          
              }
            )

            for (let k = 0; listeUstensilesRecettes.length; k++) {
              let y = listeUstensilesRecettes[k];
              console.log(y);
      
              if (y != undefined) {
                for(let i = 0; i < y.length; i++) {
                  listeUstensilesRecettes1.push(y[i]);
                }
              } else {
                break;
              }
            }

            // Tri par ordre alphabétique des valeurs
            listeUstensilesRecettes1.sort();
            // Supression des doublons du tableau "listeUstensilesRecettes"
            let listeDesUstensiles = [...new Set(listeUstensilesRecettes1)];
            console.log(listeDesUstensiles);

            for (let j = 0; j < listeDesUstensiles.length; j++) {
              let tableauUstensilesFiltres = document.createElement("button");
              tableauUstensilesFiltres.setAttribute("class", "tableau-ustensiles-filtres");
              tableauUstensilesFiltres.setAttribute("name",listeDesUstensiles[j]);
              document.querySelector(".tableau-des-ustensiles").appendChild(tableauUstensilesFiltres);
              tableauUstensilesFiltres.innerText = listeDesUstensiles[j];
            }

            // Supression des boutons du tableau des ustensiles déjà sélectionnés
            let boutonsUstensilesFiltres = document.querySelectorAll(".bouton-ustensile-filtre");
            boutonsUstensilesFiltres.forEach((boutonUstensileFiltre) =>
              {
                let boutonsUstensilesTableau = document.querySelectorAll(".tableau-ustensiles-filtres");
                boutonsUstensilesTableau.forEach((boutonUstensileTableau) =>
                  {
                      if (boutonUstensileTableau.name == boutonUstensileFiltre.name) {
                      boutonUstensileTableau.remove();
                    }
                  }
                )
              }
            )
          }
          clicBoutonlisteUstensiles(tableauRecettes = recipes);
        }
      )
    }
  )
}

// Fonction d'affichage des recettes restantes suite à la sélection d'ustensiles
function listeDesRecettesUstensiles(tableauRecettes = recipes) {
  let elementsTrouves = [];
  let listeBoutonsUstensile = document.querySelectorAll(".bouton-ustensile-filtre");
  listeBoutonsUstensile.forEach((boutonUstensile) => 
    {
      for (let i = 0; i < tableauRecettes.length; i++) {
        let ustensileRecette = tableauRecettes[i].ustensils;
        for (j= 0; j < ustensileRecette.length; j++) {
          if (ustensileRecette[j] == boutonUstensile.name) {
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

// fonction de suppression d'un ustensile sélectionné
function suppressionBoutonFiltreUstensile(tableauRecettes = recipes) {
  let boutonsFiltreUstensiles = document.querySelectorAll(".bouton-ustensile-filtre");
  boutonsFiltreUstensiles.forEach((boutonFiltreUstensile) =>
    boutonFiltreUstensile.addEventListener("click", () =>
      {
        // Suppression du bouton de l'ustensile cliqué
        boutonFiltreUstensile.remove();

        // Création du tableau de la liste des ustensiles
        document.querySelector("#ustensiles-recherche").value = "";
        document.querySelector(".tableau-des-ustensiles").innerHTML = "";
        let listeUstensilesRecettes = [];
        for (let i = 0; i < tableauRecettes.length; i++) {
          let ustensileRecette = tableauRecettes[i].ustensils;
          for (j= 0; j < ustensileRecette.length; j++) {
            listeUstensilesRecettes.push(ustensileRecette[j]);
          }
        }
        // Tri par ordre alphabétique des ustensiles
        listeUstensilesRecettes.sort();
        // Supression des doublons du tableau "listeUstensilesRecettes"
        let listeDesUstensiles = [...new Set(listeUstensilesRecettes)];
        console.log(listeDesUstensiles);
        // Création de l'affichage de la liste des ustensiles
        for (let l = 0; l <listeDesUstensiles.length; l++) {
          let tableauUstensilesFiltres = document.createElement("button");
          tableauUstensilesFiltres.setAttribute("class", "tableau-ustensiles-filtres");
          tableauUstensilesFiltres.setAttribute("name", listeDesUstensiles[l]);
          document.querySelector(".tableau-des-ustensiles").appendChild(tableauUstensilesFiltres);
          tableauUstensilesFiltres.innerText = listeDesUstensiles[l];
        }

        console.log(tableauRecettes);

        tableauRecettes = recipes;

        // Si tous les ingrédients, appareils et ustensiles ont été supprimés, alors affichage de toutes les recettes
        if (document.querySelector(".buttonsIngredientsRecherches").children.length == 0 && document.querySelector(".buttonsAppareilsRecherches").children.length == 0 && document.querySelector(".buttonsUstensilesRecherches").children.length == 0 && document.querySelector("#barre-de-recherche").value == "") {
          recette();
        }

        if (document.querySelector(".buttonsIngredientsRecherches").children.length != 0) {
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

        if (document.querySelector(".buttonsAppareilsRecherches").children.length != 0) {
          // Sélection de tous les boutons des appareils filtrés sauf celui cliqué
          let boutonsAppareil = document.querySelectorAll(".bouton-appareil-filtre");
          boutonsAppareil.forEach((boutonAppareil) => 
            {
              // Sélection de tous les boutons dans la liste des appareils
              let BoutonAppareils = document.querySelectorAll(".tableau-appareils-filtres");
              BoutonAppareils.forEach((BoutonAppareil) =>
                {
                  // Si le nom de l'appareil dans le tableau des appareils est égal à celui du nom du bouton appareil filtré restant alors on injecte cet appareil dans "elementsTrouves"
                  if(BoutonAppareil.name == boutonAppareil.name) {
                    document.querySelector("#appareils-recherche").value = boutonAppareil.name;
                    let elementsTrouves = [];
                    let champDeRecherche = document.querySelector("#appareils-recherche");
                    for(let i = 0; i < tableauRecettes.length; i++) {
                      // Recherche de la valeur dans les appareils de la recette
                      let appareilRecette = tableauRecettes[i].appliance;
                      // Injection des recettes contenant l'appareil sélectionné dans le tableau "elementsTrouves"
                      if (appareilRecette == champDeRecherche.value) {
                        elementsTrouves.push(tableauRecettes[i]);
                      }
                    }

                    console.log(elementsTrouves);
                    //elementsTrouves = [...new Set(elementsTrouves)];

                    // Appel de la fonction listeDesRecettesIngredients() pour l'affichage des recettes restantes
                    listeDesRecettesAppareils(tableauRecettes = elementsTrouves);

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

        if (document.querySelector(".buttonsUstensilesRecherches").children.length != 0) {
          // Sélection de tous les boutons des ustensiles filtrés sauf celui cliqué
          let boutonsUstensile = document.querySelectorAll(".bouton-ustensile-filtre");
          boutonsUstensile.forEach((boutonUstensile) => 
            {
              // Sélection de tous les boutons dans la liste des ustensiles
              let BoutonUstensiles = document.querySelectorAll(".tableau-ustensiles-filtres");
              BoutonUstensiles.forEach((BoutonUstensile) =>
                {
                  // Si le nom de l'ustensile dans le tableau des ustensiles est égal à celui du nom du bouton ustensile filtré restant alors on injecte cet ustensile dans "elementsTrouves"
                  if(BoutonUstensile.name == boutonUstensile.name) {
                    document.querySelector("#ustensiles-recherche").value = boutonUstensile.name;
                    let elementsTrouves = [];
                    let champDeRecherche = document.querySelector("#ustensiles-recherche");
                    for(let i = 0; i < tableauRecettes.length; i++) {
                      // Recherche de la valeur dans les ustensiles de la recette
                      let ustensileRecette = tableauRecettes[i].ustensils;
                      for (j= 0; j < ustensileRecette.length; j++) {
                        let NomUstensileRecetteActuelle = ustensileRecette[j];
                        // Injection des recettes contenant l'ustensile sélectionné dans le tableau "elementsTrouves"
                        if (NomUstensileRecetteActuelle == champDeRecherche.value) {
                          elementsTrouves.push(tableauRecettes[i]);
                        }
                      }
                    }
                    console.log(elementsTrouves);
                    //elementsTrouves = [...new Set(elementsTrouves)];

                    // Appel de la fonction listeDesRecettesIngredients() pour l'affichage des recettes restantes
                    listeDesRecettesUstensiles(tableauRecettes = elementsTrouves);

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
      }
    )
  )
}
//-------------------------------------------------------------------------------------------------------------------------------------------//