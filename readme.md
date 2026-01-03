# Requirment Analysis,ERD & Project Setup

## ERD

> user

|PK  | id            string            |
|----|---------------------------------|
|    | name          string            |              |-----|   Role    |
|    | email         string            |              |     -------------
|    | role          Role              |---------------     | USER      |
|    |                                 |                    | ADMIN     |
