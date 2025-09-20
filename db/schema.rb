# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_09_20_054208) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "books", force: :cascade do |t|
    t.string "isbn"
    t.string "title"
    t.string "subtitle"
    t.text "description"
    t.text "genres", default: [], array: true
    t.boolean "is_fiction"
    t.integer "page_count"
    t.text "authors", default: [], array: true
    t.text "author_bios", default: [], array: true
    t.string "series"
    t.string "thumbnail_url"
    t.string "publisher"
    t.datetime "published_at"
    t.text "primary_quotes", default: [], array: true
    t.text "accolades", default: [], array: true
    t.boolean "top_5"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["isbn"], name: "index_books_on_isbn", unique: true
  end
end
