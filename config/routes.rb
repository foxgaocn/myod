Rails.application.routes.draw do
  

  resources :packages do
    collection do
      get 'next_label/:client_id', to: 'packages#next_label'
    end
    put 'paid', on: :member
  end

  resources :order_items do
    collection do
      put 'bought'
      get 'to_be_purchased'
      get 'to_be_delivered'
    end
  end

  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'} 
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'main#home'

  resources :products do
    get 'suggestions', on: :collection
  end

  resources :clients do
    get 'info', on: :collection
  end

  resources :view, only: [:show]

  get 'main/try_it' => 'main#try_it', as: :try_it

  get 'stat' => 'stat#stat'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
