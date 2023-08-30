# projeto20-driviagens

# O que está faltando:

1. POST /fights
*  O formato esperado de data é: dd-mm-aaaa. Caso não seja, o erro deverá ser tratado pelo Joi e retornar o erro 422.

Anotação: Da forma como está é postado no formato 2023-12-01 (API e Banco) quando tem que estar no formato brasileiro.
Quando eu mudava para o formato brasileiro depois eu não conseguia mais fazer a diferença de data.


2. GET /flights
* ...aconteçam numa data nesse intervalo. (/flights?smaller-date=03-09-2023&bigger-date=07-09-2023)
* ⚠️ O formato esperado de data é: dd-mm-aaaa. Caso não seja, o erro deverá ser tratado pelo Joi e retornar o erro 422 (Unprocessable Entity)

Anotação: Da maneira como está eu só consigo testar passando rotas como smaller-date=2023-07-01&bigger-date=2023-09-30.
Além disso a data não está chegando no formato dd-mm-aaaa

3. Arquitetura e boas práticas ⭐