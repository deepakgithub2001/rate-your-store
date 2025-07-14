Rails.application.routes.draw do
  devise_for :users,
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }
  
  namespace :admin do
  get "stores/index"
  get 'dashboard', to: 'dashboard#dashboard'
  get 'users', to: 'users#index'
  get 'stores', to: 'stores#index'   
  delete 'users/:id', to: 'users#destroy'
  delete 'stores/:id', to: 'stores#destroy'
  get 'ratings', to: 'ratings#index'
  delete 'ratings/:id', to: 'ratings#destroy'
  
  end

  get "/store_owner/dashboard", to: "store_owner/dashboard#index"

  devise_scope :user do
  get "/current_user", to: "users/sessions#show", defaults: { format: :json }
  end

  resources :stores do
   resources :ratings, only: [:index, :create]
  end

  get "up" => "rails/health#show", as: :rails_health_check
end 