class ProductsController < ApplicationController
  def info
    render json: ["first", "second", "third", "blad", "google"]
  end
end