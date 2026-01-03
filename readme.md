# Requirment Analysis,ERD & Project Setup

## ERD

> user table

|PK  | id            string            |
|----|---------------------------------|
|    | name          string            |
|    | email         string            |              
|    | role          Role              |


|   Role    |
|-----------|
|   USER    |
|   ADMIN   |

> post table

| Field      | Type       | Constraints      |
| ---------- | ---------- | ---------------- |
| id         | string     | **PK**           |
| title      | string     | —                |
| content    | string     | —                |
| thumbnail  | string     | Nullable         |
| isFeatured | boolean    | —                |
| status     | postStatus | Enum             |
| tags       | string[]   | Array            |
| views      | int        | —                |
| authorId   | string     | **FK → user.id** |
| createdAt  | DateTime   | —                |
| updatedAt  | DateTime   | —                |
