---
title: Dirty Associations with ActiveRecord
---

ActiveRecord automatically keeps track of when a record was created and updated, but what about when an association is created? Does that also count as an update?

If a `blog` has many `posts` and you add a new `post` to the `blog`, has the `blog` been updated? Maybe not technically, but conceptually, perhaps it has. When I write a new post I might say “I’ve updated my blog”. If I had a timestamp that showed when my blog was last updated what I probably mean is when the last post was written. You could calculate that timestamp dynamically with a query, but it could make more sense to update the timestamp of the parent model.

When you update attributes on a model those changes are tracked in a “dirty” hash. When the model is saved it calls the `changed?` method which checks the hash to see if there’s anything in it. If there is then the `updated_at` timestamp is set to the current time. But associations are **not** tracked in this hash, so modifying them will not flag a model as being dirty. This is how you can override that behavior.

```ruby
# app/models/dirty_associations.rb
module DirtyAssociations

  attr_accessor :dirty_associations?

  def dirty_associations(_record)
    self.dirty_associations? = true
  end

  def changed?
    dirty_associations? || super
  end

end

# app/models/blog.rb
class Blog
  include DirtyAssociations

  has_many :posts, { after_add: :dirty_associations, after_remove: :dirty_associations }
end
```
