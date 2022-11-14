console.log(recipes);

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
            console.log(champDeRechercheEnMinuscules,"est présent dans le nom de la recette :",NomRecetteActuelleEnMinuscules);
            console.log(recipes[i]);
            elementsTrouves.push(recipes[i]);
          }
          // Recherche de la valeur dans la description de la recette
          let resultatDescription = DescriptionRecetteActuelleEnMinuscules.includes(champDeRechercheEnMinuscules);
          if (resultatDescription==true) {
            console.log(champDeRechercheEnMinuscules,"est présent dans la description de la recette :",DescriptionRecetteActuelleEnMinuscules);
            console.log(recipes[i]);
            elementsTrouves.push(recipes[i]);
          }
          // Recherche de la valeur dans les ingrédients de la recette
          let ingredientRecette = recipes[i].ingredients;
          //console.log(ingredientRecette);
          for (j= 0; j < ingredientRecette.length; j++) {
            let NomIngredientRecetteActuelleEnMinuscules = ingredientRecette[j].ingredient.toLowerCase();
            let resultatIngredients = NomIngredientRecetteActuelleEnMinuscules.includes(champDeRechercheEnMinuscules);

            if (resultatIngredients==true) {
              console.log(champDeRechercheEnMinuscules,"est présent dans l'ingrédient de la recette' :",NomIngredientRecetteActuelleEnMinuscules);
              console.log(recipes[i]);
              elementsTrouves.push(recipes[i]);
            }
          }
        }
        let ElementsTrouvesSansDoublons = [...new Set(elementsTrouves)];
        console.log(ElementsTrouvesSansDoublons);

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
              listeRecette += `    <h3 class="ingredientRecette"> ${ingredientRecette[j].ingredient} : ${ingredientRecette[j].quantity} ${ingredientRecette[j].unit}</h3>`
            }
            if (ingredientRecette[j].ingredient != undefined && ingredientRecette[j].quantity != undefined && ingredientRecette[j].unit == undefined) {
              listeRecette += `    <h3 class="ingredientRecette"> ${ingredientRecette[j].ingredient} : ${ingredientRecette[j].quantity}</h3>`
            }
            if (ingredientRecette[j].ingredient != undefined && ingredientRecette[j].quantity == undefined && ingredientRecette[j].unit == undefined) {
              listeRecette += `    <h3 class="ingredientRecette"> ${ingredientRecette[j].ingredient}</h3>`
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

        //listeIngredients(tableauRecettes = recipes);
        //clicBoutonlisteIngredients(tableauRecettes = recipes);
        //listeDesRecettesIngredients(tableauRecettes = recipes);
        clicBoutonFiltreIngredient(tableauRecettes = recipes);

      }
    )
  )
}
clickFaAngleUp();

//-------------------------------------------------------------------------------------------------------------------------------------------//
// Fonction pour la création de la liste des ingrédients
function listeIngredients(tableauRecettes = recipes) { 
  let ingredients = document.querySelector("#ingredients");
  ingredients.addEventListener("click", () =>
    {
      document.querySelector("#ingredients-recherche").value = "";
      document.querySelector(".tableau-des-ingredients").innerHTML = "";
      let listeIngredientsRecettes = [];
      for (let i = 0; i < tableauRecettes.length; i++) {
        let ingredientRecette = tableauRecettes[i].ingredients;
        for (j= 0; j < ingredientRecette.length; j++) {
          listeIngredientsRecettes.push(ingredientRecette[j].ingredient);
        }
      }
      // Tri par ordre alphabétique des valeurs
      listeIngredientsRecettes.sort();
      // Supression des doublons du tableau "listeIngredientsRecettes"
      let listeDesIngredients = [...new Set(listeIngredientsRecettes)];
      console.log(listeDesIngredients);

      for (let j = 0; j < listeDesIngredients.length; j++) {
        let tableauIngredientsFiltres = document.createElement("button");
        tableauIngredientsFiltres.setAttribute("class", "tableau-ingredients-filtres");
        tableauIngredientsFiltres.setAttribute("name",listeDesIngredients[j]);
        document.querySelector(".tableau-des-ingredients").appendChild(tableauIngredientsFiltres);

        tableauIngredientsFiltres.innerText = listeDesIngredients[j];
      }

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
            console.log("champDeRechercheIngredients ça marche");
            listeTableauIngredients.push(clicBoutonIngredient.name);
            console.log("3 caractères minimum ça marche");
            document.querySelector(".tableau-des-ingredients").innerHTML = "";
            let ingredientsTrouves = [];

            for(let i = 0; i < listeTableauIngredients.length; i++) {
              let champDeRechercheEnMinuscules = champDeRechercheIngredients.value.toLowerCase();
              let resultatIngredients = listeTableauIngredients[i].toLowerCase().includes(champDeRechercheEnMinuscules);
              if (resultatIngredients==true) {
                ingredientsTrouves.push(listeTableauIngredients[i]);
              }
            }

            for (let j = 0; j < ingredientsTrouves.length; j++) {
              let tableauIngredientsFiltres = document.createElement("button");
              tableauIngredientsFiltres.setAttribute("class", "tableau-ingredients-filtres");
              tableauIngredientsFiltres.setAttribute("name", ingredientsTrouves[j].ingredient);
              document.querySelector(".tableau-des-ingredients").appendChild(tableauIngredientsFiltres);
              tableauIngredientsFiltres.innerText = ingredientsTrouves[j];
            }
            console.log(listeTableauIngredients);
          }
          clicBoutonlisteIngredients(tableauRecettes = recipes);
        }
      )
    }
  )
}

// Fonction de création des boutons d'ingrédients sélectionnés et création d'un tableau des recettes restantes
function clicBoutonlisteIngredients(tableauRecettes = recipes) {
  let clicBoutonIngredients = document.querySelectorAll(".tableau-ingredients-filtres");
  clicBoutonIngredients.forEach((clicBoutonIngredient) =>
    clicBoutonIngredient.addEventListener("click", () =>
      {
        document.querySelector("#ingredients-recherche").value = clicBoutonIngredient.textContent;
        let elementsTrouves = [];
        let champDeRecherche = document.querySelector("#ingredients-recherche");
        for(let i = 0; i < tableauRecettes.length; i++) {
          let champDeRechercheEnMinuscules = champDeRecherche.value.toLowerCase();
          // Recherche de la valeur dans les ingrédients de la recette
          let ingredientRecette = tableauRecettes[i].ingredients;
          for (j= 0; j < ingredientRecette.length; j++) {
            let NomIngredientRecetteActuelleEnMinuscules = ingredientRecette[j].ingredient.toLowerCase();
            let resultatIngredients = NomIngredientRecetteActuelleEnMinuscules.includes(champDeRechercheEnMinuscules);
            // Injection des recettes contenant l'ingrédient sélectionné dans le tableau "elementsTrouves"
            if (resultatIngredients==true) {
              elementsTrouves.push(tableauRecettes[i]);
            }
          }
        }
        //console.log(elementsTrouves);
        let boutonIngredientFiltre = document.createElement("button");
        boutonIngredientFiltre.setAttribute("class", "bouton-ingredient-filtre");
        boutonIngredientFiltre.setAttribute("name", document.querySelector("#ingredients-recherche").value);

        let croixIngredientFiltre = document.createElement("i");
        croixIngredientFiltre.setAttribute("class", "fa-regular fa-circle-xmark");
        //document.querySelector(".ingredients-recherche-angle-up-liste").prepend(boutonIngredientFiltre);
        document.querySelector(".buttonsIngredientsRecherches").prepend(boutonIngredientFiltre);
        boutonIngredientFiltre.textContent = document.querySelector("#ingredients-recherche").value, croixIngredientFiltre;
        document.querySelector(".bouton-ingredient-filtre").appendChild(croixIngredientFiltre);

        listeDesRecettesIngredients(tableauRecettes = elementsTrouves);
        clicBoutonFiltreIngredient();
      }
    )
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
  console.log(ElementsTrouvesSansDoublons);

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
        listeRecette += `    <h3 class="ingredientRecette"> ${ingredientRecette[j].ingredient} : ${ingredientRecette[j].quantity} ${ingredientRecette[j].unit}</h3>`
      }
      if (ingredientRecette[j].ingredient != undefined && ingredientRecette[j].quantity != undefined && ingredientRecette[j].unit == undefined) {
        listeRecette += `    <h3 class="ingredientRecette"> ${ingredientRecette[j].ingredient} : ${ingredientRecette[j].quantity}</h3>`
      }
      if (ingredientRecette[j].ingredient != undefined && ingredientRecette[j].quantity == undefined && ingredientRecette[j].unit == undefined) {
        listeRecette += `    <h3 class="ingredientRecette"> ${ingredientRecette[j].ingredient}</h3>`
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

}

// fonction de suppression d'un ingrédient sélectionné
function clicBoutonFiltreIngredient(tableauRecettes = recipes) {
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
          for (j= 0; j < ingredientRecette.length; j++) {
            listeIngredientsRecettes.push(ingredientRecette[j].ingredient);
          }
        }
        // Tri par ordre alphabétique des valeurs
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
            //console.log(boutonIngredient.name);
            // Sélection de tous les boutons dans la liste des ingrédients
            let BoutonIngredients = document.querySelectorAll(".tableau-ingredients-filtres");
            BoutonIngredients.forEach((BoutonIngredient) =>
              {
                console.log("BoutonIngredients ça marche");
                // Si le nom de l'ingrédient dans le tableau des ingrédients est égal à celui du nom du bouton ingrédient filtré restant alors on injecte cet ingrédient dans "elementsTrouves"
                if(BoutonIngredient.name == boutonIngredient.name) {
                  console.log("clicBoutonIngredient.name == boutonIngredient.name ça marche");  
                  console.log(tableauRecettes.length, ": tableauRecettes.length");
                  document.querySelector("#ingredients-recherche").value = boutonIngredient.name;
                  let elementsTrouves = [];
                  let champDeRecherche = document.querySelector("#ingredients-recherche");
                  for(let i = 0; i < tableauRecettes.length; i++) {
                    let champDeRechercheEnMinuscules = champDeRecherche.value.toLowerCase();
                    // Recherche de la valeur dans les ingrédients de la recette
                    let ingredientRecette = tableauRecettes[i].ingredients;
                    for (j= 0; j < ingredientRecette.length; j++) {
                      let NomIngredientRecetteActuelleEnMinuscules = ingredientRecette[j].ingredient.toLowerCase();
                      let resultatIngredients = NomIngredientRecetteActuelleEnMinuscules.includes(champDeRechercheEnMinuscules);
                      // Injection des recettes contenant l'ingrédient sélectionné dans le tableau "elementsTrouves"
                      if (resultatIngredients==true) {
                        elementsTrouves.push(tableauRecettes[i]);
                      }
                    }
                  }
                  console.log(elementsTrouves);
                  // appel de la fonction listeDesRecettesIngredients() pour l'affichage des recettes restantes
                  listeDesRecettesIngredients(tableauRecettes = elementsTrouves);
                }
              }
            )
          }
        )
      }
    )
  )
};

//-------------------------------------------------------------------------------------------------------------------------------------------//
// Fonction pour la création de la liste des appareils
function listeAppareils(tableauRecettes = recipes) {
  let appareils = document.querySelector("#appareils");
  appareils.addEventListener("click", () =>
    {
      document.querySelector(".tableau-des-appareils").innerHTML = "";
      let appareilsRecettes = [];
      for(let i = 0; i < tableauRecettes.length; i++) {
        appareilsRecettes.push(tableauRecettes[i].appliance);
      }
      // Tri par ordre alphabétique des valeurs
      appareilsRecettes.sort();
      // Supression des doublons du tableau "appareilsRecettes"
      let appareilsDesRecettes = [...new Set(appareilsRecettes)];
      console.log(appareilsDesRecettes);


      for (let j = 0; j < appareilsDesRecettes.length; j++) {
        let tableauAppareilsFiltres = document.createElement("button");
        tableauAppareilsFiltres.setAttribute("class", "tableau-appareils-filtres");
        tableauAppareilsFiltres.setAttribute("name",appareilsDesRecettes[j]);
        document.querySelector(".tableau-des-appareils").appendChild(tableauAppareilsFiltres);

        tableauAppareilsFiltres.innerText = appareilsDesRecettes[j];
      }


      let champDeRechercheAppareils = document.querySelector("#appareils-recherche");
      champDeRechercheAppareils.addEventListener("keyup", () =>
        {
          if (champDeRechercheAppareils.value.length >= 3) {
            console.log("3 caractères minimum ça marche");
            document.querySelector(".tableau-des-appareils").innerHTML = "";
            let appareilsTrouves = [];
            for(let i = 0; i < appareilsDesRecettes.length; i++) {
              let champDeRechercheEnMinuscules = champDeRechercheAppareils.value.toLowerCase();
              let resultatAppareils = appareilsDesRecettes[i].toLowerCase().includes(champDeRechercheEnMinuscules);
              if (resultatAppareils==true) {
                appareilsTrouves.push(appareilsDesRecettes[i]);
              }
            }
            console.log(appareilsTrouves);

            for (let j = 0; j < appareilsTrouves.length; j++) {
              let tableauAppareilsFiltres = document.createElement("button");
              tableauAppareilsFiltres.setAttribute("class", "tableau-appareils-filtres");
              document.querySelector(".tableau-des-appareils").appendChild(tableauAppareilsFiltres);
              tableauAppareilsFiltres.innerText = appareilsTrouves[j];
            }
          }
        }
      )


      document.querySelector("#appareils-recherche").style.display = "block";
      document.querySelector(".tableau-des-appareils").style.display = "block";
      //document.querySelector("#menu > div.appareils-recherche-angle-up-liste > div > button").style.display = "block";
      document.querySelector("#menu > div.boutons-appareils-recherche-angle-up-liste > div > div.appareils-recherche-angle-up > button").style.display = "block";
      document.querySelector("#appareils").style.display = "none";

      document.querySelector("#ingredients-recherche").style.display = "none";
      document.querySelector(".tableau-des-ingredients").style.display = "none";
      //document.querySelector("#menu > div.ingredients-recherche-angle-up-liste > div > button").style.display = "none";
      document.querySelector("#menu > div.boutons-ingredients-recherche-angle-up-liste > div > div.ingredients-recherche-angle-up > button").style.display = "none";
      document.querySelector("#ingredients").style.display = "block";

      document.querySelector("#ustensiles-recherche").style.display = "none";
      document.querySelector(".tableau-des-ustensiles").style.display = "none";
      //document.querySelector("#menu > div.ustensiles-recherche-angle-up-liste > div > button").style.display = "none";
      document.querySelector("#menu > div.boutons-ustensiles-recherche-angle-up-liste > div > div.ustensiles-recherche-angle-up > button").style.display = "none";
      document.querySelector("#ustensiles").style.display = "block";

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
        console.log("clicBoutonlisteAppareils ça marche")
        document.querySelector("#appareils-recherche").value = clicBoutonAppareil.textContent;
        let elementsTrouves = [];
        let champDeRecherche = document.querySelector("#appareils-recherche");
        for(let i = 0; i < tableauRecettes.length; i++) {
          let champDeRechercheEnMinuscules = champDeRecherche.value.toLowerCase();
          // Recherche de la valeur dans les appareils de la recette
          let appareilRecette = tableauRecettes[i].appliance;
          //console.log(appareilRecette);
          //for (j= 0; j < appareilRecette.length; j++) {
          for (j= 0; j < tableauRecettes[i].appliance[j].length; j++) {
            console.log(appareilRecette);
            /*  let NomAppareilRecetteActuelleEnMinuscules = appareilRecette[j].toLowerCase();
              console.log(NomAppareilRecetteActuelleEnMinuscules);
              let resultatAppareils = NomAppareilRecetteActuelleEnMinuscules.includes(champDeRechercheEnMinuscules);
              console.log(resultatAppareils);
              // Injection des recette contenant l'appareil sélectionné dans le tableau "elementsTrouves"
              if (resultatAppareils==true) {
                elementsTrouves.push(tableauRecettes[i]);
              }
            }*/
            //if (appareilRecette[j].appliance == champDeRechercheEnMinuscules) {
            if (tableauRecettes[i].appliance[j] == champDeRechercheEnMinuscules) {
              elementsTrouves.push(tableauRecettes[i]);
              console.log(elementsTrouves);
            }
          }
        }
        console.log(elementsTrouves);
        let boutonAppareilFiltre = document.createElement("button");
        boutonAppareilFiltre.setAttribute("class", "bouton-appareil-filtre");
        boutonAppareilFiltre.setAttribute("name", document.querySelector("#appareils-recherche").value);

        let croixAppareilFiltre = document.createElement("i");
        croixAppareilFiltre.setAttribute("class", "fa-regular fa-circle-xmark");
        //document.querySelector(".ingredients-recherche-angle-up-liste").prepend(boutonIngredientFiltre);
        document.querySelector(".buttonsAppareilsRecherches").prepend(boutonAppareilFiltre);
        boutonAppareilFiltre.textContent = document.querySelector("#appareils-recherche").value, croixAppareilFiltre;
        document.querySelector(".bouton-appareil-filtre").appendChild(croixAppareilFiltre);

        console.log(elementsTrouves);

        listeDesRecettesAppareils(tableauRecettes = elementsTrouves);
        clicBoutonFiltreAppareil();

      }
    )
  )
}

// Fonction d'affichage des recettes restantes suite à la sélection d'ingrédients
function listeDesRecettesAppareils(tableauRecettes = recipes) {
  let elementsTrouves = [];
  let listeBoutonsAppareil = document.querySelectorAll(".bouton-appareil-filtre");
  console.log(listeBoutonsAppareil);
  listeBoutonsAppareil.forEach((boutonAppareil) => 
    {
      for (let i = 0; i < tableauRecettes.length; i++) {
        console.log(tableauRecettes.length);
        let appareilRecette = tableauRecettes[i].appliance;
        console.log(tableauRecettes[i].appliance);
        for (j= 0; j < appareilRecette.length; j++) {
          if (appareilRecette[j].appliance == boutonAppareil.name) {
            elementsTrouves.push(tableauRecettes[i]);
          }
        }
      }
    }
  )
  let ElementsTrouvesSansDoublons = [...new Set(elementsTrouves)];
  console.log(ElementsTrouvesSansDoublons);

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
        listeRecette += `    <h3 class="ingredientRecette"> ${ingredientRecette[j].ingredient} : ${ingredientRecette[j].quantity} ${ingredientRecette[j].unit}</h3>`
      }
      if (ingredientRecette[j].ingredient != undefined && ingredientRecette[j].quantity != undefined && ingredientRecette[j].unit == undefined) {
        listeRecette += `    <h3 class="ingredientRecette"> ${ingredientRecette[j].ingredient} : ${ingredientRecette[j].quantity}</h3>`
      }
      if (ingredientRecette[j].ingredient != undefined && ingredientRecette[j].quantity == undefined && ingredientRecette[j].unit == undefined) {
        listeRecette += `    <h3 class="ingredientRecette"> ${ingredientRecette[j].ingredient}</h3>`
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
}

// fonction de suppression d'un ingrédient sélectionné
function clicBoutonFiltreAppareil(tableauRecettes = recipes) {
  let boutonsFiltreAppareils = document.querySelectorAll(".bouton-appareil-filtre");
  boutonsFiltreAppareils.forEach((boutonFiltreAppareil) =>
  boutonFiltreAppareil.addEventListener("click", () =>
      {
        console.log("boutonFiltreAppareil ça marche");
        boutonFiltreAppareil.remove();
        listeDesRecettesAppareils(tableauRecettes = recipes);
        
        console.log(document.querySelector(".buttonsAppareilsRecherches").children.length);
        if (document.querySelector(".buttonsAppareilsRecherches").children.length == 0) {
          recette();
        }
      }
    )
  )
};

//-------------------------------------------------------------------------------------------------------------------------------------------//
// Fonction pour la création de la liste des ustensiles
function listeUstensiles(tableauRecettes = recipes) {
  let ustensiles = document.querySelector("#ustensiles");
  ustensiles.addEventListener("click", () =>
    {
      document.querySelector(".tableau-des-ustensiles").innerHTML = "";
      let ustensilesRecettes = [];
      for(let i = 0; i < tableauRecettes.length; i++) {
        // Injection des valeurs dans le tableau "ustensilesRecettes" en les fusionnant
        ustensilesRecettes.push(...tableauRecettes[i].ustensils);
      }
      // Tri par ordre alphabétique des valeurs
      ustensilesRecettes.sort();
      // Supression des doublons du tableau "ustensilesRecettes"
      let ustensilesDesRecettes = [...new Set(ustensilesRecettes)];
      console.log(ustensilesDesRecettes);


      for (let j = 0; j < ustensilesDesRecettes.length; j++) {
        let tableauUstensilesFiltres = document.createElement("button");
        tableauUstensilesFiltres.setAttribute("class", "tableau-ustensiles-filtres");
        tableauUstensilesFiltres.setAttribute("name",ustensilesDesRecettes[j]);
        document.querySelector(".tableau-des-ustensiles").appendChild(tableauUstensilesFiltres);

        tableauUstensilesFiltres.innerText = ustensilesDesRecettes[j];
      }



      let champDeRechercheUstensiles = document.querySelector("#ustensiles-recherche");
      champDeRechercheUstensiles.addEventListener("keyup", () =>
        {
          if (champDeRechercheUstensiles.value.length >= 3) {
            console.log("3 caractères minimum ça marche");
            document.querySelector(".tableau-des-ustensiles").innerHTML = "";
            let ustensilesTrouves = [];
            for(let i = 0; i < ustensilesDesRecettes.length; i++) {
              let champDeRechercheEnMinuscules = champDeRechercheUstensiles.value.toLowerCase();
              let resultatUstensiles = ustensilesDesRecettes[i].toLowerCase().includes(champDeRechercheEnMinuscules);
              if (resultatUstensiles==true) {
                ustensilesTrouves.push(ustensilesDesRecettes[i]);
              }
            }
            console.log(ustensilesTrouves);

            for (let j = 0; j < ustensilesTrouves.length; j++) {
              let tableauUstensilesFiltres = document.createElement("button");
              tableauUstensilesFiltres.setAttribute("class", "tableau-ustensiles-filtres");
              document.querySelector(".tableau-des-ustensiles").appendChild(tableauUstensilesFiltres);
              tableauUstensilesFiltres.innerText = ustensilesTrouves[j];
            }
          }
        }
      )



      document.querySelector("#ustensiles-recherche").style.display = "block";
      document.querySelector(".tableau-des-ustensiles").style.display = "block";
      //document.querySelector("#menu > div.ustensiles-recherche-angle-up-liste > div > button").style.display = "block";
      document.querySelector("#menu > div.boutons-ustensiles-recherche-angle-up-liste > div > div.ustensiles-recherche-angle-up > button").style.display = "block";
      document.querySelector("#ustensiles").style.display = "none";

      document.querySelector("#appareils-recherche").style.display = "none";
      document.querySelector(".tableau-des-appareils").style.display = "none";
      //document.querySelector("#menu > div.appareils-recherche-angle-up-liste > div > button").style.display = "none";
      document.querySelector("#menu > div.boutons-appareils-recherche-angle-up-liste > div > div.appareils-recherche-angle-up > button").style.display = "none";
      document.querySelector("#appareils").style.display = "block";

      document.querySelector("#ingredients-recherche").style.display = "none";
      document.querySelector(".tableau-des-ingredients").style.display = "none";
      //document.querySelector("#menu > div.ingredients-recherche-angle-up-liste > div > button").style.display = "none";
      document.querySelector("#menu > div.boutons-ingredients-recherche-angle-up-liste > div > div.ingredients-recherche-angle-up > button").style.display = "none";
      document.querySelector("#ingredients").style.display = "block";
    }
  )
}
listeUstensiles();
