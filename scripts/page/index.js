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

  enteteindex += `    <button tabindex="0" id="ingredients" class="bouton"><p class="valeurIngredients"> Ingrédients <em class="fa fa-angle-down"></em></p></button>`
  enteteindex += `    <div class="ingredients-recherche-angle-up-liste">`
  enteteindex += `      <div class="ingredients-recherche-angle-up">`
  enteteindex += `        <input type="search" id="ingredients-recherche" name="ingredients-recherche" placeholder="Rechercher un ingrédient" minlength="3" style="display: none;">`
  //enteteindex += `        <em class="fa fa-angle-up" tabindex="0" style="display: none;"></em>`
  enteteindex += `        <button class="fa fa-angle-up" style="display: none"></button>`
  enteteindex += `      </div>`
  enteteindex += `      <div class="tableau-des-ingredients"></div>`
  enteteindex += `    </div>`

  enteteindex += `    <button tabindex="0" id="appareils" class="bouton"><p class="valeurAppareils"> Appareils <em class="fa fa-angle-down"></em></p></button>`
  enteteindex += `    <div class="appareils-recherche-angle-up-liste">`
  enteteindex += `      <div class="appareils-recherche-angle-up">`
  enteteindex += `        <input type="search" id="appareils-recherche" name="appareils-recherche" placeholder="Rechercher un appareil" minlength="3" style="display: none;">`
  //enteteindex += `        <em class="fa fa-angle-up" tabindex="0" style="display: none;"></em>`
  enteteindex += `        <button class="fa fa-angle-up" tabindex="0" style="display: none;"></button>`
  enteteindex += `      </div>`
  enteteindex += `      <div class="tableau-des-appareils"></div>`
  enteteindex += `    </div>`

  enteteindex += `    <button tabindex="0" id="ustensiles" class="bouton"><p class="valeurUstensiles"> Ustensiles <em class="fa fa-angle-down"></em></p></button>`
  enteteindex += `    <div class="ustensiles-recherche-angle-up-liste">`
  enteteindex += `      <div class="ustensiles-recherche-angle-up">`
  enteteindex += `        <input type="search" id="ustensiles-recherche" name="ustensiles-recherche" placeholder="Rechercher un ustensile" minlength="3" style="display: none;">`
  //enteteindex += `        <em class="fa fa-angle-up" tabindex="0" style="display: none;"></em>`
  enteteindex += `        <button class="fa fa-angle-up" tabindex="0" style="display: none;"></button>`
  enteteindex += `      </div>`
  enteteindex += `      <div class="tableau-des-ustensiles"></div>`
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


function barreDeRecherche() {
  //let loupe = document.querySelector("#loupe");
  let champDeRecherche = document.querySelector("#barre-de-recherche");
  //loupe.addEventListener("click", () =>
  champDeRecherche.addEventListener("keyup", () =>
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


        function listeIngredientsBarreDeRecherche() {
          let ingredients = document.querySelector("#ingredients");
          ingredients.addEventListener("click", () =>
            {
              document.querySelector(".tableau-des-ingredients").innerHTML = "";
              const tableauDesAppareils =  document.querySelector(".tableau-des-appareils");
              tableauDesAppareils.style.display = "none";
              const tableauDesUstensiles =  document.querySelector(".tableau-des-ustensiles");
              tableauDesUstensiles.style.display = "none";
              let listeIngredientsRecettes = [];
              for (let i = 0; i < ElementsTrouvesSansDoublons.length; i++) {
                let ingredientRecette = ElementsTrouvesSansDoublons[i].ingredients;
                for (j= 0; j < ingredientRecette.length; j++) {
                  listeIngredientsRecettes.push(ingredientRecette[j].ingredient);
                }
              }
              // Supression des doublons du tableau "listeIngredientsRecettes"
              let listeDesIngredients = [...new Set(listeIngredientsRecettes)];
              console.log(listeDesIngredients);

              const ingredientsFiltres = document.querySelector("#ingredients-recherche");
              ingredientsFiltres.style.display = "block";

              for (let j = 0; j < listeDesIngredients.length; j++) {
                let tableauIngredientsFiltres = document.createElement("div");
                tableauIngredientsFiltres.setAttribute("class", "tableau-ingredients-filtres");
                document.querySelector(".tableau-des-ingredients").appendChild(tableauIngredientsFiltres);
        
                tableauIngredientsFiltres.innerText = listeDesIngredients[j];
              }
              document.querySelector(".tableau-des-ingredients").style.display = "block";
              document.querySelector("#menu > div.ingredients-recherche-angle-up-liste > div > em").style.display = "block";
              document.querySelector("#ingredients").style.display = "none";
            }
          )
        }
        listeIngredientsBarreDeRecherche();

        function listeAppareilsBarreDeRecherche() {
          let appareils = document.querySelector("#appareils");
          appareils.addEventListener("click", () =>
            {
              document.querySelector(".tableau-des-appareils").innerHTML = "";
              let listeAppareilsRecettes = [];
              for(let i = 0; i < ElementsTrouvesSansDoublons.length; i++) {
                listeAppareilsRecettes.push(ElementsTrouvesSansDoublons[i].appliance);
              }
              // Tri par ordre alphabétique des valeurs
              listeAppareilsRecettes.sort();
              // Supression des doublons du tableau "appareilsRecettes"
              let appareilsDesRecettes = [...new Set(listeAppareilsRecettes)];
              console.log(appareilsDesRecettes);

              const appareilsFiltres = document.querySelector("#appareils-recherche");
              appareilsFiltres.style.display = "block";

              for (let j = 0; j < appareilsDesRecettes.length; j++) {
                let tableauAppareilsFiltres = document.createElement("div");
                tableauAppareilsFiltres.setAttribute("class", "tableau-appareils-filtres");
                document.querySelector(".tableau-des-appareils").appendChild(tableauAppareilsFiltres);
        
                tableauAppareilsFiltres.innerText = appareilsDesRecettes[j];
              }
              document.querySelector(".tableau-des-appareils").style.display = "block";
              document.querySelector("#menu > div.appareils-recherche-angle-up-liste > div > em").style.display = "block";
              document.querySelector("#appareils").style.display = "none";
            }
          )
        }
        listeAppareilsBarreDeRecherche();

        function listeUstensilesBarreDeRecherche() {
          let ustensiles = document.querySelector("#ustensiles");
          ustensiles.addEventListener("click", () =>
            {
              document.querySelector(".tableau-des-ustensiles").innerHTML = "";
              let ustensilesRecettes = [];
              for(let i = 0; i < ElementsTrouvesSansDoublons.length; i++) {
                // Injection des valeurs dans le tableau "ustensilesRecettes" en les fusionnant
                ustensilesRecettes.push(...ElementsTrouvesSansDoublons[i].ustensils);
              }
              // Tri par ordre alphabétique des valeurs
              ustensilesRecettes.sort();
              // Supression des doublons du tableau "ustensilesRecettes"
              let ustensilesDesRecettes = [...new Set(ustensilesRecettes)];
              console.log(ustensilesDesRecettes);


              const ustensilesFiltres = document.querySelector("#ustensiles-recherche");
              ustensilesFiltres.style.display = "block";

              for (let j = 0; j < ustensilesDesRecettes.length; j++) {
                let tableauUstensilesFiltres = document.createElement("div");
                tableauUstensilesFiltres.setAttribute("class", "tableau-ustensiles-filtres");
                document.querySelector(".tableau-des-ustensiles").appendChild(tableauUstensilesFiltres);
        
                tableauUstensilesFiltres.innerText = ustensilesDesRecettes[j];
              }
              document.querySelector(".tableau-des-ustensiles").style.display = "block";
              document.querySelector("#menu > div.ustensiles-recherche-angle-up-liste > div > em").style.display = "block";
              document.querySelector("#ustensiles").style.display = "none";
            }
          )
        }
        listeUstensilesBarreDeRecherche();  
      } else {
        recette();
      }

    }
  )
}
barreDeRecherche();


function listeIngredients() {
  let ingredients = document.querySelector("#ingredients");

  ingredients.addEventListener("click", () =>
    {
      document.querySelector(".tableau-des-ingredients").innerHTML = "";
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

      for (let j = 0; j < listeDesIngredients.length; j++) {
        let tableauIngredientsFiltres = document.createElement("div");
        tableauIngredientsFiltres.setAttribute("class", "tableau-ingredients-filtres");
        document.querySelector(".tableau-des-ingredients").appendChild(tableauIngredientsFiltres);

        tableauIngredientsFiltres.innerText = listeDesIngredients[j];
      }

      document.querySelector("#ingredients-recherche").style.display = "block";
      document.querySelector(".tableau-des-ingredients").style.display = "block";
      //document.querySelector("#menu > div.ingredients-recherche-angle-up-liste > div > em").style.display = "block";
      document.querySelector("#menu > div.ingredients-recherche-angle-up-liste > div > button").style.display = "block";

      document.querySelector("#ingredients").style.display = "none";

      document.querySelector("#appareils-recherche").style.display = "none";
      document.querySelector(".tableau-des-appareils").style.display = "none";
      //document.querySelector("#menu > div.appareils-recherche-angle-up-liste > div > em").style.display = "none";
      document.querySelector("#menu > div.appareils-recherche-angle-up-liste > div > button").style.display = "none";
      document.querySelector("#appareils").style.display = "block";

      document.querySelector("#ustensiles-recherche").style.display = "none";
      document.querySelector(".tableau-des-ustensiles").style.display = "none";
      //document.querySelector("#menu > div.ustensiles-recherche-angle-up-liste > div > em").style.display = "none";
      document.querySelector("#menu > div.ustensiles-recherche-angle-up-liste > div > button").style.display = "none";
      document.querySelector("#ustensiles").style.display = "block";
    }
  )
}
listeIngredients();

function listeAppareils() {
  let appareils = document.querySelector("#appareils");
  appareils.addEventListener("click", () =>
    {
      document.querySelector(".tableau-des-appareils").innerHTML = "";
      let appareilsRecettes = [];
      for(let i = 0; i < recipes.length; i++) {
        appareilsRecettes.push(recipes[i].appliance);
      }
      // Tri par ordre alphabétique des valeurs
      appareilsRecettes.sort();
      // Supression des doublons du tableau "appareilsRecettes"
      let appareilsDesRecettes = [...new Set(appareilsRecettes)];
      console.log(appareilsDesRecettes);


      for (let j = 0; j < appareilsDesRecettes.length; j++) {
        let tableauAppareilsFiltres = document.createElement("div");
        tableauAppareilsFiltres.setAttribute("class", "tableau-appareils-filtres");
        document.querySelector(".tableau-des-appareils").appendChild(tableauAppareilsFiltres);

        tableauAppareilsFiltres.innerText = appareilsDesRecettes[j];
      }

      document.querySelector("#appareils-recherche").style.display = "block";
      document.querySelector(".tableau-des-appareils").style.display = "block";
      //document.querySelector("#menu > div.appareils-recherche-angle-up-liste > div > em").style.display = "block";
      document.querySelector("#menu > div.appareils-recherche-angle-up-liste > div > button").style.display = "block";
      document.querySelector("#appareils").style.display = "none";

      document.querySelector("#ingredients-recherche").style.display = "none";
      document.querySelector(".tableau-des-ingredients").style.display = "none";
      //document.querySelector("#menu > div.ingredients-recherche-angle-up-liste > div > em").style.display = "none";
      document.querySelector("#menu > div.ingredients-recherche-angle-up-liste > div > button").style.display = "none";
      document.querySelector("#ingredients").style.display = "block";

      document.querySelector("#ustensiles-recherche").style.display = "none";
      document.querySelector(".tableau-des-ustensiles").style.display = "none";
      //document.querySelector("#menu > div.ustensiles-recherche-angle-up-liste > div > em").style.display = "none";
      document.querySelector("#menu > div.ustensiles-recherche-angle-up-liste > div > button").style.display = "none";
      document.querySelector("#ustensiles").style.display = "block";
    }
  )
}
listeAppareils();

function listeUstensiles() {
  let ustensiles = document.querySelector("#ustensiles");
  ustensiles.addEventListener("click", () =>
    {
      document.querySelector(".tableau-des-ustensiles").innerHTML = "";
      let ustensilesRecettes = [];
      for(let i = 0; i < recipes.length; i++) {
        // Injection des valeurs dans le tableau "ustensilesRecettes" en les fusionnant
        ustensilesRecettes.push(...recipes[i].ustensils);
      }
      // Tri par ordre alphabétique des valeurs
      ustensilesRecettes.sort();
      // Supression des doublons du tableau "ustensilesRecettes"
      let ustensilesDesRecettes = [...new Set(ustensilesRecettes)];
      console.log(ustensilesDesRecettes);


      for (let j = 0; j < ustensilesDesRecettes.length; j++) {
        let tableauUstensilesFiltres = document.createElement("div");
        tableauUstensilesFiltres.setAttribute("class", "tableau-appareils-filtres");
        document.querySelector(".tableau-des-ustensiles").appendChild(tableauUstensilesFiltres);

        tableauUstensilesFiltres.innerText = ustensilesDesRecettes[j];
      }

      document.querySelector("#ustensiles-recherche").style.display = "block";
      document.querySelector(".tableau-des-ustensiles").style.display = "block";
      //document.querySelector("#menu > div.ustensiles-recherche-angle-up-liste > div > em").style.display = "block";
      document.querySelector("#menu > div.ustensiles-recherche-angle-up-liste > div > button").style.display = "block";
      document.querySelector("#ustensiles").style.display = "none";

      document.querySelector("#appareils-recherche").style.display = "none";
      document.querySelector(".tableau-des-appareils").style.display = "none";
      //document.querySelector("#menu > div.appareils-recherche-angle-up-liste > div > em").style.display = "none";
      document.querySelector("#menu > div.appareils-recherche-angle-up-liste > div > button").style.display = "none";
      document.querySelector("#appareils").style.display = "block";

      document.querySelector("#ingredients-recherche").style.display = "none";
      document.querySelector(".tableau-des-ingredients").style.display = "none";
      //document.querySelector("#menu > div.ingredients-recherche-angle-up-liste > div > em").style.display = "none";
      document.querySelector("#menu > div.ingredients-recherche-angle-up-liste > div > button").style.display = "none";
      document.querySelector("#ingredients").style.display = "block";
    }
  )
}
listeUstensiles();

function clickFaAngleUp() {
  let faAngleUps = document.querySelectorAll(".fa-angle-up");
  faAngleUps.forEach((faAngleUp) => 
    faAngleUp.addEventListener("click", () =>
      {
        document.querySelector("#ingredients-recherche").style.display = "none";
        document.querySelector(".tableau-des-ingredients").style.display = "none";
        //document.querySelector("#menu > div.ingredients-recherche-angle-up-liste > div > em").style.display = "none";
        document.querySelector("#menu > div.ingredients-recherche-angle-up-liste > div > button").style.display = "none";
        document.querySelector("#ingredients").style.display = "block";

        document.querySelector("#appareils-recherche").style.display = "none";
        document.querySelector(".tableau-des-appareils").style.display = "none";
        //document.querySelector("#menu > div.appareils-recherche-angle-up-liste > div > em").style.display = "none";
        document.querySelector("#menu > div.appareils-recherche-angle-up-liste > div > button").style.display = "none";
        document.querySelector("#appareils").style.display = "block";

        document.querySelector("#ustensiles-recherche").style.display = "none";
        document.querySelector(".tableau-des-ustensiles").style.display = "none";
        //document.querySelector("#menu > div.ustensiles-recherche-angle-up-liste > div > em").style.display = "none";
        document.querySelector("#menu > div.ustensiles-recherche-angle-up-liste > div > button").style.display = "none";
        document.querySelector("#ustensiles").style.display = "block";
      }
    )
  )
}
clickFaAngleUp();