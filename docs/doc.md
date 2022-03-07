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


