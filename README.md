# Sakila-app

## データベースのセットアップ

```sh
docker compose up -d
docker compose exec db bash
mysql -u root -p
source /docker-entrypoint-initdb.d/1_sakila-schema.sql;
source /docker-entrypoint-initdb.d/2_sakila-data.sql;
```

## テーブル設計

| テーブル名 | 定義                             |
| ---------- | -------------------------------- |
| film       | リリース済みでレンタル可能な映画 |
| actor      | 映画に出演している俳優           |
| customer   | 顧客                             |
| category   | 映画のジャンル                   |
| payment    | 顧客が支払ったレンタル料         |
| language   | 映画の元の言語と対応している言語 |
| film_actor | 俳優と出演した映画               |
| inventory  | レンタル可能な映画の在庫         |

### ER 図

```mermaid
erDiagram
    CUSTOMER ||--o{ PAYMENT : makes
    CUSTOMER ||--o{ RENTAL : has
    CUSTOMER }|--|| ADDRESS : "has"

    STAFF ||--o{ PAYMENT : processes
    STAFF ||--o{ RENTAL : processes
    STAFF }|--|| ADDRESS : "has"
    STAFF }|--|| STORE : "works at"

    INVENTORY ||--o{ RENTAL : includes
    INVENTORY }|--|| FILM : contains
    INVENTORY }|--|| STORE : "stored in"

    FILM ||--o{ FILM_ACTOR : has
    FILM ||--o{ FILM_CATEGORY : belongs_to
    FILM_ACTOR }|--|| ACTOR : features
    FILM_CATEGORY }|--|| CATEGORY : has

    STORE }|--|| ADDRESS : "located at"
    ADDRESS }|--|| CITY : "in"
    CITY }|--|| COUNTRY : "in"

    CUSTOMER {
        int customer_id PK
        string first_name
        string last_name
        string email
        int address_id FK
    }

    FILM {
        int film_id PK
        string title
        text description
        int release_year
        int language_id FK
        int rental_duration
        decimal rental_rate
        int length
        decimal replacement_cost
        string rating
    }

    INVENTORY {
        int inventory_id PK
        int film_id FK
        int store_id FK
    }

    STORE {
        int store_id PK
        int manager_staff_id FK
        int address_id FK
    }

    STAFF {
        int staff_id PK
        string first_name
        string last_name
        int address_id FK
        string email
        int store_id FK
        string username
        string password
    }

    PAYMENT {
        int payment_id PK
        int customer_id FK
        int staff_id FK
        int rental_id FK
        decimal amount
        datetime payment_date
    }

    RENTAL {
        int rental_id PK
        datetime rental_date
        int inventory_id FK
        int customer_id FK
        datetime return_date
        int staff_id FK
    }
```
