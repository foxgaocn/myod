json.array!(@order_items) do |order_item|
  json.extract! order_item, :id, :product, :client, :quantity, :status, :buy_price, :sale_price, :sale_price_unit
  json.url order_item_url(order_item, format: :json)
end
