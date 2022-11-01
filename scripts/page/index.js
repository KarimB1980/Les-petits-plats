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
  enteteindex += `  <input type="search" id="barre-de-recherche" name="recherche" placeholder="Rechercher une recette" minlength="4">`
  enteteindex += `  <button id="loupe"><i class="fa fa-search" aria-hidden="true"></i></button>`
  enteteindex += `</section>`
  enteteindex += `<nav>`
  enteteindex += `  <div id="menu">`
  enteteindex += `    <button tabindex="0" id="ingredients" class="bouton"><p class="valeurIngredients"> Ingrédients <em class="fa fa-angle-down"></em></p></button>`
  enteteindex += `    <button tabindex="0" id="appareils" class="bouton"><p class="valeurAppareils"> Appareils <em class="fa fa-angle-down"></em></p></button>`
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


function listeIngredients() {
  let ingredients = document.querySelector("#ingredients");

  ingredients.addEventListener("click", () =>
    {
      let listeIngredientsRecettes = [];
      for (let i = 0; i < recipes.length; i++) {
        let ingredientRecette = recipes[i].ingredients;
        //console.log(ingredientRecette);
        for (j= 0; j < ingredientRecette.length; j++) {
          //console.log(ingredientRecette[j].ingredient);
          listeIngredientsRecettes.push(ingredientRecette[j].ingredient);
          //console.log(listeIngredientsRecettes);
        }
      }
      // Tri par ordre alphabétique des valeurs
      //listeIngredientsRecettes.sort();
      // Supression des doublons du tableau "listeIngredientsRecettes"
      let listeDesIngredients = [...new Set(listeIngredientsRecettes)];
      console.log(listeDesIngredients);
    }
  )
}
listeIngredients();

function listeAppareils() {
  let appareils = document.querySelector("#appareils");
  appareils.addEventListener("click", () =>
    {
      let appareilsRecettes = [];
      for(let i = 0; i < recipes.length; i++) {
        appareilsRecettes.push(recipes[i].appliance);
      }
      // Tri par ordre alphabétique des valeurs
      appareilsRecettes.sort();
      // Supression des doublons du tableau "appareilsRecettes"
      let appareilsDesRecettes = [...new Set(appareilsRecettes)];
      console.log(appareilsDesRecettes);
    }
  )
}
listeAppareils();

function listeUstensiles() {
  let ustensiles = document.querySelector("#ustensiles");
  ustensiles.addEventListener("click", () =>
    {
      let ustensilesRecettes = [];
      for(let i = 0; i < recipes.length; i++) {
        // Injection des valeurs dans le tableau "ustensilesRecettes" en les fusionnant
        ustensilesRecettes.push(...recipes[i].ustensils);
      }
      // Tri par ordre alphabétique des valeurs
      ustensilesRecettes.sort();
      // Supression des doublons du tableau "ustensilesRecettes"
      let ustensilesRecettesDesRecettes = [...new Set(ustensilesRecettes)];
      console.log(ustensilesRecettesDesRecettes);
    }
  )
}
listeUstensiles();


function barreDeRecherche() {
  let loupe = document.querySelector("#loupe");
  let champDeRecherche = document.querySelector("#barre-de-recherche");
  loupe.addEventListener("click", () =>
    {
      if (champDeRecherche.value.length >= 3) {
        //let elementsDeRecherche = [];
        let elementsTrouves = [];
        for(let i = 0; i < recipes.length; i++) {
          let champDeRechercheEnMinuscules = champDeRecherche.value.toLowerCase();
          let NomRecetteActuelleEnMinuscules = recipes[i].name.toLowerCase();
          let DescriptionRecetteActuelleEnMinuscules = recipes[i].description.toLowerCase();
          //let IngredientsRecetteActuelleEnMinuscules = recipes[i].ingredients.ingredient.toLowerCase();

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
            //console.log(NomIngredientRecetteActuelleEnMinuscules);
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
    }
  )
}
barreDeRecherche();