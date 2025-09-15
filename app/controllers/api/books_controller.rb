class Api::BooksController < ApplicationController
  
  # GET /api/books
  # Optional params:
  #   - year: integer (returns books for specific year)
  #   - top_5: 'true'/'false' (filters by top_5 status, defaults to all books)
  def index
    if params[:year].present?
      # Return books for specific year
      year = params[:year].to_i
      books = Book.where("EXTRACT(year FROM published_at) = ?", year).order(:title)
      render json: { year => books.map(&method(:book_attributes)) }
    else
      # Filter by top_5 if specified, otherwise return all books
      books_query = Book.all
      books_query = books_query.where(top_5: true) if params[:top_5] == 'true'
      
      books_by_year = books_query.order(:published_at).group_by { |book| book.published_at&.year }
      result = {}
      books_by_year.each do |year, books|
        result[year] = books.map(&method(:book_attributes))
      end
      render json: result
    end
  end
  
  def show
    book = Book.find(params[:id])
    render json: book_attributes(book)
  end

  
  private
  
  def book_attributes(book)
    {
      id: book.id,
      isbn: book.isbn,
      title: book.title,
      subtitle: book.subtitle,
      authors: book.authors,
      publisher: book.publisher,
      published_at: book.published_at,
      published_year: book.published_year,
      genres: book.genres,
      page_count: book.page_count,
      description: book.description,
      thumbnail_url: book.thumbnail_url,
      series: book.series,
      primary_quotes: book.primary_quotes,
      accolades: book.accolades,
      author_bio: book.author_bio,
      top_5: book.top_5,
      is_fiction: book.is_fiction,
      cover_image_url: book.cover_image_url
    }
  end
end
