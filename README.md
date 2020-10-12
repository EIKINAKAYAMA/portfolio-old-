# README

## Premise（前提）
本アプリケーションは制作中です。
開発状況については、ロードマップをご参照ください。

## App name（アプリ名）
Mylifefolio

## App URL & DEMO acount(App URL & DEMO アカウント)

App URL
https://mylifefolio.com/

DEMO account  
E-mail:sample@icloud.com  
Password:samplesample  

*テストアカウントを使用せずにご自身でsign upすることも可能です。（facebookからのSign upも可能）  
 その場合、写真や動画等は事前に設定されておりませんので、ご自身で設定していただく必要がありますのでご了承ください。  
 （SNS認証の流れについてはDEMOをご参照ください。）  
 
*本アプリケーションではInstagramからの画像連携が可能ですが、  
 Instagram側での公式なアプリ承認をまだ取得していない為、一般ユーザーによる任意のInstagram連携ができません。（公式なアプリ認証は、appの作成完了時に取得予定です。）  
 Instagram連携を利用したい方は、管理者に追加したいアカウント名をお知らせください。  
 該当アカウントにMylifefolioからの連携申請が送信されますので、承認することで連携が可能となります。  
 （SNS連携の流れについてはDEMOをご参照ください。）  
 
## DEMO
 
## Overview(概要)
本アプリケーションは、無料で一般公開向けのフォト・ムービーサイトを作成できるアプリです。  
本アプリケーションは、主に公開画面と管理画面に分かれています。  

＊管理画面について  
 アプリにサインアップすると、アプリケーションを使用している全ユーザーの公開画面がタイムラインのように表示されます。  
 ここでは、Instagramやfacebookのタイムラインと同じようなイメージで、他のユーザーの公開画面のsuggestionが流れ、各ユーザーの公開画面へと遷移できるようになっています。  
 (*Suggestion機能については、随時対応予定です。)  
 
 上記画面からサインインしたユーザーの公開画面を制御する管理画面（サインインユーザーのみ遷移可能）のページに遷移します。  
 ここでは、公開画面のトップページや、カテゴリーページ、ムービーページ、プロフィール等の各ページの編集が可能で、
 それぞれの画面で表示したい画像やその編集、カテゴリーの名前、フォントや、デザインなどを設定し、公開ページを自分専用のものに仕上げていきます。 
 （＊2020/10/01時点では、エフェクトの変更等の細かいデザインの変更はできませんが、随時対応予定です。）
 
 また、公開画面の設定とは別で、個人アカウントの設定（言語の切り替え等）、運営側のお知らせ、問い合わせ等なども管理画面上に設定されており、
 運営側のお知らせや、ユーザーからの要望も吸収することで、より本アプリケーションをVer.UPしていく予定です。

＊公開画面について  
 公開画面では、管理画面で設定した内容が反映された個人のフォト・ムービーフォリオサイトが作成されます。  
 こちらの公開画面は、アプリを利用している・利用していないにかかわらず、閲覧することができます。
 URLについても、USERNAMEと紐づいている為、実名を入れた場合には、実名で検索するとfacebookのように検索エンジンの上位に出るようになります。  
 (*Usernameについては、常時任意で管理画面から編集可能)  

## Production Background(制作背景)
本アプリの制作原点は、私の友人の「自分自身のフォトサイトを手軽にカッコよく作成し、自由にメンテナンスをしたい」という言葉から始まりました。  
私もその言葉に深く共感し、アプリ作成の勉強も兼ねて作成することにしました。  

何故ならば、一般的なフォトサイトを作成するには主に下記の２通りがありますが、いずれも課題があります.  
1,本格的にフォトグラファーとして作成する場合  
 →Webデザイナーにお金を払って依頼する（金銭コスト）もしくは、個人で作成する（時間コスト）ことによる各コスト  
 →メンテナンスが困難  

2,簡易的に作成し自分のサイトを持つ場合  
 →著名人で無ければ、閲覧機会の喪失  
 
上記の課題を踏まえ、自分自身のフォトサイトを持ちたい人が無料で簡単に自分自身のサイトを持つことができ、また簡単にメンテナスができるApp.  
また、YoutubeやInstagramのようなプラットフォーム化を目指すことで、閲覧機会を最大限にし個人の人生の転機のキッカケにもなり得るAppを作成しようと考えました。  

デザイン性についは、本格的なフォトサイトと比べると、個人的なニーズの対応幅が狭い等のデメリットもありますが、可能な限り対応して行くと共に、  
フォトグラファーとして活動したい若者の転機の一因、個人の感性やストーリーを保存しシェアしていきたい感性あふれるユーザーの為の、ビジュアルに特化した新たなSNSを目指しています。


## Technology used(使用技術)
【言語】
・Ruby
.Javascript
・HTML5
・SCSS

【OS】
Unix

【DB】
MySQL

【フレームワーク】
・Ruby on Rails

【本番サーバー】
AWS

## Roadmap（＊個人的に取得したい技術に応じて、前後予定）  
ロードマップ運営管理Torello  
URL:　https://trello.com/b/rUgYtSkB/portfilio　

### 【2020年】
7月　制作開始
　　 管理画面・フロント画面の基盤の構築

８月　管理画面・フロント画面のギャラリーページ、動画ページの構築

9月　facebook認証
　　 Instagram連携（画像取得）
　　 画像複数アップロード対応、及び画像編集機の追加
　　 URL改変（SEO対応）

10月 Instagram連携（取得画像の自動保存）
　　　多言語対応
     お知らせ機能・お問い合わせ機能の追加

11月　プロフィール画面,コンタクト画面の構築の決定
　　　タイムライン機能の実装

12月　フォント・デザイン・エフェクトの編集機能構築

### 【2021年】
1月　管理画面・フロント画面のデザイン修正
　　 機能テスト
   
2月　Instagram連携認証取得
　　 結合テスト

3月　正式リリース

## DB Design(DB設計)
### users_table(UserアカウントDB)

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|
|password|string|null: false|
|id_digest|string||

##### Association
- has_many :categories, dependent: :destroy
- has_many :customers, dependent: :destroy
- has_one :profiles, dependent: :destroy
- has_one :designs, dependent: :destroy

### profiles_table(UserのprofileDB)
|Column|Type|Options|
|------|----|-------|
|user_image|string|null: false|
|user_comment|text||
|user|references|null: false, foreign_key: true|

##### Association
- belongs_to :user

### customers_table(コンタクトページのDB)
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|body|text|null: false|
|user|references|null: false, foreign_key: true|

##### Association
- belongs_to :user

### design_table(フロント公開ページ（TOP,Gallery,Movie,Contact,Profile）の統合デザイン設定用のDB)
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|

##### Association
- belongs_to :user
- has_many: top_back_images
- has_many: gallery_back_images
- has_many: movie_back_images
- has_many: contact_back_images
- has_many: profile_back_images

#### top_back_images_table(フロント公開ページ（TOP）のページデザイン設定用のDB)
|Column|Type|Options|
|------|----|-------|
|image|string||
|designs|references|null: false, foreign_key: true|

##### Association
- belongs_to :design

#### gallery_back_images_table(ギャラリー公開ページ（Gallery）のページデザイン設定用のDB)
|Column|Type|Options|
|------|----|-------|
|image|string||
|designs|references|null: false, foreign_key: true|

##### Association
- belongs_to :design

#### movie_back_images_table(ムービー公開ページ（Movie）のページデザイン設定用のDB)
|Column|Type|Options|
|------|----|-------|
|image|string||
|designs|references|null: false, foreign_key: true|

##### Association
- belongs_to :design

#### contact_back_images_table(コンタクト公開ページ（Contact）のページデザイン設定用のDB)
|Column|Type|Options|
|------|----|-------|
|image|string||
|designs|references|null: false, foreign_key: true|

##### Association
- belongs_to :design

#### profile_back_images_table(プロフィール公開ページ（Profile）のページデザイン設定用のDB)
|Column|Type|Options|
|------|----|-------|
|image|string||
|designs|references|null: false, foreign_key: true|

##### Association
- belongs_to :design

### gallery_categories_table(画像ギャラリーページの各ギャラリー用のDB)
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|user|references|null: false, foreign_key: true|

##### Association
- belongs_to :user
- has_many :category_images, dependent: :destroy

#### category_images_table(画像ギャラリーページの各ギャラリーに紐づく画像群のDB)
|Column|Type|Options|
|------|----|-------|
|image|string||
|body|text||
|category|references|null: false, foreign_key: true|

##### Association
- belongs_to :category

### movie_categories_table(ムービーページの各ギャラリー用のDB)
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|user|references|null: false, foreign_key: true|

##### Association
- belongs_to :user
- has_many :category_movies, dependent: :destroy

#### category_movies_table(ムービーページの各ギャラリーに紐づく動画群のDB)
|Column|Type|Options|
|------|----|-------|
|video|string||
|body|text||
|movie_category|references|null: false, foreign_key: true|

##### Association
- belongs_to :movie_category
