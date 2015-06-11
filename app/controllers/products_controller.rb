class ProductsController < ApplicationController
  before_action :authenticate_user!
  def info
    render json: ["first", "second", "third", "blad", "google"]
  end
end