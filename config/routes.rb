Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  get :video, controller: :pages
  get :team, controller: :pages

  root 'magazines#index'
  resources :magazines, only: [:index, :show]
  resources :users, only: [:new, :create]
end
