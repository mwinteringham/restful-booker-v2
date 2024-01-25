import bookings_helpers from "../utils/bookings_helpers";

let firstNames = [
  "Emily",
  "Michael",
  "Jessica",
  "Matthew",
  "Ashley",
  "Jacob",
  "Sarah",
  "Christopher",
  "Samantha",
  "Joshua",
  "Taylor",
  "Nicholas",
  "Hannah",
  "Tyler",
  "Alexis",
  "Brandon",
  "Rachel",
  "Austin",
  "Elizabeth",
  "Andrew",
];

let lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Jones",
  "Brown",
  "Davis",
  "Miller",
  "Wilson",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
  "Martin",
  "Thompson",
  "Garcia",
  "Martinez",
  "Robinson",
];

let needs = ["breakfast", "lunch", "early checkin", "late checkout", null];

const bookings_generator = {
  generate_firstname: function () {
    return firstNames[Cypress._.random(firstNames.length - 1)];
  },

  generate_lastname: function () {
    return lastNames[Cypress._.random(lastNames.length - 1)];
  },

  generate_price: function () {
    return Cypress._.random(50, 250);
  },

  generate_boolean: function () {
    return Cypress._.random(1) === 1;
  },

  generate_bookingdates: function () {
    const checkin = new Date();
    checkin.setDate(checkin.getDate() + Cypress._.random(1, 180));
    cy.log("checkin: " + checkin.toDateString());
    let checkinString = bookings_helpers.convertToBookingDateString(checkin);
    cy.log("checkinString: " + checkinString);
    const checkout = new Date(
      checkin.setDate(checkin.getDate() + Cypress._.random(1, 14)),
    );
    cy.log("checkout: " + checkout.toDateString());
    let checkoutString = bookings_helpers.convertToBookingDateString(checkout);
    cy.log("checkoutString: " + checkoutString);
    const bookingdates = {
      checkin: checkinString,
      checkout: checkoutString,
    };
    console.log(bookingdates);
    return bookingdates;
  },

  generate_additionalneeds: function () {
    return needs[Cypress._.random(needs.length - 1)];
  },

  generate_booking: function () {
    const booking = {
      firstname: this.generate_firstname(),
      lastname: this.generate_lastname(),
      depositpaid: this.generate_boolean(),
      totalprice: this.generate_price(),
      bookingdates: this.generate_bookingdates(),
      additionalneeds: this.generate_additionalneeds(),
    };
    return booking;
  },
};

export default bookings_generator;
