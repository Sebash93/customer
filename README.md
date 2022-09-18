# Customer.io Take Home Test

Welcome to the Customer.io Take Home Test, by Sebastian Hernandez.

## Getting Started

1. Install all the dependencies by excecuting `npm install`
2. Run the project in a development by excecuting `npm start`
3. Run the tests by excecuting `npm test`

## Implementation

The test was bootstraped using Create React App for easier setup.

**Tools and dependencies**

- Typescript: This allow us to have an organized and structured way to keep track of models, interfaces and values across the app, it also checks for some requirementes for react components and checks for possible bugs on sintax and declarations.
- CSS Modules: This method allows us to use easy naming on classes preventing collisions and having scoped classNames.
- Date-fns: This lightweight library is used to format some dates from number formats to human readable dates.
- Axios: This library is used for HTTP Calls management providing an easy to use interface.

**Architecture**
The app was structured with the goal to be easy to read and maintain thus there are some divisions on the folder structure allowing us to separate different concepts and responsabilities:

- Componentes: React Components shared in either by other components or Pages.
- Pages: React Components that group smaller components to create a functional large piece of the application.
- assets: Folder to store assets used mainly for the styling of the app and the components.
- data: Folder containing all the logic to connect with the API, including API Calls, adapters to format the incomming data and types to be used along with Typescript.

## Known Issues

- Create React App Development mode refetching: When we run the app using npm start, the server will watch changes made to the files and sometimes it will reload the page preserving current state of the component, thus causing the component to refetch new data and append this data to the current one. (This happens on customers list)
- Not Mobile UI: The ui is not mobile friendly
- There is no way to go back from edit version to details page without "saving" changes. Save is mandatory to go back
- Not validation have been done for "Save Changes" and "Discard Changes" Buttons. You can click both of them at any time even if there are no changes to saves or changes to discard.
- Error message will stay until you click "Save Changes" again. Even if you have fixed the errors, the message will stay until you try to make a call to the API again.
- Many edit fields might cause performance issue. Because of the way React manages the state and the implementation done, if theres a customer with a lot of attributes the edition of those might be slow.
- Preexisitng attributes validation, you can "add" an attribute that already exists this will cause a bug, showing duplicate fields and having a discrepancy between the UI and whats sent to the API.

## Future Work

- State management: This is needed to prevent unnecesary calls to the API, since the API returns the details for all the customers when getting the list, we could store this data locally and access it later on the customer details page.
- Adaptative UI: Some changes can be done to the UI for it be Adaptative.
- UI for loading states: We could implement a better UI for loading states, including loading in buttons, placeholders for incomming information and disabling some functions while loading.
- Much better Typescript Typing: Because of the time constrain there are many "any" types in the application, this might be changed by the actual types and interfaces to have a more stable and bug free app.
