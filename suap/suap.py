import requests
from getpass import getpass
from tabulate import tabulate

api_url = "https://suap.ifrn.edu.br/api/"

user = input("Usuário: ") 
password = getpass("Senha: ")

data = {"username": user, "password": password}

response = requests.post(api_url + "v2/autenticacao/token/", json=data)
token = response.json()['access']

headers = {
    "Authorization": f'Bearer {token}'
}

response = requests.get(api_url + "v2/minhas-informacoes/", headers=headers)

ano = int(input("Digite o ano do boletim: "))
periodo = int(input("Digite o período: "))

response = requests.get(api_url + f"/ensino/meu-boletim/{ano}/{periodo}/", headers=headers)

if response.status_code == 200:
    disciplinas = response.json()

    tabela = []
    for disciplina in disciplinas['results']:
        
        media = (disciplina.get('media_final_disciplina') or 
                disciplina.get('media_disciplina') or 
                disciplina.get('media_final') or 
                disciplina.get('media') or '-')
        
        if disciplina.get('segundo_semestre', False) or periodo == 2:
            tabela.append([
                disciplina['disciplina'],
                "",  
                "",  
                disciplina.get('nota_etapa_1', {}).get('nota', '-') if disciplina.get('nota_etapa_1') else '-',
                disciplina.get('nota_etapa_2', {}).get('nota', '-') if disciplina.get('nota_etapa_2') else '-',
                media
            ])
        else:
            tabela.append([
                disciplina['disciplina'],
                disciplina.get('nota_etapa_1', {}).get('nota', '-') if disciplina.get('nota_etapa_1') else '-',
                disciplina.get('nota_etapa_2', {}).get('nota', '-') if disciplina.get('nota_etapa_2') else '-',
                disciplina.get('nota_etapa_3', {}).get('nota', '-') if disciplina.get('nota_etapa_3') else '-',
                disciplina.get('nota_etapa_4', {}).get('nota', '-') if disciplina.get('nota_etapa_4') else '-',
                media
            ])

    tabela_headers = ["Disciplina", "Etapa 1", "Etapa 2", "Etapa 3", "Etapa 4", "Média Final"]

    print("\nBoletim:")
    print(tabulate(tabela, headers=tabela_headers, tablefmt="grid"))

else:
    print("Erro ao obter boletim:", response.status_code)