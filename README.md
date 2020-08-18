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
- has_one :designs, dependent: :destroy

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

## design_table(public_all_page_design for_changing effect color etc)
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- has_many: top_back_images
- has_many: gallery_back_images
- has_many: contact_back_images
- has_many: profile_back_images

## top_back_images_table(top_page_design)
|Column|Type|Options|
|------|----|-------|
|image|string||
|designs|references|null: false, foreign_key: true|

### Association
- belongs_to :design

## gallery_back_images_table(top_page_design)
|Column|Type|Options|
|------|----|-------|
|image|string||
|designs|references|null: false, foreign_key: true|

### Association
- belongs_to :design


## gallery_table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|user|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- has_many :categories, dependent: :destroy

## category_table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|gallery|references|null: false, foreign_key: true|

### Association
- belongs_to :gallery
- has_many :category_images, dependent: :destroy

## category_images_table(for_gallery)
|Column|Type|Options|
|------|----|-------|
|image|string||
|body|text||
|category|references|null: false, foreign_key: true|

### Association
- belongs_to :category

