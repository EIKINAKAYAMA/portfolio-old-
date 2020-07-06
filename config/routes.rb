Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users
  root "users#index"
  get 'users/index', to: 'users#index'
  get 'users/:id/show_admin', to: 'users#show_admin'
  get 'users/:id/show_front', to: 'users#show_front'
  resources :users, only: [:edit, :update]
end
