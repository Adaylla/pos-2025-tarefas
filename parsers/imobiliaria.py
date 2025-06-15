import json

with open('imobiliaria.json', encoding='utf-8') as json_file:
    parsed_imobiliaria = json.load(json_file)

with open("imobiliaria.json", "w", encoding='utf-8') as json_file:
    json.dump(parsed_imobiliaria, json_file, indent=4, ensure_ascii=False)

json_string = json.dumps(parsed_imobiliaria, indent=4, ensure_ascii=False)

print(json_string)