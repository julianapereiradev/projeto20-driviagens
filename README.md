# projeto20-driviagens

# O que está faltando:

GET /flights 


- A data somente no deploy está chegando errada e não é possível postá-la também se for por exemplo 13-05-2024 porque ele está entendendo o 13 como mês.
Mas no localhost funciona perfeitamente

Tanto no localhost como no deploy não está pegando o seguinte tópico:
- ⚠️ O formato esperado de data é: dd-mm-aaaa. Caso não seja, o erro deverá ser tratado pelo Joi e retornar o erro 422 (Unprocessable Entity).

POST/flights

- Somente no deploy não aceita postar por exemplo 13-05-2023 porque ele está entendendo como MM-DD-YYYY