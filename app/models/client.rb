class Client < ActiveRecord::Base
  has_many :order_items
  has_many :packages
  belongs_to :user

  validates :user, :name, presence: true

  def price_unit_string
    case price_unit
    when 0
      return '人民币'
    when 1
      return '澳元'
    else
      raise "Multicurrency not supported yet"
    end
  end
end
