# README

## App name（アプリ名）
Mylifefolio

## App URL & DEMO acount(App URL & DEMO アカウント)

App　URL
https://mylifefolio.com/

DEMO　account  
E-mail:sample@icloud.com  
Password:samplesample  

*テストアカウントを使用せずにご自身でsign upすることも可能です。（facebookからのSign upも可能）
 その場合、写真や動画等は事前に設定されておりませんのでご了承ください。
 （SNS認証の流れについてはDEMOをご参照ください。）
 
*本アプリケーションではInstagramからの画像連携が可能ですが、
 Instagram側での公式なアプリ承認をまだ取得していない為、一般ユーザーによる任意のInstagram連携ができません。
 Instagram連携を利用したい方は、管理者に追加したいアカウント名をお知らせください。
 該当アカウントにMylifefolioからの連携申請が送信されますので、承認することで連携が可能となります。
 （SNS連携の流れについてはDEMOをご参照ください。）

## Production Background(制作背景)

## Overview(概要)



## DB Design(DB設計)
### users_table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|
|password|string|null: false|

#### Association
- has_many :genres, dependent: :destroy_all
- has_many :customers, dependent: :destroy_all
- has_one :profiles, dependent: :destroy
- has_one :designs, dependent: :destroy

### profiles_table(user_profile)
|Column|Type|Options|
|------|----|-------|
|user_image|string|null: false|
|user_comment|text||
|user|references|null: false, foreign_key: true|

#### Association
- belongs_to :user

### customers_table(contact_page)
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|body|text|null: false|
|user|references|null: false, foreign_key: true|

#### Association
- belongs_to :user

### design_table(public_all_page_design for_changing effect color etc)
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|

#### Association
- belongs_to :user
- has_many: top_back_images
- has_many: gallery_back_images
- has_many: contact_back_images
- has_many: profile_back_images

### top_back_images_table(top_page_design)
|Column|Type|Options|
|------|----|-------|
|image|string||
|designs|references|null: false, foreign_key: true|

#### Association
- belongs_to :design

### gallery_back_images_table(top_page_design)
|Column|Type|Options|
|------|----|-------|
|image|string||
|designs|references|null: false, foreign_key: true|

#### Association
- belongs_to :design


### gallery_table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|user|references|null: false, foreign_key: true|

#### Association
- belongs_to :user
- has_many :categories, dependent: :destroy

### category_table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|gallery|references|null: false, foreign_key: true|

#### Association
- belongs_to :gallery
- has_many :category_images, dependent: :destroy

### category_images_table(for_gallery)
|Column|Type|Options|
|------|----|-------|
|image|string||
|body|text||
|category|references|null: false, foreign_key: true|

#### Association
- belongs_to :category
