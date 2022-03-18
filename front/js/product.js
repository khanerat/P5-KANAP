

//ID colors
const colorIdSelector = document.querySelector("#colors");

//ID quantity
const quantitySelector = document.querySelector("#quantity");

//ID panier
const buttonEnvoyer = document.querySelector("#addToCart");


const getProductId = () => {
  return new URL(location.href).searchParams.get("id");
};
const productId = getProductId();


fetch(`http://localhost:3000/api/products/${productId}`)
    .then ((response) => {
     return response.json();
    })

     //selectionner et enregistrer les produits
    .then ((product) => {       
      productSelection(product);
      productEnregistrer(product);
    })

     //en cas d erreur
    .catch((error) => {        
        alert('erreur');
    });

//variable pour récuperer les données (product) pour injecter dans l html
    let productSelection = (product) => {

        //recherche des liens dans le html
        document.querySelector("title").textContent = product.name;
        document.querySelector(".item__img").innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
        document.querySelector("#title").textContent += product.name;
        document.querySelector("#description").textContent += product.description;
        document.querySelector("#price").textContent += product.price;



        //selction colors dans l HTML
        let colorId = document.querySelector("#colors");

          //recherche dans le tableau color pour injecter dans l html
            for (let color of product.colors) {
                let option = document.createElement("option");
                    option.innerHTML = `${color}`;
                    option.value = `${color}`;
                    colorId.appendChild(option);        
            }
    
    };
    //variable pour enregistrer les produits 
    let productEnregistrer = (product) => {

        //événement au clique sur bouton ajouter
        buttonEnvoyer.addEventListener('click', (event) => {
            event.preventDefault();
            //SI colorIdSelector.value == faux
            if (colorIdSelector.value == false){
                //CHOISIR une couleur
                confirm("selectionnez une couleur");
            // SINON SI quantitySelector.value == 0
            } else if (quantitySelector.value == 0) { 
                //CHOISIR une quantité
                confirm("selctionnez une quantité");
            //SINON
            } else{
                //AJOUTE au panier
                alert("article ajouté au panier");
                
                //valeur des objets dans un listing                
                let listingProduct = {
                    id: product._id,
                    name: product.name,
                    image: product.imageUrl,
                    altTxt: product.altTxt,
                    price: product.price,
                    description: product.description,
                    color: colorIdSelector.value,
                    quantity: parseInt(quantitySelector.value, 15),
                };
                
                console.log(listingProduct);
                //supp price
                delete listingProduct.price;

                console.log(listingProduct.price);

            /******************localstorage******************/

                //La syntaxe pour la lecture de l'article 'localStorage' est la suivante:
                let localStorageProducts = JSON.parse(localStorage.getItem("canapé"));      
                //SI localStorageProducts
                if (localStorageProducts) {           
                //cherche l'id et la couleur du produit grace à (.find()"renvoi la valeur du premier élément trouvé")
                    let item = localStorageProducts.find(
                        (item)=>
                        item.id == listingProduct.id && item.color == listingProduct.color);
                //SI ok ajoute la quantité 
                if (item) {
                        item.quantity = item.quantity + listingProduct.quantity;
                        console.log(item.quantity);
                        //STRINGIFY permet de convertir localstorage en chaîne JSON pour spécifier les propriétés
                        localStorage.setItem("canapé", JSON.stringify(localStorageProducts));
                    return;
                }
                  //SI l'objet n'est pas encore dans le "localStorage" envoie le 
                        localStorageProducts.push(listingProduct);
                        localStorage.setItem("canapé", JSON.stringify(localStorageProducts));   
                } else {
                  //SINON créer un tableau ou sera envoyé le listingProduit
                    let newTableauLocalStorage =[];
                        newTableauLocalStorage.push(listingProduct);
                        localStorage.setItem("canapé", JSON.stringify(newTableauLocalStorage));
                }
        
            }
        });    
    };



