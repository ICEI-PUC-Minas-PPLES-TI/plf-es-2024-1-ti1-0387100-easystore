function realizarInventario() {
    var novaQuantidade = document.getElementById('qnt').value;
    var codigoBarras = document.getElementById('codBarras').value;
    var produtosString = localStorage.getItem('produtos');
    if (produtosString) {
        var produtosObj = JSON.parse(produtosString);
        if (produtosObj && produtosObj.produtos) {
            var produto = produtosObj.produtos.find(p => p.codBarras === codigoBarras);

            if (produto) {
                produto.quantidade = novaQuantidade;
                localStorage.setItem('produtos', JSON.stringify(produtosObj));
                alert('Quantidade atualizada com sucesso!');
				document.getElementById('codBarras').value = '';
				document.getElementById('qnt').value = '';
            } else {
                alert('Produto não encontrado.');
            }
        } else {
            alert('Formato de dados no local storage é inválido.');
        }
    } else {
        alert('Nenhum produto encontrado no local storage.');
    }
}
