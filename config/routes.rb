Rails.application.routes.draw do
  root 'magazines#index'
  resources :magazines, only: [:index, :show]
end
