require "open-uri"

class SaveImagesService
  def self.call
    save_path = Rails.root.join("public", "book_covers").to_s
    success_count = 0
    error_count = 0
    
    FileUtils.mkdir_p(save_path) unless Dir.exist?(save_path)
    
    puts "🚀 Starting to save book cover images..."
    puts "📁 Saving to: #{save_path}"
    puts "=" * 50

    Book.find_each do |book|
      next unless book.isbn.present?

      url = "https://www.biblioshare.org/BNCServices/BNCServices.asmx/Images?Token=#{ENV['BIBLIOSHARE_TOKEN']}&EAN=#{book.isbn}&SAN=&Thumbnail=false"
      filename = File.join(save_path, "#{book.isbn}.jpg")

      # Skip if file already exists
      if File.exist?(filename)
        puts "⏭️  Skipping ISBN #{book.isbn} (already exists)"
        next
      end

      begin
        URI.open(url) do |image|
          File.open(filename, "wb") { |file| file.write(image.read) }
        end
        success_count += 1
        puts "✅ Saved cover for ISBN #{book.isbn} (#{book.title})"
      rescue => e
        error_count += 1
        puts "❌ Failed for ISBN #{book.isbn} (#{book.title}) - #{e.message}"
      end
    end

    puts "=" * 50
    puts "📊 Summary:"
    puts "✅ Successfully saved: #{success_count} covers"
    puts "❌ Failed: #{error_count} covers"
    puts "📁 Images saved to: #{save_path}"
  end
end
