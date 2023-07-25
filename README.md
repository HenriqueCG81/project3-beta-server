## Routes

### user Routes

| Method                 | Route                      | Description                 |
| ---------------------- | -------------------------- | --------------------------- |
| GET                    | /api/v1/user/getUserData   |
| returns specified user |
| GET                    | /api/v1/user/getAllDoctors | get the list of all doctors |

| POST | /api/v1/user/apply-doctor | Apply to be a doctor|
| GET | /api/v1/user/get-all-notification | check the notifications |
| POST | /api/v1/user/delete-all-notification | Deletes all notification |
| POST | /api/v1/user/book-appointment | Book an appointment |
|GET | /api/v1/user/user-appointments | Get all appointments of a user appointment |

### Doctor Routes

| Method | Route                              | Description                         |
| ------ | ---------------------------------- | ----------------------------------- |
| POST   | /api/v1/doctor/getDoctorInfo       | get doctor information              |
| GEt    | /api/v1/doctor/doctor-appointments | get all appointments of a doctor    |
| POST   | /api/v1/doctor/update-status       | update the status of an appointment |
| POST   | /api/v1/doctor/updateProfile       | update the profile of a doctor      |

### Admin Routes

| Method | Route                             | Description                           |
| ------ | --------------------------------- | ------------------------------------- |
| GET    | /api/v1/admin/getAllUsers         | get list of all users                 |
| GET    | /api/v1/admin/getAllDoctors       | get list of all doctors               |
| POST   | /api/v1/admin/changeAccountStatus | Change the account status of a doctor |

### Auth Routes

| Method | Route                 | Description        |
| ------ | --------------------- | ------------------ |
| POST   | /api/v1/user/register | Creates a new user |
| POST   | /api/v1/user/login    | Logs the user      |
| GET    | /api/verify           | Verifies the JWT   |

## Models

## User Model

```js
{
    name:String,
email: String
password:String,
isAdmin: Boolean,
isDoctor:Boolean,
notification: [],
seennotification: [],
}
```

### Doctor Model

```js
{
  userId: String,
firstName: String,
lastName: String,
phone: String,
 email: String,
 website: String,
 address:  String,
 specialization:  String,
experience: String,
feesPerConsultation: Number,
status:  String,
timings:  Object,
}
```

### Appointment Model

```js
{
  userId: String,
  doctorId: String,
  date: String,
  time: String,
  status: String,
  doctorInfo: Object,
  userInfo: Object,
}
```
