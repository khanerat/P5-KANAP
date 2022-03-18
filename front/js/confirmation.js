// numOrder affiche notre numéro de commande ainsi que la confirmation.
// On récupère dans l'url l'orderID,
// On affiche cette url dans "targetOrderId"


numOrderId = () => {
  const queryString  = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const orderId = urlParams.get("orderId")
  const targetOrderId = document.querySelector('#orderId')
  targetOrderId.textContent = `${orderId}`
}

numOrderId();

// Cette fonction permet de supprimer les produits dans le local storage.

deleteLocalStorage = () => {
  const targetLocalStorage = window.localStorage;
  targetLocalStorage.clear();
}

deleteLocalStorage();


