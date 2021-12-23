**RF** => Requisistos funcionais.

**RNF** => Requisistos não funcionais.

**RN** => Regras de negócios.

    
# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro. (ok)

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente. (ok)
O carro deve ser cadastrado, por padrão, com disponibilidade. (ok)
Não deve ser possível cadastrar um novo carro utilizando um id de categoria não existente (validado por middleware). (ok)
*O usuário responsável pelo cadastro deve ser um usuário administrador.(validado por middleware). (ok)


# Listagem  de carros

**RF**
Deve ser possível listar todos os carros disponíveis. (ok)
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.(ok)
Deve ser possível listar todos os carros disponíveis pelo nome da marca.(ok)
Deve ser possível listar todos os carros disponíveis pelo nome do carro.(ok)

**RN**
O usuário não precisa estar logado no sistema. (ok)


# Cadastro de especificação no carro

**RF**
Deve ser possível cadastrar uma ou mais especificação para um carro, sem alterar as especificações já cadastradas (ok)



**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado. (ok)
Não deve ser possível cadastrar uma mesma especificação para o mesmo carro. (ok)
Não deve ser possível cadastrar uma especificação não existente para um carro. (ok)
O usuário responsável pelo cadastro deve ser um usuário administrador.(validado por middleware) (ok)


# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar imagems para um carro.

**RNF**
Utilizar o multer para o upload de arquivos.

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.
 

# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel.

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.