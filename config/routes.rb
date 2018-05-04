Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  unauthenticated do
    root :to => 'welcome#index'
  end

  authenticated do
    root :to => 'users#dashboard'
  end

  get 'posts/finalized', to: 'posts#finalized', as: 'finalized_posts'
  get 'posts/drafted', to: 'posts#drafted', as: 'drafted_posts'

  post 'posts/:id/schedule_post', to: 'posts#schedule_post', as: 'schedule_post'


  resources :calendars
  resources :posts

  resources :calendars, only: [:index, :create, :update] do
    resources :posts
  end




  resources :users do
    resources :calendars
  end

end
