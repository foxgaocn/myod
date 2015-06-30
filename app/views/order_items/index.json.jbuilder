json.array!(@grouped_order_items.keys) do |date|
  json.set!(:date, date)
  json.main_items @grouped_order_items[date] do |order_item|
    json.extract! order_item, :id, :quantity, :status
    json.total_quantity order_item.total_quantity
    json.closed order_item.closed?
    json.product_name order_item.product.name
    json.client_name order_item.client.name

    json.subitems order_item.subitems do |item|
      json.set!(:quantity, item.quantity)
      json.set!(:status, item.status)
      json.set!(:id, item.id)
    end
  end
end
