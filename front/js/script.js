

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
    
      //for (let produit of myJson) 
      for (i = 0; i < myJson.length; i++ ) {                     
        console.log(myJson[i]);
           
        //ajouter dans le html avec le getElementById le html suivant
        document.getElementById('items').innerHTML += `<a href="./product.html?id=${myJson[i]._id}">
         <article>
              <img src="${myJson[i].imageUrl}" alt="${myJson[i].altTxt}">
              <h3 class="productName">${myJson[i].name}</h3>
              <p class="productDescription">${myJson[i].description}</p>
            </article>
          </a>`;
      }

     })
    .catch((error)=>{
      //gestion en cas d'erreur
          alert('erreur')
    });
    