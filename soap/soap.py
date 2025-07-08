import requests
from xml.dom.minidom import parseString

url = "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso"

codigo = "100"

while not codigo == "0":
    print("\nMenu:")
    print("1 - Nome da Moeda")
    print("2 - Nome do Idioma")
    print("3 - Nome do País")
    print("0 - Sair")

    codigo = input("Digite o código da opção: ")

    if codigo == "1":
        currencyName = input("Digite o código da moeda (ex: BRL): ")
        payload = """<?xml version="1.0" encoding="utf-8"?>
                    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                        <soap:Body>
                            <CurrencyName xmlns="http://www.oorsprong.org/websamples.countryinfo">
                                <sCurrencyISOCode>""" + currencyName + """</sCurrencyISOCode>
                            </CurrencyName>
                        </soap:Body>
                    </soap:Envelope>"""
        resposta = "m:CurrencyNameResult"

    elif codigo == "2":
        languageName = input("Digite o código do idioma (ex: ES, FR, DE, ZH): ")
        payload = """<?xml version="1.0" encoding="utf-8"?>
            <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <LanguageName xmlns="http://www.oorsprong.org/websamples.countryinfo">
                        <sISOCode>""" + languageName + """</sISOCode>
                    </LanguageName>
                </soap:Body>
            </soap:Envelope>"""
        resposta = "m:LanguageNameResult"

    elif codigo == "3":
        countryName = input("Digite o código do país (ex: BR): ")
        payload = """<?xml version="1.0" encoding="utf-8"?>
            <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <CountryName xmlns="http://www.oorsprong.org/websamples.countryinfo">
                        <sCountryISOCode>""" + countryName + """</sCountryISOCode>
                    </CountryName>
                </soap:Body>
            </soap:Envelope>"""
        resposta = "m:CountryNameResult"
        
    elif codigo == "0":
        print("Você saiu.")
        break

    else:
        print("Opção inválida. Tente novamente.")
        continue

    headers = {
        "Content-Type": "text/xml; charset=utf-8",
    }

    response = requests.post(url, data=payload, headers=headers)
    dom = parseString(response.content)

    try:
        for tag in dom.getElementsByTagName("*"):
            if tag.tagName.endswith("Result"):
                resultado = tag.firstChild.nodeValue
        print("Resultado:", resultado)
    except Exception as e:
        print("Não foi possível obter o resultado:", e)