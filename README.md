# README

## users_table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :genres, dependent: :destroy_all
- has_many :customers, dependent: :destroy_all
- has_one :profiles, dependent: :destroy

## profiles_table(user_profile)
|Column|Type|Options|
|------|----|-------|
|user_image|string|null: false|
|user_comment|text||
|user|references|null: false, foreign_key: true|

### Association
- belongs_to :user

## customers_table(contact_page)
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|body|text|null: false|
|user|references|null: false, foreign_key: true|

### Association
- belongs_to :user

## design_table(public_all_page_design)
|Column|Type|Options|
|------|----|-------|
|top_back_image|string||
|gallery_back_image|string||
|contact_back_image|string||
|profile_back_image|string||
|user|references|null: false, foreign_key: true|

### Association
- belongs_to :user


## genres_table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|user|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- has_many :categories

## categories_table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|imge|string||
|genre|references|null: false, foreign_key: true|

### Association
- belongs_to :genre
- has_many :pictures, dependent: :destroy_all

## pictures_table(for_gallery)
|Column|Type|Options|
|------|----|-------|
|image|string||
|body|text||
|category|references|null: false, foreign_key: true|

### Association
- belongs_to :category
