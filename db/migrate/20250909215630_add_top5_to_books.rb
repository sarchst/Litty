class AddTop5ToBooks < ActiveRecord::Migration[8.0]
  def change
    add_column :books, :top_5, :boolean
    add_column :books, :genres, :text, array: true, default: []
  end
end
