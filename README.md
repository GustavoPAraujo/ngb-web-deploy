# NGB

Repositório dedicado ao projeto principal da disciplina Programação para Web (INE5646 - UFSC).

O objetivo deste projeto é desenvolver uma aplicação web que funcione de forma semelhante à rede social X (antiga Twitter). A plataforma permitirá que os usuários publiquem postagens públicas em seus perfis e interajam com publicações de outros usuários. Além disso, o sistema contará com funcionalidades para gerenciamento de perfis, busca de usuários, e um feed personalizado para cada usuário, promovendo uma experiência dinâmica e interativa.

## Students Involved in the Project

- Bernardo Alves Thives (23200520)
- Davi Rodrigues Chiqueti (23202061)
- Gustavo Gomes Formento (23205463)
- Gustavo Padrao Serra de Araujo (23205462)

## Running development project

```bash
# Starting Back-End
cd backend
npm run dev
# Starting Front-End     
cd frontend
npm run dev
```

## API Routes

### Authentication ```/api/auth/```

| Method | Endpoint         | Description                                                      |
|--------|------------------|------------------------------------------------------------------|
| GET    | `/authcheck`     | Verifica se o usuário está autenticado. Requer um token válido.  |
| POST   | `/signup`        | Registra um novo usuário.                                        |
| POST   | `/login`         | Autentica um usuário e retorna um token.                         |
| POST   | `/logout`        | Faz logout do usuário, invalidando o token.                      |
| DELETE | `/delete-account`| Exclui a conta do usuário logado e remove o token.               |

### Users ```/api/users/```

| Method | Endpoint                     | Description                                                   |
|--------|----------------------        |---------------------------------------------------------------|
| GET    | `/profile/$user_name`        | Obtém as informações de um usuário.                           |
| GET    | `/suggest`                   | Obtém sugestões de perfis para seguir.                        |
| POST   | `/toggle-follow/$user_id`    | Seguir/Deixar de seguir um usuário.                           |
| POST   | `/update`                    | Atualiza as informações do usuário.                           |

### Posts ```/api/posts/```

| Method | Endpoint                     | Description                                                   |
|--------|----------------------        |---------------------------------------------------------------|
| GET    | `/all`                       | Obtém as informações de todos os posts.                       |
| GET    | `/following`                 | Obtém posts dos usuarios seguidos.                            |
| GET    | `/user/:username`            | Obtém os posts de um usuuario especifico.                     |
| POST   | `/create`                    | Cria um novo post.                                            |
| POST   | `/like/:id`                  | Curtir um post.                                               |
| DELETE | `/:id`                       | Excluir um post.                                              |

### Middlewares

- **protectRoute**: Middleware que protege rotas que exigem autenticação e adiciona um campo "user" na requisição para ser utilizado nos controladores.

#### Repositório : https://github.com/davichiqueti/NGB-Web
