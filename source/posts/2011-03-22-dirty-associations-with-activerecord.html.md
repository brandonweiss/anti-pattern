---
title: Dirty Associations with ActiveRecord
---

Imagine you have a system in which it’s advantageous to know when an object was last updated. Perhaps it’s just useful for users to know how fresh the data is, or maybe some operations need to run only on recently updated objects.

With ActiveRecord this is really simple, because it automatically looks for `DateTime` fields called `created_at` and `updated_at`, and if they exist will update them when an object is created and updated, respectively. But what about associations?

For example, if a `lolrus` has and belongs to many `buckets`, and you add a new `bucket` to that `lolrus`, has that `lolrus` then been updated? From a framework perspective, no. The `lolrus` object never changed, nor did the `bucket` object, just a new relation was created between them. No objects were updated. But from a user’s perspective, yes, they updated information on the `lolrus`, so the `updated_at` field on the `lolrus` _should_ reflect the current data and time. But it won't.

When you update fields on a model, those changes are tracked in a hash. And when a model is saved, it calls a method called `changed?`, which checks to see whether or not the hash is empty. If it's empty, ostensibly nothing changed, and so the `updated_at` timestamp is left alone. If it's not empty, then one or more attributes changed and the `updated_at` is set to the current time. But associations are **not** tracked in this hash, so modifying them will not flag a model as being dirty, and thus the timestamp will never be updated. This isn't a bug—it's working as intended—but in certain situations that behavior is not going to be what the user expects.

So if you want to update the timestamp of an object when the associations change as well, here's how you do it:

```ruby
# app/models/dirty_associations.rb
module DirtyAssociations
  attr_accessor :dirty

  def make_dirty(record)
    self.dirty = true
  end

  def changed?
    dirty || super
  end
end

# app/models/lolrus.rb
class Lolrus
  include DirtyAssociations

  has_and_belongs_to_many :buckets,
                          :after_add    => :make_dirty,
                          :after_remove => :make_dirty
end
```

This works because callbacks can be defined on ActiveRecord associations. When an object is added or removed from the collection, the `make_dirty` callback will be triggered and a virtual attribute representing whether or not the object is dirty will get set to `true`. Then when `changed?` is called to check whether an object is dirty, it will check the virtual attribute first before deferring to `super`.

Mad props to [Tim Galeckas](http://twitter.com/timgaleckas) for helping me sort this one out. You don’t even want to know the janky shit I had half-written to solve this.
