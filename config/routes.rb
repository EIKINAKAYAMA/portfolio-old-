Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users
  root "users#index"

  get 'users/index', to: 'users#index'
  get 'users/:id/show_admin', to: 'users#show_admin'
  get 'users/:id/show_front', to: 'users#show_front'

  # index page doesn't require "index" just "customers"
  # so make it easier

  # get 'customers/:id/new', to: 'customers#new'
  # get 'customers/create/:id', to: 'customers#create'
  # post 'customers/create/:id', to: 'customers#create'
  # get 'customers/index', to: 'customers#index'

  resources :users, only: [:edit, :update] do
    resources :customers, only: [:new, :create, :show]
  end
end
