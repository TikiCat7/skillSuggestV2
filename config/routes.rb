Rails.application.routes.draw do
  root to: 'static#index'
  post   '/login',   to: 'sessions#login'
  post   '/checkAuth', to: 'sessions#checkAuth'
  get '/protected', to: 'protected#index'
  post '/protectedforuser', to: 'protecteduser#index'



  namespace :api do
    resources :skills
    resources :users do
      resources :skills
    end
  end
end
