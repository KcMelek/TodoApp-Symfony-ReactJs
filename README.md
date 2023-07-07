# TodoApp-Symfony-ReactJs

TodoApp is a simple web application built with Symfony, ReactJS, Material UI, and Toastify. It allows users to create and manage their to-do lists efficiently.

## Features

- Create, Edit, and Delete Tasks: Users can add new tasks, edit existing tasks, and mark tasks as completed or delete them.
- User-friendly Interface: The application uses Material UI components to provide a modern and intuitive user interface.
- Toast Notifications: Toastify is integrated to display informative notifications for successful actions or error messages.

## Installation

To run TodoApp on your local machine, follow these steps:

1. Clone the repository:

```
git clone https://github.com/KcMelek/TodoApp-Symfony-ReactJs.git
```

2. Install dependencies for the Symfony backend:

```
composer install
```

3. Set up the Symfony application:

```
cp .env.example .env
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

4. Install dependencies for the ReactJS frontend:

```
npm install
```

5. Configure the environment variables:

```
cp .env.example .env
```

Edit the `.env` file and set the necessary environment variables such as API endpoint and database connection details.

6. Start the development servers:

```
symfony server:start -d
```

```
npm run watch
```

7. Open your web browser and visit `http://localhost:8000` to access the TodoApp.

## Contributing

Contributions to TodoApp are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request in this repository.

## License

TodoApp is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Acknowledgements

TodoApp was created with the help of the following libraries and frameworks:

- [Symfony](https://symfony.com)
- [ReactJS](https://reactjs.org)
- [Material UI](https://mui.com)
- [Toastify](https://fkhadra.github.io/react-toastify)

We would like to express our gratitude to the developers of these projects for their contributions to the open-source community.

## Contact

If you have any questions or need further assistance, please feel free to contact us at KcMelek03@gmail.com

Thank you for using TodoApp!
