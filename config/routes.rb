Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users, controllers: { registrations: 'users/registrations' }
  root "users#index"
  # index page doesn't require "index" just "customers"
  # so make it easier

  resources :users, only: [:edit, :update, :show]

  namespace :admin do
    resources :users do
      resources :designs, only: [:index, :create]
      resources :customers, only: [:show]
      resources :profiles, only:[:edit, :update]
    end
  end

  scope module: :public do
    resources :users do
      resources :designs, only: [:show]
      resources :customers, only: [:new, :create]
      resources :profiles, only: [:show]
    end
  end
end
