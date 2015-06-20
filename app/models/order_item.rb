class OrderItem < ActiveRecord::Base
  #status: 0-created 1-bought 2-delivered 3-paid
  belongs_to :client
  belongs_to :product
  belongs_to :user

  validates :client, :product, :user, :quantity, :status, presence: true


  def bought!(bought_quantity, price)
    return if bought_quantity == 0
    raise "Bought count greater than order count" if bought_quantity > quantity
    if bought_quantity == quantity
      update_attributes!(status: 1, buy_price: price, origination_id: id)
    else #only bought partial, split the order
      OrderItem.create!(product_id: product_id, client_id: client_id, user_id: user_id, 
        quantity: bought_quantity, status: 1, buy_price: price, sale_price: sale_price,
        sale_price_unit: sale_price_unit, origination_id: id)
      update_attributes!(quantity: quantity - bought_quantity)
    end

  end
end
