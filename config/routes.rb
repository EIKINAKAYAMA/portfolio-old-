Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  devise_for :users, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks',
    registrations: 'users/registrations'
  }
  root "users#index"
  # index page doesn't require "index" just "customers"
  # so make it easier
  

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