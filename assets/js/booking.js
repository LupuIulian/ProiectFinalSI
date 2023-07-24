import { tables } from "../data/tables.js";
import { saveToLocalStorage, getFromLocalStorage } from "./utils.js";

$(".timepicker").timepicker({
  timeFormat: "h:mm p",
  interval: 15,
  minTime: "10",
  maxTime: "10:00pm",
  defaultTime: "10",
  startTime: "10:00",
  dynamic: false,
  dropdown: true,
  scrollbar: true,
});

datePicker.min = new Date().toISOString().split("T")[0];

document
  .getElementById("bookingForm")
  .addEventListener("submit", submitBooking);

function submitBooking(event) {
  event.preventDefault();

  let errorMessage = document.getElementById("error-message");
  let successMessage = document.getElementById("success-message");

  errorMessage.classList.add("hidden");
  successMessage.classList.add("hidden");

  let formEl = document.forms.bookingForm;
  let formData = new FormData(formEl);

  let date = formData.get("date");
  let start = moment(formData.get("time"), "h:mm");
  let end = moment(start, "h:mm").add(2, "h").format("h:mm");
  let persons = parseInt(formData.get("table"));

  let tableNumber;
  let bookings = getFromLocalStorage("bookings");

  if (!bookings) {
    bookings = [];
    tableNumber = tables.find((table) => table.persons == persons).number;
  } else {
    let existingBookings = bookings.filter(
      (booking) =>
        booking.date === date &&
        booking.persons === persons &&
        (moment(booking.start, "h:mm").isSameOrBefore(start) ||
          parseInt(
            moment.duration(moment(booking.start, "h:mm").diff(start)).asHours()
          ) <= 2) &&
        start.isSameOrBefore(moment(booking.end, "h:mm"))
    );

    let possibleTables = tables.filter((table) => table.persons === persons);

    if (possibleTables.length - existingBookings.length > 0) {
      // exista
      let usedTables = existingBookings.map((booking) => booking.tableNumber);
      // ia id masa disponibila
      tableNumber = possibleTables.find(
        (table) => !usedTables.includes(table.number)
      ).number;
    } else {
      // nu exista
      errorMessage.classList.remove("hidden");
      return;
    }
  }

  let booking = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    date: date,
    start: start.format("h:mm"),
    end: end,
    tableNumber: tableNumber,
    persons: persons,
    message: formData.get("message"),
  };

  bookings.push(booking);

  saveToLocalStorage("bookings", bookings);
  formEl.reset();
  successMessage.classList.remove("hidden");
}
