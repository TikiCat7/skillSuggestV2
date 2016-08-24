Rails.application.routes.draw do
  root to: 'static#index'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  namespace :api do
    resources :users do
      resources :skills
    end
  end
end
