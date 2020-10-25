Rails.application.routes.draw do

  # アプリ管理者(super admin)のパス
  devise_for :admin_users, skip: 'registrations', controllers: {
    sessions: 'admin_users/sessions'
  }
  # ユーザー管理者(admin)のパス
  devise_for :users, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks',
    registrations: 'users/registrations',
  }

  # resources "users/resgistrations", only: [:index, :create], path: "/users/registtations" do
  #   collection do
  #     get 'user_info' # １ページ目
  #     post 'user_tel' # ２ページ目
  #     post 'user_tel_verification' # ３ページ目
  #     post 'user_profile' # ４ページ目
  #     get 'user_complete' # 登録完了後のページ
  #   end
  # end

  root to: "users#index"

  namespace :admin_users do
    root to: "top#index", as: :root
    resources :top
  end

  resources :users, only: [:edit, :update, :index]

  namespace :admin do
    resources :users do
      resources :designs, only: [:index, :new, :create, :edit, :update, :destroy]
      resources :gallery_categories, only:[:new, :create, :edit, :update]
      resources :movie_categories, only:[:new, :create, :edit, :update]
      resources :customers, only: [:index]
      resources :profiles, only:[:edit, :update]
    end
  end

  scope module: :public do
    resources :users do
      resources :designs, only: [:index]
      resources :gallery_categories, only:[:index]
      resources :movie_categories, only:[:index]
      resources :customers, only: [:new, :create]
      resources :profiles, only: [:index]
    end
  end
end