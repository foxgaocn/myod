class OrderItem < ActiveRecord::Base
  enum status: {created: 0, bought: 1, delivered: 2, paid: 3}

  belongs_to :client
  belongs_to :product
  belongs_to :user
  belongs_to :package
  has_many :subitems, class_name: "OrderItem", :foreign_key => 'origination_id'
  belongs_to :mainitem, class_name: "OrderItem"

  validates :client, :product, :user, :quantity, :status, presence: true


  def bought!(bought_quantity, price)
    return if bought_quantity == 0
    raise "Bought count greater than order count" if bought_quantity > quantity
    if bought_quantity == quantity
      update_attributes!(status: 1, buy_price: price)
    else #only bought partial, split the order
      OrderItem.create!(product_id: product_id, client_id: client_id, user_id: user_id, 
        quantity: bought_quantity, status: 1, buy_price: price, sale_price: sale_price,
        origination_id: main_item_id)
      update_attributes!(quantity: quantity - bought_quantity)
    end
  end

  def sent!(sent_quantity, package_id)
    return if sent_quantity == 0
    raise "Sent count greater than order count" if sent_quantity > quantity
    if sent_quantity == quantity
      update_attributes!(status: 2, package_id: package_id)
    else #only sent partial, split the order
      OrderItem.create!(product_id: product_id, client_id: client_id, user_id: user_id, 
        quantity: sent_quantity, status: 2, buy_price: buy_price, sale_price: sale_price,
        sale_price_unit: sale_price_unit, package_id: package_id, origination_id: main_item_id )
      update_attributes!(quantity: quantity - sent_quantity)
    end
  end

  def paid!
    update_attributes!(status: 3)
  end

  def self.query query_params
    from_month = query_params[:date].try(:to_i) || -1
    client_id = query_params[:client_id].try(:to_i) || -1
    status = query_params[:status].try(:to_i) || -1

    orders = OrderItem.includes(:subitems).where(user_id: query_params[:user_id]).where(origination_id: nil)
    orders = orders.where('created_at > ?', from_month.month.ago) if(from_month > 0)
    orders = orders.where(client_id: client_id) if client_id > 0
    if(status == 1)#open order
      orders = orders.to_a.select{|item| !item.closed?}
    elsif(status == 2)
      orders = orders.to_a.select{|item| item.closed?}
    end
    orders
  end

  def closed?
    paid? && subitems.all?{|item| item.paid?}
  end

  def total_quantity
    quantity + subitems.sum(:quantity)
  end

  def create_date
    created_at.in_time_zone("Melbourne").to_date
  end

  private
  def main_item_id
    origination_id || id
  end
end
