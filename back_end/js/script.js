document.addEventListener('DOMContentLoaded' , () => {

    fetchProdutos();


    const cardItensContainer = document.getElementById('card-itens-container');
    const cardTotalValue = document.getElementById('card-total-value');
    const checkoutBtn = document.getElementById('checkout-btn');
     

    if(cardItensContainer){
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;

     

        if(cart.length == 0){

        
               
        }else{
            cardItensContainer.innerHTML = "";
            cart.forEach(product => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');

                cartItem.innerHTML = `
                <span>${product.name}</span>
                <span>R$ ${product.price.toFixed(2)}</span>
                `;

                cardItensContainer.appendChild(cartItem);

                total += product.price;

            })
        }
        cardTotalValue.textContent = `R$ ${total.toFixed(2)}`;

        checkoutBtn.addEventListener('click', () => {
            const numeroWhatsApp = '5515988301366';
            let mensagem = "Olá! Segue o meu pedido !:\n\n"
            cart.forEach(product =>{
                mensagem += `- ${product.name} (R$ ${product.price.toFixed(2)})`
            });
            mensagem += `\n*Total: R$ ${total.toFixed(2)}*`;

            const urlWhatsApp = `https://wa.me/${5515988301366}?text=${encodeURIComponent(mensagem)}`;
            window.open(urlWhatsApp, '_blank');
            localStorage.removeItem('cart');
        });
    }
        const limparTabela = document.getElementById('limpar-pedido');
        limparTabela.addEventListener('click', () => {
        localStorage.removeItem('cart');
        location.reload(true)
      })
});

function fetchProdutos(){
    fetch("http://localhost:8000/api/produtos/")
    .then(res => res.json())
    .then(data => renderProdutos(data))
    .catch(err=> console.error("Erro ao buscar produto", err));    
}
function renderProdutos(produtos){
    produtos.forEach(produto => {
        const categoria = produto.categoria.nome.toLowerCase();
        const container = document.getElementById(categoria);

        if(container){
            const card = document.createElement("div");
            card.className = "card";
            card.setAttribute("data-name", produto.nome);
            card.setAttribute("data-price", produto.preco);
            card.innerHTML = `
                <img src="${produto.imagem}" alt="bolo de pote" width="200px">
                <h4>${produto.nome}</h4>
                <p class="price">${produto.preco}</p>
                <button class="adicionar-carrinho">COMPRAR</button>
            `;
            container.appendChild(card);
        }
    })
    addCarrinho();
}
function addCarrinho(){
        const addToCartButtons = document.querySelectorAll('.adicionar-carrinho');
  

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            

            const card = button.closest('.card')
            const productName = card.getAttribute('data-name')
            const productPrice = parseFloat(card.getAttribute('data-price'))
         
           

            const product = {
                name: productName,
                price: productPrice,

            };
     
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(product)

            localStorage.setItem('cart', JSON.stringify(cart));

            alert(`${productName} Foi adicionado ao carrinho!`)
        })
    })
}