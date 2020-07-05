# README

## users_table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|
|password|string|null: false|
|image|string||
|body|text||

### Association
- has_many :genres
- has_many :customers

## genres_table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- has_many :categories

## categories_table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|hover_imge|string||
|no_hover_imge|string||
|genre_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :genre
- has_many :pictures

## pictures_table
|Column|Type|Options|
|------|----|-------|
|image|string||
|body|text||
|category_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :category

## customers_table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|body|text|null: false|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user


This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
