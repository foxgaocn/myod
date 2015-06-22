json.array!(@packages) do |package|
  json.extract! package, :id, :label, :client, :user, :number
  json.url package_url(package, format: :json)
end
