require "rubygems"
require "rake"

namespace :assets do

  desc "Precompile assets"
  task :precompile do
    Rake::Task["clean"].invoke
    sh "bundle exec jekyll build"
  end

end

desc "Remove compiled files"
task :clean do
  sh "rm -rf #{File.dirname(__FILE__)}/_site/*"
end
