# TINDER API's

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/Interested/:userId
- POST /request/send/Ignored/:userId
- POST /request/review/accepted/:requested
- POST /request/review/rejected/:requestId

## userRouter

- GET /user/request/recieved
- GET /user/connections
- GET /user/feed - get you the profile of other users on platform

Status - ignore, interested, accepted, rejected