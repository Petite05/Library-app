# Library-app
A library app where you can add and delete books. Built using Separation of Concerns; all data is updated in the myLabary [array] first, and then the DOM is redrawn.


This is a complete CRUD (Create, Read, Update, Delete) application built with Vanilla JavaScript to manage a collection of books. It serves as a practical demonstration of core Object-Oriented Programming (OOP) principles and advanced DOM manipulation techniques.

Key Features
 * Book Management (CRUD): Allows users to add new books via a form, view them in a card, delete them instantly, and update their status.

 * Status Toggling (Update): Users can quickly change the book's status between "read" and "not read yet!" by clicking the corresponding button/element in the main display.

Core Concepts & Design
The functionality is driven by the Separation of Concerns—the strict separation between data and display.

 * Data as Source of Truth: All changes (adding, deleting, or toggling status) only modify the central JavaScript array (myLabary).

 * Event Delegation: A single, efficient click listener is attached to the main container, routing clicks for both Delete and Status Toggle based on the unique data-book-id attribute.

 * Data-Driven Redraw: After any data change, the entire display is cleared and rebuilt (displayBooks() function) based on the new state of the array, ensuring the DOM is always synchronized with the data.

Major Challenges I Overcame
1. The Core Error: Assignment to Constant Variable (const vs. let)
 * The Problem: I initially declared your main data array, myLabary, using the const keyword. When you tried to update the array using the filter() method for deletion, the code failed with an Uncaught TypeError: Assignment to constant variable. The filter() method creates a brand new array, and const prevents you from reassigning the variable to this new array.

 * The Solution: You successfully changed the declaration of myLabary from const to let, which allows the variable to be reassigned to the new, filtered array after a book is deleted. This was a critical fix for the entire application's update and delete functionality.

2. Event Listener Misplacement and Execution
 * The Problem: You ran into an Uncaught ReferenceError: bookId is not defined error because the function call (removeBookFromLibrary(bookId);) was outside the event listener. This meant the script tried to run the deletion logic the instant the page loaded, before the bookId variable could ever be defined by a click.

 * The Solution: You moved the event listener setup outside the function it was calling, and only called the function inside the listener, ensuring the logic runs only when a button is clicked and the bookId is available.

3. Confusing Data Modification vs. DOM Manipulation
 * The Problem: After filtering the data array, you attempted to manually remove the HTML table row using DOM methods like displayBooks.removeChild('tr'). This violated the principle of Separation of Concerns.
 * The Solution: You realized the correct approach is the Data-Driven Redraw principle:
   * Modify the central data array (myLabary = myLabary.filter(...)).
   * Call displayBooks() to clear and rebuild the entire interface based on the new, correct data state.

4. Toggle Logic and Data Type Conflicts
 * The Problem: When implementing the "Change Status" feature, you faced confusion because the status kept reverting. This was due to mixing Boolean (true/false) values and string values ("read"/"not read yet!") within your toggleReadStatus function. You were also attempting to toggle the old boolean property (readStatus) after already setting the new string property (read), causing conflicts.
 * The Solution: You successfully standardized the logic to only use string values ("read" and "not read yet!") and ensured the toggleReadStatus function only flipped between those two specific strings.

 Technologies Used
 * HTML, CSS, Vanilla JavaScript (No external frameworks or libraries).
