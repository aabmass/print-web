# print-web
A web app for uploading files to the browser to print on the server's printer (lpr)

## Development Setup
First, install the dev dependencies with pip and npm (or yarn).
```sh
cd print-web
# create a virtualenv and install python reqs
pyvenv venv
source venv/bin/activate
pip install -r requirements.txt

cd react-frontend
npm install         # or yarn install
```

Next, be sure to run migrations to create SQLite database
```sh
cd print_web_django
./manage.py migrate

# also, create a superuser!
./manage.py createsuperuser
# go through prompts...
```

## Running
Run the front and backend separately. Don't worry, create-react-app is set up to proxy all unknown AJAX to django (http://localhost:8000)

First, start the django app:
```sh
cd print_web_django
./manage.py runserver
# let it run and watch it for errors!
```

Now, start up the react dev server:
```sh
cd react-frontend
npm start
```
Now visit http://localhost:3000/
