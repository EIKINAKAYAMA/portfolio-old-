class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable, omniauth_providers: [:facebook, :instagram]

  validates :name, presence: true, uniqueness: true
  
  has_many :gallery_categories, dependent: :destroy
  has_many :movie_categories, dependent: :destroy
  has_many :customers, dependent: :destroy
  has_many :sns_credentials
  has_one :designs, dependent: :destroy
  has_one :profile, dependent: :destroy

  accepts_nested_attributes_for :profile

  def self.from_omniauth(auth)
   sns = SnsCredential.where(provider: auth.provider, uid: auth.uid).first

   unless sns
    sns = SnsCredential.create(
      uid: auth.uid,
      provider: auth.provider,
      name: auth.info.name,
      email: auth.info.email,
      token: auth.credentials[:token]
    )
   end
  # sns認証したことがあればアソシエーションで取得
  # 無ければemailでユーザー検索して取得orビルド(保存はしない)
  user = sns.user || User.where(email: auth.info.email).first_or_initialize(
    name: auth.info.name,
    email: auth.info.email
  )
  # userが登録済みの場合はそのままログインの処理へ行くので、ここでsnsのuser_idを更新しておく
    if user.persisted?
      sns.user = user
      sns.save
    end
     { user: user, sns: sns }
  end
end
