class Package < ActiveRecord::Base
  has_many :order_items
  belongs_to :client
  belongs_to :user

  validates :label, presence: true

  def next_label(user_id, client_id)
    next_number = 1
    package = Package.includes(:client).where(user_id: user_id, client_id:client_id).order_by(:number).last
    next_number = package.number++ if(package.any?)
    "#{package.client.name}-#{next_number.to_s.rjust(4, '0')}"
  end
end
