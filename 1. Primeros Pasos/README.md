1. Ejecutamos Composer install.
2. Revisamos que se haya creado el .env (en caso de que no exista, se ha colocado dentro de esta carpeta con otro nombre, solo modificar el nombre a .env y pasarlo al directorio principal (fuera de la carpeta Primeros Pasos)).
3. Ejecuto php artisan key:generate (Generara el key que solicita laravel para inicializar).
4. Ejecutamos npm install (Instalara los paquetes necesarios para inicializar el proyecto).
5. Nos dirijimos al archivo .env y verificamos que DB_DATABASE=virtual_museum exista o que no este modificada, luego nos dirigimos al administrador de base de datos (MySQL de preferencia, asi viene configurada) y creamos manualmente la BBDD bajo el mismo nombre dado en la variable.
6. Luego ejecutamos el comando php artisan migrate (migrara las bases de datos) automaticamente.
7. Lo siguiente es alimentar las tablas de la BD con el comando php artisan db:seed.
8. Por ultimo ejecutamos el comando npm start para ejecutar el proyecto.
9. Disfruta de Virtual Museum