import json

with open("imobiliaria.json", encoding='utf-8') as json_file:
    dados = json.load(json_file)

imoveis = dados["imobiliaria"]["imovel"]

id_imovel = 0
for imovel in imoveis:
    id_imovel += 1
    descricao = imovel["descricao"]
    print(f"{id_imovel} - {descricao}")

id_escolhido = int(input("Digite o número do imóvel para saber mais: "))
imovel = imoveis[id_escolhido - 1]

print("\n")
descricao = imovel["descricao"]
valor = imovel["valor"]
proprietario = imovel["proprietario"]
endereco = imovel["endereco"]
caracteristicas = imovel["caracteristicas"]

print(f"Descrição: {descricao}")
print(f"Valor: R$ {valor:,}".replace(",", "."))

print(f"\nProprietário: {proprietario['nome']}")
if "email" in proprietario:
    print(f"Email: {proprietario['email']}")

print("Telefones:")
if isinstance(proprietario["telefone"], dict):
    for tel in proprietario["telefone"].values():
        print(f"{tel}")
else:
    print(f"{proprietario['telefone']}")

print("\nEndereço:")
print(f"Rua: {endereco['rua']}")
print(f"Bairro: {endereco['bairro']}")
print(f"Cidade: {endereco['cidade']}")
if "numero" in endereco:
    print(f"Número: {endereco['numero']}")

print("\nCaracterísticas:")
print(f"Tamanho: {caracteristicas['tamanho']}")
print(f"Quartos: {caracteristicas['numQuartos']}")
print(f"Banheiros: {caracteristicas['numBanheiros']}")