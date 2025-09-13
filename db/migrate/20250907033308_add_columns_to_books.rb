class AddColumnsToBooks < ActiveRecord::Migration[8.0]
  def change
    add_column :books, :subtitle, :string
    add_column :books, :series, :string
    add_column :books, :primary_quotes, :text, array: true, default: []
    add_column :books, :accolades, :text, array: true, default: []
    add_column :books, :author_bio, :text
  end
end
