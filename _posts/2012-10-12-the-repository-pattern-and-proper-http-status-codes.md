---
layout: post
title: The Repository Pattern and Proper HTTP Status Codes
permalink: the-repository-pattern-and-proper-http-status-codes
date: 2012-10-12
---

Suppose you are building an API and you need one of the resources to be upsertable---that is, you need to be able to either insert or update data from the same endpoint. Assuming you're using Rails, it might look something like this.

{% highlight ruby %}
def upsert
  @pickle = Pickle.new params[:pickle]

  if existing_pickle = Pickle.find_by_id(@pickle.id)
    @pickle = existing_pickle.assign_attributes = params[:pickle]
  end

  @pickle.save

  render :pickle
end
{% endhighlight %}

This isn't bad, but all the cool kids are using the Repository pattern (which is really just a [Facade][0] for persistence layers) to abstract ActiveRecord away from the domain as much as possible. So something like this might be better.

{% highlight ruby %}
def upsert
  @pickle = PickleRepository.create_or_update(params[:pickle])

  render :pickle
end
{% endhighlight %}

Now _that_ is a delicious PicklesController. But it's not quite finished. If the `@pickle` has any errors and can't be created or updated, we're still going to be returning a `200 OK` response. That's bad form. We can check if it has any errors and change the status accordingly.

{% highlight ruby %}
def upsert
  @pickle     = PickleRepository.create_or_update(params[:pickle])
  http_status = @pickle.errors.any? ? :unprocessable_entity : :ok

  render :pickle, status: http_status
end
{% endhighlight %}

Excellent. Now we're returning a `422 Unprocessable Entity` if the `@pickle` has validation errors. But it's still not quite finished. We're returning a `200 OK` if the resource is created. Although technically incorrect, that's probably fine for most cases. But what if the client needs to know whether the request resulted in a resource being created or a resource being updated? Well there's actually a different HTTP status code for that, `201 Created`. So let's just implement that and… crap, in the process of isolating persistence we've also removed our ability to determine if the object was saved or updated. What to do?

After poring over the Rails docs for an hour or two I found that you can kind of introspect the state of an object after saving using `ActiveModel::Dirty#previous_changes`. If `previous_changes` includes a key named `id`, it's (probably) a new object and should return a `201 Created`, otherwise it's an update and should return a `200 OK`. All together now.

{% highlight ruby %}
def upsert
  @pickle     = PickleRepository.create_or_update(params[:pickle])
  http_status = HTTPStatusCode.new(@pickle).from_model

  render :pickle, status: http_status
end

# lib/http_status_code.rb
class HTTPStatusCode

  attr_reader :model

  def initialize(model)
    @model = model
  end

  def from_model
    unprocessable_entity || created || ok
  end

private

  def unprocessable_entity
    :unprocessable_entity if model.errors.any?
  end

  def created
    :created if model.previous_changes.include?("id")
  end

  def ok
    :ok
  end

end
{% endhighlight %}

[0]: http://en.wikipedia.org/wiki/Facade_pattern
