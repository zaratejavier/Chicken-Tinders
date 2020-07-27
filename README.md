# README

## Chicken Tinder

##### Chicken Tender solves the age old problem of not knowing where to eat in a group. You login and get a code which you can share with members of your group. As you and your group like and dislike different restaurants, you can see if there are any restaurants you all want to eat at.

## View the project on https://chickentender.herokuapp.com

#### the app currently only works for 2 people and isnt hooked up to an API. Future features will include the app being hooked up to an API, unlimited number of group members, being able to search by location and price range.

#### Users are taken to a homepage where they can chose to join a group or create a group. If they join a group, they need to have a group code, which is generated when someone creates a group. Both users are then taken to a swipe page where they can vote on restaurants and view a simplified menu. If both members like a restaurant, they will be taken to a match screen. Because I coded this before learning about ActionCable, checking for matches is done every time the user interacts with the screen through and axios call.

#### Here are some screenshots showing the main pages
![Image of Chicken Tinder Home](https://i.ibb.co/n3Xqg9Q/Screen-Shot-2020-07-27-at-12-06-27-PM.png)


![Image of Chicken Tinder Swiping](https://i.ibb.co/X38gshh/Screen-Shot-2020-07-27-at-12-06-54-PM.png)

####The app runs on a rails api and a react frontend. Dependancies include Axios

