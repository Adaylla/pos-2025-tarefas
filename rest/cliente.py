from users import UserAPI
import argparse
import json

api = UserAPI(base_url="https://jsonplaceholder.typicode.com/users")

parser = argparse.ArgumentParser(description="CLI para gerenciar usuários")
parser.add_argument("action", choices=["list", "create", "read", "update", "delete"], help="Ação a ser realizada")
parser.add_argument("--id", type=int, help="ID do usuário")
parser.add_argument("--data", type=str, help="Dados do usuário em formato JSON (para create e update)")

args = parser.parse_args()

try:
    if args.action == "list":
        users = api.list()

    elif args.action == "create":
        if not args.data:
            raise ValueError("Dados do usuário são necessários para criar um novo usuário.")
        user_data = json.loads(args.data)
        users = api.create(user_data)
    
    elif args.action == "read":
        if not args.id:
            raise ValueError("ID do usuário é necessário para ler um usuário.")
        users = api.read(args.id)

    elif args.action == "update":
        if not args.id or not args.data:
            raise ValueError("ID do usuário e dados são necessários para atualizar um usuário.")
        user_data = json.loads(args.data)
        users = api.update(args.id, user_data)

    elif args.action == "delete":
        if not args.id:
            raise ValueError("ID do usuário é necessário para excluir.")
        users = api.delete(args.id)
    
    print(json.dumps(users, indent=2, ensure_ascii=False))
    
except ValueError as e:
    print(f"Erro: {e}")