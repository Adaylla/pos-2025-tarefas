import zeep 

wsdl_url = "http://www.dataaccess.com/webservicesserver/NumberConversion.wso?WSDL"

client = zeep.Client(wsdl=wsdl_url)

while True:
    solicitacao = input("Digite um número inteiro (ou 0 para sair): ")

    if solicitacao == "0":
        print("Você saiu.")
        break

    if not solicitacao.isdigit():
        print("Entrada inválida. Por favor, digite um número inteiro.")
        continue

    numero = int(solicitacao)

    try:
        resultado = client.service.NumberToWords(numero)
        print("Resultado:", resultado)
    except Exception as e:
        print("Não foi possível obter o resultado:", e)