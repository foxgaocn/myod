require 'rails_helper'

RSpec.describe Package, type: :model do
  describe 'next-label' do
    subject { described_class.next_label(1, client.id) }
    let(:client) {Client.create(name: 'hello')}
    before do
      Package.create(user_id: 1, client_id: client.id, number: 5)
      Package.create(user_id: 1, client_id: client.id, number: 6)
    end
    it {should eql 'hello0007'}
  end
end
