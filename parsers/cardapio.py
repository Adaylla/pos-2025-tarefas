from xml.dom.minidom import parse

dom = parse("cardapio.xml")

cardapio = dom.documentElement

pratos = cardapio.getElementsByTagName("prato")

for i, prato in enumerate(pratos, start=1):
    nome = prato.getElementsByTagName("nome")[0].firstChild.nodeValue.strip()
    print(f"{i} - {nome}")

escolha = input("\nDigite o número do prato para saber mais: ").strip()

if escolha.isdigit():
    indice = int(escolha) - 1
    if 0 <= indice < len(pratos):
        prato = pratos[indice]

        nome = prato.getElementsByTagName("nome")[0].firstChild.nodeValue.strip()
        descricao = prato.getElementsByTagName("descricao")[0].firstChild.nodeValue.strip()
        ingredientes = prato.getElementsByTagName("ingredientes")[0].firstChild.nodeValue.strip()
        preco = prato.getElementsByTagName("preco")[0].firstChild.nodeValue.strip()
        calorias = prato.getElementsByTagName("calorias")[0].firstChild.nodeValue.strip()
        tempo_preparo = prato.getElementsByTagName("tempoPreparo")[0].firstChild.nodeValue.strip()

        print(f"\nNome: {nome}")
        print(f"Descrição: {descricao}")
        print("Ingredientes:")
        for item in ingredientes.split(','):
            print(f"{item.strip()}")
        print(f"Preço: {preco}")
        print(f"Calorias: {calorias}")
        print(f"Tempo de preparo: {tempo_preparo}")
    else:
        print("Número de prato inválido.")
else:
    print("Entrada inválida. Digite apenas números.")