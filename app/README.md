# `CRUZ FUV Rentals and Hosting`

## API (Backend)

### Features

- Vehicles (CRUD)
- Bookings (CRUD)
- Review (partial CRUD)
- User

### Database Design

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

- Request: endpoints that require authentication
- Error Response: Require authentication

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

- Request: endpoints that require proper authorization
- Error Response: Require proper authorization

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

- Require Authentication: true
- Request

  - Method: GET
  - URL: api/me
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith"
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: api/session
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "token": ""
    }
    ```

- Error Response: Invalid credentials

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: api/users
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "token": ""
    }
    ```

- Error response: User already exists with the specified email

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

- Error response: User already exists with the specified username

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```


## vehicles

### Get all Vehicles

Returns all the vehicles in database.

- Require Authentication: false
- Request

  - Method: GET
  - URL: api/vehicles
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Vehicles": [
        {
      "id": 1,
    "year":2023,
    "make": "Ride1Up",
    "model": "cafe-cruiser",
    "picture": "electrek.co/wp-content/uploads/sites/3/2021/12/Cafe-Cruiser-cropped.jpg?quality=82&strip=all&w=980",
    "power": "gas",
    "description": "Im currently riding is the Ride1Up Cafe Cruiser with the passenger kit. Any bike at this price point is not going to feel as nice or natural",
    "type": "e-bike",
    "passengers": 1,
    "daily_price": 40,
    "host_id": 2,
        }
      ]
    }
    ```

### Get details of a Vehicle from an id

Returns the details of a vehicle specified by its id.

- Require Authentication: false
- Request

  - Method: GET
  - URL: api/vehicles/:vehicleId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json

        {
      "id": 1,
    "year":2023,
    "make": "Ride1Up",
    "model": "cafe-cruiser",
    "picture": "electrek.co/wp-content/uploads/sites/3/2021/12/Cafe-Cruiser-cropped.jpg?quality=82&strip=all&w=980",
    "power": "gas",
    "description": "Im currently riding is the Ride1Up Cafe Cruiser with the passenger kit. Any bike at this price point is not going to feel as nice or natural",
    "type": "e-bike",
    "passengers": 1,
    "daily_price": 40,
    "host_id": 2,
        }


    ```

- Error response: Couldn't find a vehicle with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "vehicle couldn't be found",
      "statusCode": 404
    }
    ```


### Get all vehicles Vehicle by the Current User

??Returns all the vehicles owned (created) and reviewed by the current user.

- Require Authentication: true
- Request

  - Method: GET
  - URL: api/me/vehicles
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Vehicles": [
        {
      "id": 1,
    "year":2023,
    "make": "Ride1Up",
    "model": "cafe-cruiser",
    "picture": "electrek.co/wp-content/uploads/sites/3/2021/12/Cafe-Cruiser-cropped.jpg?quality=82&strip=all&w=980",
    "power": "gas",
    "description": "Im currently riding is the Ride1Up Cafe Cruiser with the passenger kit. Any bike at this price point is not going to feel as nice or natural",
    "type": "e-bike",
    "passengers": 1,
    "daily_price": 40,
    "host_id": 2,
        }
      ]
    }


### Create a Vehicle

Creates and returns a new Vehicle.

- Require Authentication: true
- Request

  - Method: POST
  - URL: api/Vehicles
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
        {
     "year":2023,
    "make": "Ride1Up",
    "model": "cafe-cruiser",
    "picture": "electrek.co/wp-content/uploads/sites/3/2021/12/Cafe-Cruiser-cropped.jpg?quality=82&strip=all&w=980",
    "power": "gas",
    "description": "Im currently riding is the Ride1Up Cafe Cruiser with the passenger kit. Any bike at this price point is not going to feel as nice or natural",
    "type": "e-bike",
    "passengers": 1,
    "daily_price": 40,
        }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
        {
      "id": 1,
    "year":2023,
    "make": "Ride1Up",
    "model": "cafe-cruiser",
    "picture": "electrek.co/wp-content/uploads/sites/3/2021/12/Cafe-Cruiser-cropped.jpg?quality=82&strip=all&w=980",
    "power": "gas",
    "description": "Im currently riding is the Ride1Up Cafe Cruiser with the passenger kit. Any bike at this price point is not going to feel as nice or natural",
    "type": "e-bike",
    "passengers": 1,
    "daily_price": 40,
    "host_id": 2,
        }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Name must be less than 50 characters",
        "description": "Description is required",

      }
    }
    ```



### Edit a Vehicle

Updates and returns an existing Vehicle.

- Require Authentication: true
- Require proper authorization: Vehicle must belong to the current user
- Request

  - Method: PUT
  - URL: api/vehicles/:vehicleId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
        {
     "year":2023,
    "make": "Ride1Up",
    "model": "cafe-cruiser",
    "picture": "electrek.co/wp-content/uploads/sites/3/2021/12/Cafe-Cruiser-cropped.jpg?quality=82&strip=all&w=980",
    "power": "gas",
    "description": "Im currently riding is the Ride1Up Cafe Cruiser with the passenger kit. Any bike at this price point is not going to feel as nice or natural",
    "type": "e-bike",
    "passengers": 1,
    "daily_price": 40,
        }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
        {
    "id": 1,
    "year":2023,
    "make": "Ride1Up",
    "model": "cafe-cruiser",
    "picture": "electrek.co/wp-content/uploads/sites/3/2021/12/Cafe-Cruiser-cropped.jpg?quality=82&strip=all&w=980",
    "power": "gas",
    "description": "Im currently riding is the Ride1Up Cafe Cruiser with the passenger kit. Any bike at this price point is not going to feel as nice or natural",
    "type": "e-bike",
    "passengers": 1,
    "daily_price": 40,
    "host_id": 2,
        }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {

      }
    }
    ```

- Error response: Couldn't find a Vehicle with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Vehicle couldn't be found",
      "statusCode": 404
    }
    ```
### Delete a vehicle

Deletes an existing vehicle.

- Require Authentication: true
- Require proper authorization: Spot must belong to the current user
- Request

  - Method: DELETE
  - URL: api/vehicles/:vehicleId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a vehicle with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Vehicle couldn't be found",
      "statusCode": 404
    }




## bookings

### Get all bookings

Returns all the bookings in database.

- Require Authentication: false
- Request

  - Method: GET
  - URL: api/bookings
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Bookings": [
        {
    "id": 1,
    "pickupDate":"Fri, Jan 20, 2023",
    "dropOffDate": "Fri, Jan 20, 2023",
    "address": "123 Cool Lane",
    "city": "San Diego",
    "state": "CA",
    "country": "USA",
    "guestId": 1,
    "vehicleId": 1,

        }
      ]
    }
    ```

### Get details of a booking from an id

Returns the details of a booking specified by its id.

- Require Authentication: false
- Request

  - Method: GET
  - URL: api/bookings/:bookingId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json

         {
    "id": 1,
    "pickupDate":"Fri, Jan 20, 2023",
    "dropOffDate": "Fri, Jan 20, 2023",
    "address": "123 Cool Lane",
    "city": "San Diego",
    "state": "CA",
    "country": "USA",
    "guestId": 1,
    "vehicleId": 1,

        }


    ```

- Error response: Couldn't find a booking with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "booking couldn't be found",
      "statusCode": 404
    }
    ```


### Get all bookings booking by the Current User

??Returns all the bookings owned (created) and reviewed by the current user.

- Require Authentication: true
- Request

  - Method: GET
  - URL: api/me/bookings
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Bookings": [
       {
    "id": 1,
    "pickupDate":"Fri, Jan 20, 2023",
    "dropOffDate": "Fri, Jan 20, 2023",
    "address": "123 Cool Lane",
    "city": "San Diego",
    "state": "CA",
    "country": "USA",
    "guestId": 1,
    "vehicleId": 1,

        }
      ]
    }


### Create a booking

Creates and returns a new booking.

- Require Authentication: true
- Request

  - Method: POST
  - URL: api/bookings
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
            {

    "pickupDate":"Fri, Jan 20, 2023",
    "dropOffDate": "Fri, Jan 20, 2023",
    "address": "123 Cool Lane",
    "city": "San Diego",
    "state": "CA",
    "country": "USA",


        }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json

      {
    "id": 1,
    "pickupDate":"Fri, Jan 20, 2023",
    "dropOffDate": "Fri, Jan 20, 2023",
    "address": "123 Cool Lane",
    "city": "San Diego",
    "state": "CA",
    "country": "USA",
    "guestId": 1,
    "vehicleId": 1,

        }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {


      }
    }
    ```



### Edit a booking

Updates and returns an existing booking.

- Require Authentication: true
- Require proper authorization: booking must belong to the current user
- Request

  - Method: PUT
  - URL: api/bookings/:bookingId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
           {

    "pickupDate":"Fri, Jan 20, 2023",
    "dropOffDate": "Fri, Jan 20, 2023",
    "address": "123 Cool Lane",
    "city": "San Diego",
    "state": "CA",
    "country": "USA",


        }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
      {
    "id": 1,
    "pickupDate":"Fri, Jan 20, 2023",
    "dropOffDate": "Fri, Jan 20, 2023",
    "address": "123 Cool Lane",
    "city": "San Diego",
    "state": "CA",
    "country": "USA",
    "guestId": 1,
    "vehicleId": 1,

        }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {

      }
    }
    ```

- Error response: Couldn't find a booking with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "booking couldn't be found",
      "statusCode": 404
    }
    ```
### Delete a booking

Deletes an existing booking.

- Require Authentication: true
- Require proper authorization: Spot must belong to the current user
- Request

  - Method: DELETE
  - URL: api/bookings/:bookingId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a booking with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "booking couldn't be found",
      "statusCode": 404
    }


## Vehicle Reviews

### Get all reviews by a vehicle's id

Gets all reviews of a vehicle

- Require Authentication: false
- Require proper authorization: Spot must belong to the current user
- Request

  - Method: GET
  - URL: api/reviews
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Reviews": [
        {
          "id": 1,
          "rating": 10,
          "body": 1,
          "userId": "I love this vehicle!",
          "vehicleId": 4.5,
          "bookingId": "stringUrl",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
        }
      ]
    }
    ```

- Error response: Couldn't find any reviews for vehicle

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Reviews couldn't be found",
      "statusCode": 404
    }
    ```

### Create a review by vehicle Id

Create and return a new review for a vehicle specified by id.

- Require Authentication: True
- Require proper authorization: User must be logged in
- Request

  - Method: POST
  - URL: api/vehicles/:vehicleId/reviews
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "body": "I love this vehicle!",
      "ratings": 10
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
       {
          "id": 1,
          "rating": 10,
          "body": 1,
          "userId": "I love this vehicle!",
          "vehicleId": 4.5,
          "bookingId": 1,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
        }
    ```

- Error response: Validation error

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "body": "Review body text is required"
      }
    }
    ```

- Error response: Couldn't find a vehicle with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "vehicle ID couldn't be found",
      "statusCode": 404
    }
    ```


### Edit Review

Edit an existing review of a vehicle

- Require Authentication: True
- Require proper authorization: Review must be created by same user editing
- Request

  - Method: PUT
  - URL: api/reviews/:reviewId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "body": "I hate this vehicle!",
      "ratings": 1
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
     {
          "id": 1,
          "rating": 1,
          "body": 1,
          "userId": "I hate this vehicle!",
          "vehicleId": 4.5,
          "bookingId": 1,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
        }
    ```

- Error response: Body validation error

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "body": "Review body text is required"
      }
    }
    ```

- Error response: Couldn't find the Review with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Couldn't find review",
      "statusCode": 404
    }
    ```

### Delete review

Removes an existing review

- Require Authentication: true
- Require proper authorization: Review must belong to the current user
- Request

  - Method: DELETE
  - URL: api/reviews/:reviewId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a Review with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Review couldn't be found",
      "statusCode": 404
    }
    ```

## Browser Application (Frontend)

### Page Tree
