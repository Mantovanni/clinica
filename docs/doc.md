Banco de Dados
=============================

--------------------------------------------------
ESTOQUE
Toda movimentação do esque fica registrada na tabela MOVIMENTAÇÕES
onde a coluna 'operacao' recebe o tipo de operação dentre elas, Compra, Transferência, Manual. etc


--------------------------------------------------
tabela estoque_has_produtos 
tem a chave estrangeira em CASCATA


--------------------------------------------------
estoques_has_produtos

o banco de dados utiliza Triggers(gatilhos) na tabela de MOVIMENTAÇÕES 
que são ativados quando são inseridos registros na mesma esses gatilhos usa a
PROCEDURE atualizarEstoque_PRO para remover ou adicionar valores na coluna quantidade 
da tabela estoques_has_produtos.


--------------------------------------------------

tabela ESTOQUES tem a coluna categoria e subcategoria, caso 
precise criar e filtrar grupos de estoques específicos



CÓDIGO
==============================================================================
1 - CRUD básico não usa o controller específico, apenas funções personalizadas precisa usar o controller próprio

2- Ao criar um produto não é mais criado o estoque em estoque_has_produtos, isso so acontece quando é feita uma movimentação
daquele produto para o determinado estoque.OBS. limpar o código em ProdutosDAO função criarProduto

3- o usuário logado no sistema é pego nas funções dentro do DAO





Sistema da  Clinica
==============================================================================

Atendimentos
--------------------------------------------------------
Ao clicar em abrir atendimento é inserido um registro na tabela atendimentos com o campo Status = Aberto
Ao clicar em salvar é editado um registro na tabala Atendimentos
Ao clicar em fechar atendimentos é editado a tabela Atendimentos o campo Status = Concluído e
é inserido um registro na tabela Pagamentos com o campo Pagamento = Pendente