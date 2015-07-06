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

  def self.query(query_params)
    from_month = query_params[:date].try(:to_i) || -1
    client_id = query_params[:client_id].try(:to_i) || -1
    status = query_params[:status].try(:to_i) || -1

    packages = Package.includes(:client, order_items: [:product])
                      .where(user_id: query_params[:user_id])
    packages = packages.where('created_at > ?', from_month.month.ago) if(from_month > 0)
    packages = packages.where(client_id: client_id) if client_id > 0
    packages = packages.where(status: status) if status > -1
    packages
  end

end
