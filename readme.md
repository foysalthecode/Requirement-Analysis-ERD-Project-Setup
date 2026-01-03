# Requirment Analysis,ERD & Project Setup

# ERD

## user table 📘

|PK  | id            string            |
|----|---------------------------------|
|    | name          string            |
|    | email         string            |              
|    | role          Role              |


|   Role    |
|-----------|
|   USER    |
|   ADMIN   |

## post table 📝

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

| Value     |
| --------- |
| DRAFT     |
| PUBLISHED |
| ARCHIVED  |


## comment table 💬

| Field     | Type          | Constraints               |
| --------- | ------------- | ------------------------- |
| id        | string        | **PK**                    |
| content   | string        | —                         |
| authorId  | string        | **FK → user.id**          |
| postId    | string        | **FK → post.id**          |
| parentId  | string        | Nullable (self-reference) |
| status    | commentStatus | Enum                      |
| createdAt | DateTime      | —                         |
| updatedAt | DateTime      | —                         |

| Value                            |
| -------------------------------- |
| APPROVED                         |
| REJECT                           |

## Relationship summury 🔗
| Relationship      | Type                       |
| ----------------- | -------------------------- |
| User → Post       | One-to-Many                |
| User → Comment    | One-to-Many                |
| Post → Comment    | One-to-Many                |
| Comment → Comment | Self-referencing (Replies) |
