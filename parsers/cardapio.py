from xml.dom.minidom import parse

doc = parse("cardapio.xml")

cardapio = doc.documentElement

pratos = cardapio.getElementsByTagName("prato")

id_prato = 0
for prato in pratos:
    id_prato += 1
    nome = prato.getElementsByTagName("nome")[0].firstChild.nodeValue.strip()
    print(f'{id_prato} - {nome}') 

id_escolhido = int(input("Digite o número do prato para saber mais: "))
prato = pratos[id_escolhido-1]
print("\n")

nome = prato.getElementsByTagName("nome")[0].firstChild.nodeValue.strip()
descricao = prato.getElementsByTagName("descricao")[0].firstChild.nodeValue.strip()
ingredientes = prato.getElementsByTagName("ingredientes")[0].firstChild.nodeValue.strip()
preco = prato.getElementsByTagName("preco")[0].firstChild.nodeValue.strip()
calorias = prato.getElementsByTagName("calorias")[0].firstChild.nodeValue.strip()
tempo = prato.getElementsByTagName("tempoPreparo")[0].firstChild.nodeValue.strip()

print(f"Nome: {nome}")
print(f"Descrição: {descricao}")
print("Ingredientes:")
for item in ingredientes.split(','):
    print(f"{item.strip()}")
print(f"Preço: {preco}")
print(f"Calorias: {calorias}")
print(f"Tempo de preparo: {tempo}")