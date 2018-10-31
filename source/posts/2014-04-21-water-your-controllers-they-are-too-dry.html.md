---
title: Water Your Controllers, They Are Too DRY
---

When you start out, your Rails controllers usually look something like this.

```ruby
class UsersController < ApplicationController

  def index
    @users = User.all
    # ...
  end

  def show
    @user = User.find(params[:id])
    # ...
  end

  def new
    @user = User.new
    # ...
  end

  def create
    @user = User.create(params[:user])
    # ...
  end

  def edit
    @user = User.find(params[:id])
    # ...
  end

  def update
    @user = User.find(params[:id])
    # ...
  end

  def destroy
    @user = User.find(params[:id])
    # ...
  end

end
```

Everything looks good. This is how a controller should look. But... one of the first things you learn as a programmer is Don't Repeat Yourself (DRY). There's some repetition here, so you clean it up a bit. You add some more complexity, and DRY it up again. Rinse and repeat a few more times, then fast forward a few months and your controller probably looks like this.

```ruby
class UsersController < ApplicationController

  before_action :load_user,                    only: [:show, :edit, :update, :destroy]
  before_action :ensure_admin,                 only: [:index]
  before_action :ensure_current_user_or_admin, only: [:edit, :update, :destroy]

  def index
    @users = User.all
    # ...
  end

  def show
    # ...
  end

  def new
    @user = User.new
    # ...
  end

  def create
    @user = User.create(params[:user])
    # ...
  end

  def edit
    # ...
  end

  def update
    # ...
  end

  def destroy
    # ...
  end

private

  def load_user
    @user = User.find(params[:id)
  end

  def ensure_admin
    redirect_to root_url unless current_user.admin?
  end

  def ensure_current_user_or_admin
    redirect_to root_url unless current_user == @user || current_user.admin?
  end

end
```

The common logic from the beginning of various actions has been moved into private methods on the controller that are triggered before the actions run. All that remains in each action is the unique logic. I've seen this done in virtually every Rails app I've worked on and it drives me absolutely nuts.

It might look innocuous enough right now, but that's only because this is an example with most of the code omitted to emphasize the relevant parts. But imagine if these actions were all ten lines long or more, and there were ten or twenty more actions.

Later, Future You (or even worse, someone else on your team) has to update an action in the middle of the file. You open it up, go to the action, and pause. The action uses instance variables that aren't defined in the action. You scroll all the way to the top to see what is happening in the `before_action`. There are five or more callbacks, each with ten or more action names, with a mix of `only` and `except`. There are probably so many they wrap or scroll offscreen. Each callback references a private method at the bottom of the file, so you jump down to the bottom of the controller to follow along. You repeat this several times. Finally, you go back to the action to put it all together. At this point you've probably lost your train of thought and need to start over. Best-case scenario you have to make changes holding all of that logic in your head.

Clearly, this is not an improvement. It is way, way worse than repeating a few lines at the beginning of each action. You have sacrificed readability, comprehension, and maintainability, which is horribly ironic, because that is likely what you thought you were achieving when you abstracted the logic out in the first place.

The reason this pattern is so common in Rails controllers even though it so obviously does not work is that DRY is generally one of the first principles taught to new programmers. It's ostensibly easy to understand and apply, but it's taught all wrong and thus usually misunderstood. DRY probably should have been DRYURYIBTNRY—Don't Repeat Yourself Unless Repeating Yourself Is Better Than Not Repeating Yourself.

DRY is just a general guideline. It's a simple acronym to help new programmers start thinking about the problems caused by duplication. It only makes sense to use DRY if it will make your code more readable, comprehensible, and maintainable. DRY is not the ruthless removal of all repetitive code; achieving DRY for the sake of itself does nothing. Less is not always more, sometimes more can be considerably less.
