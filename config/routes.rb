Rails.application.routes.draw do
  root to: 'static#index'

  namespace :api do
    resources :users do
      resources :skills
    end
  end
end
