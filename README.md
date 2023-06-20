# KitchenAids-Orbital
Proposed Level of Achievement:
Project Apollo

Motivation:
We occasionally forgot about food kept in the kitchen. Many of us may have faced the issue of throwing away expired food that was never opened. Not only is it a waste of money, but these will also contribute to food wastage. Reducing food wastage is important given that there is food shortage around the world. 

We often lose track of the food supplies in our house, and by the time we know it, some of the food has already expired. Besides that, many may have encountered the problem of running out of ideas to cook with the items in the fridge, especially for those who cook very often. Hence, it would definitely be nice to have a record where we could organize all the food and also provide us with recommendations of what to cook with the food supplies we have.

Aim:
We hope to make the kitchen more well organised and reduce food wastage through the creation of a kitchen aid application.
The iOS app, KitchenAids, provides a planner for users to keep track of their food supplies in the kitchen.

How to try our app:
1. Refer to our code here: https://gitfront.io/r/user-6304479/RkG5HorVijxt/KitchenAids-Orbital.git
2. Click on “clone” and copy the url
3. Clone the code by entering: git clone [url] in the terminal 
4. Open the file from vscode 
5. Run npx expo start in the terminal
6. Run i in terminal or scan the QR code to run the emulator (only works for IOS), notifications and camera only works on iphone!
7. If it doesn’t work, try to run npm install and repeat step 5 and 6 again :)

Features 
Features
The iOS mobile app, KitchenAids, provides a planner for users to keep track of their food supplies in the kitchen.

1. User Authentication: The KitchenAids application makes use of Supabase user authentication, only allowing those who have registered by email to login to the application itself. As such, there is a login and a register page with email and password created in the frontend which is connected to the backend of supabase. Within supabase, there is a table which stores all the individual user information, ensuring privacy of each user. We also allow users to insert, view, update and delete their own user information through the implementation of row-level security policies within supabase, hence allowing customization of accounts by each individual.<img width="418" alt="Screenshot 2023-06-19 at 2 54 35 PM" src="https://github.com/alientian/KitchenAids-Orbital/assets/122381620/f0fdc5a9-0599-4d0f-866a-8967583f9c92">
![Main drawio](https://github.com/alientian/KitchenAids-Orbital/assets/122381620/cb4594aa-1eea-4b19-9f1e-7066be040ce5)


2. Addition of groceries bought: After users bought their groceries, they are able to add details of the food products into the database through including the product name, product brand, quantity, date bought and expiry date of product. They also have the option to add an image of the product either from choosing from their own photo gallery or taking a photo from their phone camera. Permission on accessing users gallery and camera will be asked before they can do so. Details of food products uploaded will be stored in the database in supabase. They can also choose to clear the whole page in the event that they decide that they do want the current product to be recorded after typing mid-way.
<img width="407" alt="Screenshot 2023-06-19 at 2 56 45 PM" src="https://github.com/alientian/KitchenAids-Orbital/assets/122381620/d8b6ce55-4fd0-4843-ac94-a8652f724055">


3. Keeping track of groceries bought: When users added the products in which they bought, the details of the products will appear on the home page as. Each individual user will only be able to view their own products as our application ensures user privacy through supabase’s user authentication. Since each user has an user ID assigned to by supabase, items recorded by each user ID will be stored together with the user ID, hence allowing users to edit and view only the products they added. The home page also allows users to delete individual products added which will be deleted in both react native expo’s UI and in supabase’s backend.<img width="418" alt="Screenshot 2023-06-19 at 2 57 04 PM" src="https://github.com/alientian/KitchenAids-Orbital/assets/122381620/285ff2be-8f7a-4570-b72e-a43ec7750335">


4. Filtering of expired products: Our application will automatically filter out food products which are expiring (within the next month) through filtering in the supabase backend. They will appear in another tab called ‘expiring’ in the home screen such that users can identify which are the food products that require them to finish up.<img width="408" alt="Screenshot 2023-06-19 at 2 57 26 PM" src="https://github.com/alientian/KitchenAids-Orbital/assets/122381620/18d8f59a-5fc7-4243-80b7-672e32dfda4a">


5. Push notification to remind users: The KitchenAid application also has an option for users to allow push notifications in the form of banners to be sent to them daily to remind them to check the food which are expiring. Permission will be asked before they authenticate. This is done through react native expo push notification with the push token. On click of the notification, users will be directed to the home page of the application.

6. Recipe Search: The application also has a feature where recipes where they can search for the recipe they want using keywords. With the use of the Edamam API, recipes and the URL of the source website can be called. Users can click on the recipe in which they are interested in, afterwhich, an alert prompted by expo will pop up  showing the ingredients required. Users can either choose to press cancel and find another recipe of interest or click on steps which will direct them to the recipe’s website. However, since we do not have the premium version, only 20 recipes are able to show.
<img width="243" alt="Screenshot 2023-06-19 at 2 56 06 PM" src="https://github.com/alientian/KitchenAids-Orbital/assets/122381620/e627b28f-8aa6-4a5b-8977-ebd9011491cf">
 <img width="408" alt="Screenshot 2023-06-19 at 2 55 56 PM" src="https://github.com/alientian/KitchenAids-Orbital/assets/122381620/177e609d-8734-4160-ab9f-d4dd047c77d9">

7. Shopping list: The KitchenAid application also has a shopping list tab for users to keep track of groceries that they are planning to buy. This feature is solely done on the frontend. Users can insert a new item that they wish to buy, check it after they bought the item, or delete it when necessary. There will also be a counter which keeps track of the items that are unchecked (have yet to buy) which reminds users what they have yet to buy.
<img width="411" alt="Screenshot 2023-06-19 at 2 56 38 PM" src="https://github.com/alientian/KitchenAids-Orbital/assets/122381620/873cdf38-82a4-430f-b1f1-f4467c9a3c53">

8. Customizable profile: The application also allows users to customize their username and profile picture in the logout tab. The username and image will be updated in the database with their corresponding user ID and shown in their own account after they upload an image/change their username through the update button.<img width="402" alt="Screenshot 2023-06-19 at 2 55 37 PM" src="https://github.com/alientian/KitchenAids-Orbital/assets/122381620/d49ef683-61b0-4a5d-9d0f-a98057f00cc2">



Tech Stack
1. ReactNative
2. Javascript
3. Node.js
4. Supabase
 

Activity diagram

![activity diagram drawio](https://github.com/alientian/KitchenAids-Orbital/assets/122421126/5dfbf0a2-1846-4267-8ab8-ac4b48f24afc)
