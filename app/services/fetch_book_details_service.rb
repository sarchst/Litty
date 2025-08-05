class FetchBookDetailsService
  def self.call
    Book.where(title: nil).select(:id).find_each(batch_size: 10) do |book|
      update_books_and_authors(book.id)
    end
  end

  def self.update_books_and_authors(book_id)
    begin
      book = Book.find(book_id)
      
      book_response = GoogleBooksClient.find_volume(book.isbn)
      return unless book_response
      
      volume_info = book_response.dig("volumeInfo")

      attributes_to_update = {
        title: volume_info.dig("title"),
        authors: volume_info.dig("authors")&.join(", "),
        publisher: volume_info.dig("publisher"),
        published_at: parse_datetime(volume_info.dig("publishedDate")),
        published_year: parse_year(volume_info.dig("publishedDate")),
        genre: volume_info.dig("categories")&.join(", "),
        page_count: volume_info.dig("pageCount"),
        description: volume_info.dig("description"),
        thumbnail_url: volume_info.dig("imageLinks", "thumbnail")

      }
      book.update(attributes_to_update)

    rescue => e
      File.write("failure_log.txt", "Failed ISBN: #{book.isbn} \n", mode: "a")
      File.write("failure_log.txt", "Reason: #{e} \n", mode: "a")
    end
  end

  def self.parse_year(volume_info_published_date)
    return nil if volume_info_published_date.nil?

    date_parts = volume_info_published_date.split("-")

    # If it's a 4-digit year
    if date_parts&.first.match?(/^\d{4}$/)
      return date_parts.first.to_i
    end
  end

  def self.parse_datetime(volume_info_published_date)
    return nil if volume_info_published_date.nil?

    begin
      DateTime.parse(volume_info_published_date)
    rescue
      nil
    end
  end
end