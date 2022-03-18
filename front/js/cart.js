
const serveurKanap = "http://localhost:3000/api/products";

fetch(serveurKanap)
  .then((response) => {
    //récupere le résultat brut de l'appel
    return response.json();
  })
  .then((myJson) => {
    //récupere le json de l'appel
    //c'est à dire la liste des produits
    console.log(myJson);

  })
// Variable qui récupère les articles du panier dans le local storage
let canapé = JSON.parse(localStorage.getItem("canapé"));

// Variable pour stocker les id de chaque articles présent dans le panier
let products = [];

// Variable qui récupère l'orderId envoyé comme réponse par le serveur lors de la requête POST
let orderId = "";

// Condition de vérification si le panier existe et ou est vide et modification texte
if (canapé === null || canapé.length === 0) {
  document.querySelector("#Panier").textContent = "Le panier est vide !";
} else {
  document.querySelector("#Panier").textContent = "Votre panier";
}

for (products of canapé) {
  document.querySelector(
    "#cart__items"
  ).innerHTML += `<article class="cart__item" data-id="${products._id}" data-color="${products.color}">
        <div class="cart__item__img">
            <img src="${products.image}" alt="${products.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${products.name}</h2>
                <p>Couleur du produit: ${products.color}</p>
                <p>Prix unitaire: ${products.price}€</p>
            </div>
        <div class="cart__item__content__settings">
            <div id="jojo" class="cart__item__content__settings__quantity">
                <p id="quantité">Qté : ${products.quantity} </p>
                <p id="sousTotal">Prix total pour cet article: ${products.totalPrice}€</p> 
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${products.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem"><button>Supprimer</button></p>
            </div>
        </div>
        </div>
     </article>`;

  // Récupération des Id de chaque articles et envoi dans le tableau de la variable products[]
  //products.push(products.id);
  console.log(products);
}

// Fonction récupération des prix des articles et somme totale
//???

let functionPrice = () => {
  console.log(canapé);
  let found = canapé.map((element) => element.totalPrice);
  console.log(found);

  const reducer = (precedenteValue, couranteValue) => precedenteValue + couranteValue;
  let totale = found.reduce(reducer);
  console.log(totale);
  return totale;
};

// Fonction récupération des quantités des articles et quantité totale

let functionQuanttity = () => {
  console.log(canapé);
  let found2 = canapé.map((element) => element.quantity);
  console.log(found2);

  const reducer = (precedenteValue, couranteValue) => precedenteValue + couranteValue;
  let quantity = found2.reduce(reducer);
  console.log(quantity);
  return quantity;
};

// Fonction mise à jour du local storage products

let LocalStorageProducts = () => {
  localStorage.setItem("canapé", JSON.stringify(canapé));
};

// Fonction d'injection dans le DOM des donnés addPrice et addQuant

function injectSommeQuant() {
  // Appel de la fonction functionPrice qui nous retourne la variable somme
  let sommeTotale = functionPrice();
  //Injection de la somme totale dans le DOM
  document.querySelector("#totalPrice").textContent = sommeTotale;

  localStorage.setItem("sommeTotale", JSON.stringify(sommeTotale));

  // Appel de la fonction functionQuantity qui nous retourne la variable quant
  let quantTotale = functionQuanttity();

  //injection de la quantité des articles dans le DOM
  document.querySelector("#totalQuantity").textContent = quantTotale;

  LocalStorageProducts();
}
injectSommeQuant();

console.log(canapé);
let itemQuantity = Array.from(document.querySelectorAll(".itemQuantity"));
let sousTotal = Array.from(document.querySelectorAll("#sousTotal"));
let screenQuantity = Array.from(document.querySelectorAll("#quantité"));

itemQuantity.forEach(function (quantity, i) {
  quantity.addEventListener("change", (event) => {
    event.preventDefault();
    let newArticlePrice = quantity.value * canapé[i].price;
    console.log(quantity.value);

    screenQuantity[i].textContent = "Qté: " + quantity.value;
    canapé[i].quantity = parseInt(quantity.value, 10);

    sousTotal[i].textContent =
      "Prix total pour cet article: " + newArticlePrice + " €";
    canapé[i].totalPrice = newArticlePrice;

    console.log(`le prix de ${canapé[i].name} et passé à ${newArticlePrice}`);

    injectSommeQuant();
  });
});



/******************************** SUPPRESSION DES ARTICLES****************************/

  // Récupération de la  list des boutons supprimer et transformation en tableau avec Array.from
  let selectorSupp =  Array.from(document.querySelectorAll(".deleteItem"));
  //console.log('selectorSupp');
    // Nouveau tableau pour récupérer canapé et contrôler les suppression
    let button = [];
    //console.log('tabControlDelete');
      // Fonction de suppression 
      function btnSuppression() {
      //console.log('suppression')
        for (let i = 0;  i < selectorSupp.length; i++) {     
          // Écoute d'évènements au click sur le tableau des boutons supprimer
          selectorSupp[i].addEventListener("click", () => {
          //supprime l article de la page
          selectorSupp[i].parentElement.style.display = "none";
          // Copie du tableau canapé dans le tableau button
          button = canapé;
          // Array.prototype.splice() supprime un élément à chaque index [i] du tableau écouté
          button.splice([i], 1);
          // Mise à jour du local storage
          canapé = localStorage.setItem("canapé", JSON.stringify(button));
          // Rafraîchissement de la page
          window.location.href = "cart.html";
          });
        }
      }

      //suppression d'article
      btnSuppression();
  


/*************************************  LE FORMULAIRE ********************************/

//acquisition du bouton
const validationBtn = document.querySelector("#order");

//addEvent au click pour un contrôle du formulaire
validationBtn.addEventListener("click", function(event) {
    //rattache à EVENT , indique que lévénement n'est pas explicitement géré 
    event.preventDefault();

    let contact = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value,
    };
    console.log(contact)

    /***********************************REGEX**********************************/
    //regEx prenom
    function regExPrenomNom(value) {
      return /^[A-Z][A-Za-z\é\è\ê\-]+$/.test(value);
    }
    //regEx address
    function regExAddress(value)  {
      return /[a-zA-Z0-9.,-_]{5,50}[]{0,2}/.test(value);
    }
    //regExCity
    function regExCity(value) {
      return /[a-zA-Z\é\è\ê\-]+/.test(value);
    }
    //regEx email
    function regExEmail(value)  {
      return /[a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})/.test(value);
    };



    /***************************fonction de contrôle-formulaire******************************/

    //contrôle du prénom    
  function controlFirstName() {
    const nom = contact.lastName;
      let inputFirstName = document.querySelector("#firstName");
      if (regExPrenomNom(nom)) {
        inputFirstName.style.backgroundColor = "green";
        document.querySelector("#firstNameErrorMsg").textContent = "";
        return true;
      } else {
        inputFirstName.style.backgroundColor = "red";
        document.querySelector("#firstNameErrorMsg").textContent = "Champs invalide, ex: Keuleian";
        return false;
      }
  }

    //contrôle du nom 
  function controlLastName() {
    const nom = contact.lastName;
      let inputLastName = document.querySelector("#lastName");
      if (regExPrenomNom(nom)) {
        inputLastName.style.backgroundColor = "green";
        document.querySelector("#lastNameErrorMsg").textContent = "";
        return true;
      } else {
        inputLastName.style.backgroundColor = "red";
        document.querySelector("#lastNameErrorMsg").textContent = "Champs invalide, ex: Keuleian";
        return false;
      }
  }

    //contrôle city
  function controlCity() {
    const city = contact.city;
      let inputCity = document.querySelector("#city");
      if (regExCity(city)) {
        inputCity.style.backgroundColor = "green";
        document.querySelector("#cityErrorMsg").textContent = "";
        return true;
      } else {
        inputCity.style.backgroundColor = "red";
        document.querySelector("#cityErrorMsg").textContent = "Champ invalide, ex: Clinchamps sur orne";
        return false;
      }
  }

    //contrôle address
  function controlAddress() {
    const address = contact.address;
      let inputAddress = document.querySelector("#address");
      if (regExAddress(address)) {
        inputAddress.style.backgroundColor = "green";
        document.querySelector("#addressErrorMsg").textContent = "";
        //console.log('address');
        return true;
      } else {
        inputAddress.style.backgroundColor = "red";
        document.querySelector("#addressErrorMsg").textContent = "Champ invalide, ex: 19 rue de la grande couture";
        return false;
      }
  }

    //contrôle email
  function controlEmail() {
    const email = contact.email;
      let inputEmail = document.querySelector("#email");
      if (regExEmail(email)) {
        inputEmail.style.backgroundColor = "green";
        document.querySelector("#emailErrorMsg").textContent = "";
        return true;
      } else {
        inputEmail.style.backgroundColor = "red";
        document.querySelector("#emailErrorMsg").textContent = "Champ invalide, ex: xavier.keuleian@orange.fr";
        return false;
      }
  }
//creer une fonction 
    //contrôle de validation
    if (controlFirstName() &&
      controlLastName() &&
      controlAddress() &&
      controlCity() &&
      controlEmail()) {
      //il faut enregistrer le formulaire dans le localStorage
      localStorage.setItem("contact", JSON.stringify(contact));
      document.getElementById("order").value = "Commande passer !";
      sendServer();
    } else {
      error("remplir le formulaire");
    }
    
    /********************************FIN GESTION DU FORMULAIRE*******************************************/


    /*******************************REQUÊTE DU SERVEUR ET POST DES DONNÉES******************************/
 
    
    function sendServer() {
      const productsId = ["77711f0e466b4ddf953f677d30b0efc9", "a6ec5b49bd164d7fbe10f37b6363f9fb"];
      const sendServer = fetch("http://localhost:3000/api/products/orderId", {
        method: "POST",
        body: JSON.stringify({ contact, productsId }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        // Ensuite on stock la réponse de l'api (orderId)
        .then((response) => {
          return response.json();
        })
        .then((server) => {
          order = server.order;
          console.log("order", server);
          // Si la variable orderId n'est pas une chaîne vide on redirige notre utilisateur sur la page confirmation avec la variable
          if (order != "") {
          location.href = "confirmation.html?id=" + order;
          console.log(order);
          };
      
        })
    
     };
}); 
/******************************* FIN REQUÊTE DU SERVEUR ET POST DES DONNÉES**************************************/
/*
// Maintenir le contenu du localStorage dans le champs du formulaire

let dataFormulaire = JSON.parse(localStorage.getItem("contact"));
console.log(dataFormulaire);
if (dataFormulaire) {
  document.querySelector("#firstName").value = dataFormulaire.firstName;
  document.querySelector("#lastName").value = dataFormulaire.lastName;
  document.querySelector("#address").value = dataFormulaire.address;
  document.querySelector("#city").value = dataFormulaire.city;
  document.querySelector("#email").value = dataFormulaire.email;
} else {
  console.log("Le formulaire est vide");
}
*/

