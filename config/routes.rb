Rails.application.routes.draw do
  root to: 'static#index'

  resources :users do
    resources :skills
  end
end
