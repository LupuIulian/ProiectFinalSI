## Features

- Booking system
- Order system

## Booking system

For every booking the system allows a time of 2 hours by default.

The booking system works by offering the user the possibility to request a table for a given date and time, for a specified number of people.

After the request is sent, the system will check if there is such a table available.

For checking if a table is available the system first looks for any booking that starts before the given date and end after it and also for any booking that start within a period of 2 hours around the given date.

If there are less booking than the total number of table, for the speicfied people, then the user is granted a booking, otherwise it has to choose another day/time.

## Order system

The order system allows the user to make home orders.

The user can add different types of meals, from the Menu page, to the cart, or it can update the quantities or remove the meals from the Cart page, untill it's satified with its order.

When the user wants to send the request it needs to complete the address and the order will be sent as soon as it's ready.
