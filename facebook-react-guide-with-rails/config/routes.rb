Rails.application.routes.draw do
  root "sections#index"

  resources :sections, only: [:index, :show]
end
