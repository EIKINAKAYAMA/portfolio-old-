Rails.application.routes.draw do

  devise_for :admin_users, skip: 'registrations', controllers: {
    sessions: 'admin_users/sessions'
  }
  devise_for :users, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks',
    registrations: 'users/registrations',
  }
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