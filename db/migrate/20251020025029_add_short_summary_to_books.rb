class AddShortSummaryToBooks < ActiveRecord::Migration[8.0]
  def change
    add_column :books, :short_summary, :text
  end
end
