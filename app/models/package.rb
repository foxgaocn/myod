class Package < ActiveRecord::Base
  enum status: {created: 0, paid: 1}

  has_many :order_items
  belongs_to :client
  belongs_to :user

  validates :number, :user_id, :client_id, :shipping_fee, :status, presence: true

  def total_amount
    order_items.to_a.reduce(0){|init, item| init+= item.sale_price * item.quantity}
  end

  def label
    "#{client.name}-#{number.to_s.rjust(4, '0')}"
  end

  def paid!
    ActiveRecord::Base.transaction do
      order_items.each{ |item| item.paid! }
      update_attributes!(status: 1)
    end
  end

  def self.build_package(package_params)
    ActiveRecord::Base.transaction do
      items = package_params.delete(:items)
      package = Package.create!(package_params.merge(status: 0))
      items.each do |item|
        order_item = OrderItem.find item["id"]
        order_item.sent!(item["quantity"], package.id)
      end
    end    
  end

  def self.next_label(user_id, client_id)
    next_number = 1
    package = Package.includes(:client).where(user_id: user_id, client_id:client_id).order(:number).last
    if(package.present?)
      next_number = package.number+1
      label = "#{package.client.name}-#{next_number.to_s.rjust(4, '0')}"
    else
      client = Client.find client_id
      label = "#{client.name}-#{next_number.to_s.rjust(4, '0')}"
    end
    {number: next_number, label: label}
  end
end
