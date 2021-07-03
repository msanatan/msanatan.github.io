---
title: "Small Website? Go Flask, and Use Blueprints"
date: 2014-10-31 23:40
categories:
- [web]
- [tutorial]
tags:
- python
- flask
---

It seems I've got into web development more and more. As I'm sticking to a language [I know and love](https://www.python.org/ "Python"), I'm using [Flask](http://flask.pocoo.org/ "Flask") - a super awesome microframework  based on the powerful Werkzeug and Jinja2 libraries. Why not [Django](https://www.djangoproject.com/ "Django")? No particular reason, I've used it before and just prefer how easy it is to get up and running with Flask!

For those too lazy to follow the links (shame on you!) here's a basic Hello World in Flask to make you excited:

```python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run()
```

## Blueprints For Large Projects, Blueprints For Small Projects

![Organise - Flask Todo App](/images/organise_flask_todo.png)

In this post I'll show you how you can apply blueprints to small projects, like the todo example you go through in the Flask tutorial. Blueprints allow for a more modular Flask app, they can encapsulate related tasks and be reused in an application by changing URL prefixes. The Flask docs do a great job of explaining it!

Instead of dealing with raw SQL, I prefer to use Flask-SQLAlchemy so I can utilise an ORM. The model for a todo is as simple as you expect it:

```python
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20), unique=True, nullable=False)
    description = db.Column(db.String(300), nullable=False)

    def __init__(self, title, description):
        self.title = title
        self.description = description

    def __repr__(self):
        return 'Todo: %r' % self.title
```

And the change from defining views for a Flask app to views for a blueprint isn't that alarming. Here's the initialisation and the 3 basic views for a todo:

```python
todos = Blueprint('todos', __name__, template_folder='/../templates')

@todos.route('/')
def index():
    all_todos = Todo.query.order_by(Todo.id.desc()).all()
    return render_template('todos.html', all_todos=all_todos)


@todos.route('/add', methods=['POST'])
def add_todo():
    todo = Todo(request.form['title'], request.form['description'])
    db.session.add(todo)
    db.session.commit()
    flash('New todo was added')
    return redirect(url_for('todos.index'))


@todos.route('/todo//delete', methods=['POST'])
def delete_todo(t_id):
    todo = Todo.query.filter_by(id=t_id).first_or_404()
    db.session.delete(todo)
    db.session.commit()
    flash('Todo successfully deleted')
    return redirect(url_for('todos.index'))
```

I also created a blueprint to handle static pages, like the home and about page. If you structure your Flask app [like a package](http://flask.pocoo.org/docs/0.10/patterns/packages/#larger-applications "Large Flask Application Patterns"), then in your **init.py** of your views module you can define your 404 view function as follows:

```python
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404
```

All in all, you got a well organised flask app!

## Random Notes

I'm no web designer, and that site is somehow visually tolerable. Checkout [Bootswatch](https://bootswatch.com/ "Bootswatch") for some free themes that replaces Bootstrap's standard ones. Technically this was supposed to be a weekend hack... but a great El Clásico occurred and life drove me in other directions, until about Sunday evening when I finally started coding this up!

Lastly, you can get the complete source code right here: <https://github.com/msanatan/organise>
