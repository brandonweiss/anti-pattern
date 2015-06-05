require "rake"

namespace :assets do

  desc "Precompile assets"
  task :precompile do
    Rake::Task["assets:clean"].invoke
    sh "bundle exec middleman build"
  end

  desc "Remove compiled files"
  task :clean do
    sh "rm -rf #{File.dirname(__FILE__)}/build/*"
  end

end

namespace :docker do

  desc "Build Docker image"
  task :build do
    sh "docker build -t brandonweiss/anti-pattern ."
  end

  desc "Push Docker image"
  task :push do
    sh "docker push brandonweiss/anti-pattern"
  end

end
