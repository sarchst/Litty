class AddAmazonAssociatesLinksToBooks < ActiveRecord::Migration[8.0]
  def change
    add_column :books, :amazon_associates_link, :string
    add_column :books, :amazon_associates_kindle_link, :string
    add_column :books, :amazon_associates_audible_link, :string
  end
end

