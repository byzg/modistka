Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  root 'magazines#index'
  resources :magazines, only: [:index, :show]
end
