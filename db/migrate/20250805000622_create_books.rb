class CreateBooks < ActiveRecord::Migration[8.0]
  def change
    create_table :books do |t|
      t.string :isbn
      t.string :title
      t.string :publisher
      t.datetime :published_at
      t.string :genre
      t.integer :page_count
      t.text :description
      t.string :thumbnail_url
      t.timestamps
    end

    add_index :books, :isbn, unique: true
  end
end