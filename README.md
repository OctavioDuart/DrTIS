# DrTIS
API Rest with NodeJS and ExpressJS and MongoDB .


Passo a passo para rodar o projeto :

1º - Clonar o projeto 

Para isso basta ir até o terminal e digitar : git clone https://github.com/OctavioDuart/DrTIS.git . 
_____________________________________________________________________________________________________________________________

2º - Instalar as dependências

Para instalar as dependências do projeto basta ir através do terminal até o nível do arquivo package.json e ditar o comando : npm i . Feito isso é só aguardar a instalação . 
_____________________________________________________________________________________________________________________________

3º - Iniciar o MongoDB 

Antes de inciar o servidor é necessário iniciar o banco, pois senão o servidor retornará um erro por tentar se conectar ao banco que ainda não foi inicializado . 

No Windows

C:\mongodb\bin\mongod.exe  - Inicia o Servidor MongoDB 

C:\mongodb\bin\mongo.exe   - Inicia  o Cliente  MongoDB

No Linux 

sudo service mongod start - Inicia o Servidor MongoDB 

mongo                     - Inicia o Cliente  MongoDB      


No Mac 

mongod   - Inicia o Servidor MongoDB &&

mongo    - Inicia o Cliente  MongoDB  
_____________________________________________________________________________________________________________________________

4º - Iniciar o Servidor 

Com o MongoDB inciado , podemos iniciar o servidor e pra isso basta digitar :  node start.js 
Se o ambiente tiver sido bem configurado  a saida no terminal será : 


Server running -  PORT :  3000

Connected with database

_____________________________________________________________________________________________________________________________

5º - Testar as requisições 
Com o ambiente configurado podemos inciar os testes nas requisições.
                        
                                           PRODUCTS
-----------------------------------------------------------------------------------------------------------------------------

Método: POST      Rota: http://localhost:3000/products/register

Exemplo JSON :

	        {
                  "name": "Celular", - String
                  "price": 800.99,   - Number or Float
                  "quantity": 20     - Number (inteiro) 
                }


Retorno em caso de sucesso : { "mensagem": "Produto salvo com sucesso . " } . 


Obs: Ao testar o método você deve obedecer a algumas regras de validação :

- Respeitar a tipagem dos dados .
- Não deve deixar o campo "name"  = "", undefined ou null --> Existe uma validação na API que retornará erro caso aconteça. 
- Não deve deixar o campo "price" = 0                     --> Existe uma validação na API que retornará erro caso aconteça.

-----------------------------------------------------------------------------------------------------------------------------

Método: GET      Rota: http://localhost:3000/products/consult/all

Retorno em caso de sucesso: Listagem de produtos em formato Array de Objetos .

Obs: O retorno da API será { "mensagem": "Não existem produtos na base de dados" } caso nenhum produto tenha sido cadastrado.

-----------------------------------------------------------------------------------------------------------------------------

Método: GET  Rota: http://localhost:3000/products/consult/one/:id

Retorno em caso de suceso: Objeto do produto solicitado . 

Obs: Caso a requisição seja solicitada com um id não cadastrado a API retornará {"mensagem": "Produto não encontrado"} 

----------------------------------------------------------------------------------------------------------------------------
 
 Método: DELETE Rota:http://localhost:3000/products/delete/:id
 
 Retorno em caso de sucesso: { "mensagem": "O produto foi deletado com sucesso . " }

 Obs:Caso a requisição seja solicitada co um id não cadastrado a API retornará {"mensagem": "O produto não foi encontrado."}
 
----------------------------------------------------------------------------------------------------------------------------

Método: PUT  Rota:http://localhost:3000/products/update

Retorno em caso de sucesso: {"mensagem": "Os dados do produto foram alterados com sucesso . "}

Exemplo de JSON :

			{
			  "_id": "5c5691977e94450799793de8",
			  "name": "Celular da Maçã",
			  "price": 800.99,
			  "quantity": 20,
			  "__v": 0
		       }
		       

Obs: Altere os dados respeitando as tipagens dos mesmos e não altere o ID é ele que é usado como referência para procutar o documento que você deseja alterar . 

----------------------------------------------------------------------------------------------------------------------------

                                                 SALES
                                                 
Método: POST      Rota: http://localhost:3000/sales/register

Exemplo JSON :
	
		{
		 "cpf_client" : "12345678910", - String
		 "products" : [
		                {"quantity" : 5 , "name": "Celular"},
		                {"quantity" : 10 ,"name": "Fones"},
		                {"quantity" : 15 , "name":"Notebook"}
	                     ]
               }

Retorno em caso de sucesso : {  "mensagem": "A venda foi cadastrada com sucesso . "} . 

Obs: Ao testar o método você deve obedecer a algumas regras de validação :

- Respeitar a tipagem dos dados .
- producsts deve ir como Array de Objetos mesmo que seja registrado um só produto .  
- quantity não pode ter valor igual a 0 e name deve ser diferente de "" , undefined e null - Caso aconteça a API retornará uma mensagem de erro .

----------------------------------------------------------------------------------------------------------------------------
                                                
Método: GET  Rota: http://localhost:3000/sales/consult/all

Retorno em caso de sucesso: Listagem das em formato Array de Objetos .

Obs: O retorno da API será {  "mensagem": "Não existem vendas registradas" } caso nenhuma venda tenha sido cadastrada .

----------------------------------------------------------------------------------------------------------------------------

Método: GET  Rota: http://localhost:3000/sales/consult/one/:id

Retorno em caso de suceso: Objeto da venda solicitada . 

Obs: Caso a requisição seja solicitada com um id não cadastrado a API retornará {"mensagem": "Venda não encontrada"} 

----------------------------------------------------------------------------------------------------------------------------

 Método: DELETE  Rota:http://localhost:3000/sales/delete/:id
 
 Retorno em caso de sucesso: { "mensagem": "A venda foi deletada com sucesso"}

 Obs:Caso a requisição seja solicitada co um id não cadastrado a API retornará {"mensagem": "Venda não encontrada"}
 
 ---------------------------------------------------------------------------------------------------------------------------
 
 Método: PUT  Rota: http://localhost:3000/sales/update
 
 Retorno em caso de sucesso: {"mensagem": "Os dados do produto foram alterados com sucesso . "}

Exemplo de JSON :       

			{
                           "_id": "5c5696d13ac3980e7805f198",
                           "cpf_client": "123456789",
                           "products": [
                                          {
                                           "_id": "5c5696d13ac3980e7805f199",
                                           "quantity": 3,
                                           "name": "Celular Iphone 5c"
                                         }
                                     ],
                            "__v": 0
                       }

Obs: Altere os dados respeitando as tipagens dos mesmos e não altere o ID é ele que é usado como referência para procutar o documento que você deseja alterar . 

