class GoogleBooksClient
  ACCESS_TOKEN = "ABC"
  BASE_URL = "https://www.googleapis.com/books/v1/volumes"
  
  def self.find_volume(isbn)
    search_terms = "q=isbn:#{isbn}"
    parsed_response = JSON.parse(HTTParty.get("#{BASE_URL}?key=#{ACCESS_TOKEN}&#{search_terms}").body)

    if parsed_response["items"].blank?
      File.write("failure_log.txt", "Blank response for isbn: #{isbn} \n", mode: "a")
      File.write("failure_log.txt", "Response: #{parsed_response} \n", mode: "a")
      return
    end

    parsed_response["items"].first
  end
end