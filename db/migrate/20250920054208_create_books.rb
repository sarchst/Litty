class CreateBooks < ActiveRecord::Migration[8.0]
  def change
    create_table :books do |t|
      t.string :isbn
      t.string :title
      t.string :subtitle
      t.text :description
      t.text :genres, default: [], array: true
      t.boolean :is_fiction
      t.integer :page_count
      t.text :authors, default: [], array: true
      t.text :author_bios, default: [], array: true
      t.string :series
      t.string :thumbnail_url
      t.string :publisher
      t.datetime :published_at
      t.text :primary_quotes, default: [], array: true
      t.text :accolades, default: [], array: true
      t.boolean :top_5

      t.timestamps

      t.index :isbn, unique: true
    end
  end
end
